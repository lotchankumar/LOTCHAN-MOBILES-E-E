import { Prisma } from '@prisma/client';
import prisma from '../prisma/client';
import { AppError } from '../middleware/error.middleware';
import { supplierService } from './supplier.service';
import { categoryService } from './category.service';

export interface CreateProductData {
  sku: string;
  name: string;
  description?: string | null;
  category: 'MOBILE' | 'ACCESSORY' | 'SIM_CARD';
  categoryId?: string | null;
  supplierId?: string | null;
  brand: string;
  model?: string | null;
  price: number;
  cost: number;
  stockQty?: number;
  minStock?: number;
  imageUrl?: string | null;
}

export interface UpdateProductData {
  sku?: string;
  name?: string;
  description?: string | null;
  category?: 'MOBILE' | 'ACCESSORY' | 'SIM_CARD';
  categoryId?: string | null;
  supplierId?: string | null;
  brand?: string;
  model?: string | null;
  price?: number;
  cost?: number;
  stockQty?: number;
  minStock?: number;
  imageUrl?: string | null;
  isAvailable?: boolean;
}

export interface ProductFilters {
  category?: string;       // legacy enum value
  categoryId?: string;     // FK
  supplierId?: string;
  search?: string;
  lowStock?: boolean;
}

export type MovementType =
  | 'SALE'
  | 'REPAIR_USE'
  | 'PURCHASE_RECEIVE'
  | 'MANUAL_ADJUSTMENT'
  | 'RETURN';

interface LogMovementArgs {
  productId: string;
  quantity: number; // signed
  type: MovementType;
  reference?: string | null;
  purchaseOrderId?: string | null;
  userId?: string | null;
}

async function logMovement(tx: Prisma.TransactionClient, args: LogMovementArgs) {
  // Cast to any because the generated Prisma client may not yet include
  // stockMovement until `prisma generate` is run.
  const txAny = tx as any;
  return txAny.stockMovement.create({
    data: {
      productId: args.productId,
      quantity: args.quantity,
      type: args.type,
      reference: args.reference ?? null,
      purchaseOrderId: args.purchaseOrderId ?? null,
      userId: args.userId ?? null,
    },
  });
}

async function checkStock(productId: string, quantity: number): Promise<boolean> {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { stockQty: true },
  });
  return product ? product.stockQty >= quantity : false;
}

async function decrementStock(
  tx: Prisma.TransactionClient,
  productId: string,
  quantity: number,
  opts: { type?: MovementType; reference?: string | null; userId?: string | null } = {}
): Promise<{ success: boolean; updatedProduct: any }> {
  if (quantity <= 0) throw new AppError('Quantity must be positive', 400);
  const updated = await tx.product.update({
    where: { id: productId, stockQty: { gte: quantity } } as any,
    data: { stockQty: { decrement: quantity } },
  });
  await logMovement(tx, {
    productId,
    quantity: -quantity,
    type: opts.type ?? 'SALE',
    reference: opts.reference ?? null,
    userId: opts.userId ?? null,
  });
  return { success: true, updatedProduct: updated };
}

async function incrementStock(
  tx: Prisma.TransactionClient,
  productId: string,
  quantity: number,
  opts: {
    type?: MovementType;
    reference?: string | null;
    purchaseOrderId?: string | null;
    userId?: string | null;
  } = {}
): Promise<void> {
  if (quantity <= 0) throw new AppError('Quantity must be positive', 400);
  await tx.product.update({
    where: { id: productId },
    data: { stockQty: { increment: quantity } },
  });
  await logMovement(tx, {
    productId,
    quantity,
    type: opts.type ?? 'PURCHASE_RECEIVE',
    reference: opts.reference ?? null,
    purchaseOrderId: opts.purchaseOrderId ?? null,
    userId: opts.userId ?? null,
  });
}

async function adjustStock(
  productId: string,
  quantity: number,
  reason: string,
  userId?: string | null
) {
  if (!Number.isInteger(quantity) || quantity === 0) {
    throw new AppError('Quantity must be a non-zero integer', 400);
  }
  if (!reason?.trim()) throw new AppError('Reason is required', 400);

  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({ where: { id: productId } });
    if (!product) throw new AppError('Product not found', 404);

    const newQty = product.stockQty + quantity;
    if (newQty < 0) throw new AppError('Adjustment would make stock negative', 400);

    const updated = await tx.product.update({
      where: { id: productId },
      data: { stockQty: newQty },
    });

    await logMovement(tx, {
      productId,
      quantity,
      type: 'MANUAL_ADJUSTMENT',
      reference: reason.trim(),
      userId: userId ?? null,
    });

    return updated;
  });
}

async function getLowStockProducts() {
  const products = await prisma.product.findMany({
    where: { isAvailable: true },
    include: {
      supplier: { select: { id: true, name: true, phone: true, email: true } },
      categoryType: { select: { id: true, name: true, slug: true } as any },
    },
    orderBy: { stockQty: 'asc' },
  });
  return products.filter((p: any) => p.stockQty <= p.minStock);
}

async function getReorderSuggestions() {
  const low: any[] = await getLowStockProducts();
  const grouped: Record<string, { supplier: any; products: any[] }> = {};
  for (const p of low) {
    const key = p.supplier?.id ?? '__unassigned__';
    if (!grouped[key]) {
      grouped[key] = {
        supplier: p.supplier ?? { id: null, name: 'Unassigned' },
        products: [],
      };
    }
    grouped[key].products.push({
      id: p.id,
      sku: p.sku,
      name: p.name,
      stockQty: p.stockQty,
      minStock: p.minStock,
      suggestedQty: Math.max(p.minStock * 2 - p.stockQty, 1),
      cost: p.cost,
    });
  }
  return Object.values(grouped);
}

async function getStockValuation(groupBy?: 'category') {
  const products: any[] = await prisma.product.findMany({
    where: { isAvailable: true },
    include: { categoryType: { select: { id: true, name: true } } },
  });

  const totalValue = products.reduce((s, p) => s + p.stockQty * p.cost, 0);
  const totalUnits = products.reduce((s, p) => s + p.stockQty, 0);

  if (groupBy === 'category') {
    const byCat: Record<string, { categoryId: string | null; name: string; value: number; units: number }> = {};
    for (const p of products) {
      const id = p.categoryType?.id ?? '__none__';
      const name = p.categoryType?.name ?? 'Uncategorized';
      if (!byCat[id]) byCat[id] = { categoryId: p.categoryType?.id ?? null, name, value: 0, units: 0 };
      byCat[id].value += p.stockQty * p.cost;
      byCat[id].units += p.stockQty;
    }
    return { totalValue, totalUnits, byCategory: Object.values(byCat) };
  }
  return { totalValue, totalUnits };
}

async function getProducts(filters?: ProductFilters) {
  const where: any = {};
  if (filters?.category) where.category = filters.category;
  if (filters?.categoryId) where.categoryId = filters.categoryId;
  if (filters?.supplierId) where.supplierId = filters.supplierId;
  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search } },
      { brand: { contains: filters.search } },
      { sku: { contains: filters.search } },
    ];
  }

  let products: any[] = await prisma.product.findMany({
    where,
    include: {
      supplier: { select: { id: true, name: true } },
      categoryType: { select: { id: true, name: true, slug: true } as any },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (filters?.lowStock) {
    products = products.filter((p) => p.stockQty <= p.minStock);
  }
  return products;
}

async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      supplier: true,
      categoryType: true,
    },
  });
  if (!product) throw new AppError('Product not found', 404);
  return product;
}

async function createProduct(data: CreateProductData) {
  if (await prisma.product.findUnique({ where: { sku: data.sku } })) {
    throw new AppError('SKU already exists', 409);
  }
  const createData: any = {
    sku: data.sku,
    name: data.name,
    category: data.category,
    brand: data.brand,
    price: data.price,
    cost: data.cost,
    ...(data.description !== undefined && { description: data.description }),
    ...(data.model !== undefined && { model: data.model }),
    ...(data.categoryId && { categoryId: data.categoryId }),
    ...(data.supplierId && { supplierId: data.supplierId }),
    ...(data.stockQty !== undefined && { stockQty: data.stockQty }),
    ...(data.minStock !== undefined && { minStock: data.minStock }),
    ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
  };
  return prisma.product.create({ data: createData });
}

async function updateProduct(id: string, data: UpdateProductData) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new AppError('Product not found', 404);

  if (data.sku && data.sku !== product.sku) {
    if (await prisma.product.findUnique({ where: { sku: data.sku } })) {
      throw new AppError('SKU already exists', 409);
    }
  }

  const updateData: any = {
    ...(data.sku && { sku: data.sku }),
    ...(data.name && { name: data.name }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.category && { category: data.category }),
    ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
    ...(data.supplierId !== undefined && { supplierId: data.supplierId }),
    ...(data.brand && { brand: data.brand }),
    ...(data.model !== undefined && { model: data.model }),
    ...(data.price !== undefined && { price: data.price }),
    ...(data.cost !== undefined && { cost: data.cost }),
    ...(data.stockQty !== undefined && { stockQty: data.stockQty }),
    ...(data.minStock !== undefined && { minStock: data.minStock }),
    ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
    ...(data.isAvailable !== undefined && { isAvailable: data.isAvailable }),
  };

  return prisma.product.update({ where: { id }, data: updateData });
}

async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
}

async function getCategories() {
  return categoryService.getAll();
}
async function createCategory(data: any) {
  return categoryService.create(data);
}
async function updateCategory(id: string, data: any) {
  return categoryService.update(id, data);
}

export const inventoryService = {
  // stock
  checkStock,
  decrementStock,
  incrementStock,
  adjustStock,
  logMovement,
  // analytics
  getLowStockProducts,
  getReorderSuggestions,
  getStockValuation,
  // products
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  // categories (legacy passthroughs)
  getCategories,
  createCategory,
  updateCategory,
  // sub-services
  category: categoryService,
  supplier: supplierService,
};
