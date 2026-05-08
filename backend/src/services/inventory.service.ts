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
  branchId?: string;
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
  branchId: string;
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
      branchId: args.branchId,
    },
  });
}

async function checkStock(productId: string, quantity: number, branchId: string): Promise<boolean> {
  const branchStock = await prisma.branchStock.findUnique({
    where: { branchId_productId: { branchId, productId } },
    select: { stockQty: true },
  });
  return branchStock ? branchStock.stockQty >= quantity : false;
}

async function decrementStock(
  tx: Prisma.TransactionClient,
  productId: string,
  quantity: number,
  branchId: string,
  opts: { type?: MovementType; reference?: string | null; userId?: string | null } = {}
): Promise<{ success: boolean; updatedProduct: any }> {
  if (quantity <= 0) throw new AppError('Quantity must be positive', 400);
  const updated = await tx.branchStock.update({
    where: { branchId_productId: { branchId, productId }, stockQty: { gte: quantity } } as any,
    data: { stockQty: { decrement: quantity } },
  });
  await logMovement(tx, {
    productId,
    quantity: -quantity,
    type: opts.type ?? 'SALE',
    reference: opts.reference ?? null,
    userId: opts.userId ?? null,
    branchId,
  });
  return { success: true, updatedProduct: updated };
}

async function incrementStock(
  tx: Prisma.TransactionClient,
  productId: string,
  quantity: number,
  branchId: string,
  opts: {
    type?: MovementType;
    reference?: string | null;
    purchaseOrderId?: string | null;
    userId?: string | null;
  } = {}
): Promise<void> {
  if (quantity <= 0) throw new AppError('Quantity must be positive', 400);
  await tx.branchStock.upsert({
    where: { branchId_productId: { branchId, productId } },
    update: { stockQty: { increment: quantity } },
    create: { branchId, productId, stockQty: quantity },
  });
  await logMovement(tx, {
    productId,
    quantity,
    type: opts.type ?? 'PURCHASE_RECEIVE',
    reference: opts.reference ?? null,
    purchaseOrderId: opts.purchaseOrderId ?? null,
    userId: opts.userId ?? null,
    branchId,
  });
}

async function adjustStock(
  productId: string,
  quantity: number,
  reason: string,
  branchId: string,
  userId?: string | null
) {
  if (!Number.isInteger(quantity) || quantity === 0) {
    throw new AppError('Quantity must be a non-zero integer', 400);
  }
  if (!reason?.trim()) throw new AppError('Reason is required', 400);

  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({ where: { id: productId } });
    if (!product) throw new AppError('Product not found', 404);

    const branchStock = await tx.branchStock.findUnique({
      where: { branchId_productId: { branchId, productId } }
    });
    
    const currentQty = branchStock?.stockQty || 0;
    const newQty = currentQty + quantity;
    if (newQty < 0) throw new AppError('Adjustment would make stock negative', 400);

    const updated = await tx.branchStock.upsert({
      where: { branchId_productId: { branchId, productId } },
      update: { stockQty: newQty },
      create: { branchId, productId, stockQty: newQty }
    });

    await logMovement(tx, {
      productId,
      quantity,
      type: 'MANUAL_ADJUSTMENT',
      reference: reason.trim(),
      userId: userId ?? null,
      branchId,
    });

    return updated;
  });
}

async function getLowStockProducts(branchId?: string) {
  const products = await prisma.product.findMany({
    where: { isAvailable: true },
    include: {
      supplier: { select: { id: true, name: true, phone: true, email: true } },
      categoryType: { select: { id: true, name: true, slug: true } as any },
    },
  });

  // Fetch branch stocks separately
  let stockMap: Record<string, { stockQty: number; minStock: number }> = {};
  if (branchId) {
    const rows = await prisma.branchStock.findMany({
      where: { branchId },
      select: { productId: true, stockQty: true, minStock: true },
    });
    for (const r of rows) stockMap[r.productId] = { stockQty: r.stockQty, minStock: r.minStock };
  } else {
    const rows = await prisma.branchStock.findMany({
      select: { productId: true, stockQty: true, minStock: true },
    });
    // Sum all branches for global admin view
    for (const r of rows) {
      if (!stockMap[r.productId]) stockMap[r.productId] = { stockQty: 0, minStock: r.minStock };
      stockMap[r.productId].stockQty += r.stockQty;
    }
  }

  // When branchId is set, only include products that actually have stock records for this branch.
  // Products without a BranchStock entry should NOT appear as "low stock" for a branch they don't belong to.
  const relevantProducts = branchId
    ? products.filter((p) => stockMap[p.id] !== undefined)
    : products;

  const mapped = relevantProducts.map((p) => {
    const s = stockMap[p.id] ?? { stockQty: 0, minStock: 5 };
    return { ...p, stockQty: s.stockQty, minStock: s.minStock };
  });

  return mapped.filter((p: any) => p.stockQty <= p.minStock).sort((a, b) => a.stockQty - b.stockQty);
}

async function getReorderSuggestions(branchId?: string) {
  const low: any[] = await getLowStockProducts(branchId);
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

async function getStockValuation(groupBy?: 'category', branchId?: string) {
  const products: any[] = await prisma.product.findMany({
    where: { isAvailable: true },
    include: { 
      categoryType: { select: { id: true, name: true } },
    },
  });

  // Fetch branch stocks separately
  let stockMap: Record<string, number> = {};
  if (branchId) {
    const rows = await prisma.branchStock.findMany({
      where: { branchId },
      select: { productId: true, stockQty: true },
    });
    for (const r of rows) stockMap[r.productId] = r.stockQty;
  } else {
    const rows = await prisma.branchStock.findMany({
      select: { productId: true, stockQty: true },
    });
    for (const r of rows) {
      stockMap[r.productId] = (stockMap[r.productId] ?? 0) + r.stockQty;
    }
  }

  const mapped = products.map((p) => ({ ...p, stockQty: stockMap[p.id] ?? 0 }));

  const totalValue = mapped.reduce((s, p) => s + p.stockQty * p.cost, 0);
  const totalUnits = mapped.reduce((s, p) => s + p.stockQty, 0);

  if (groupBy === 'category') {
    const byCat: Record<string, { categoryId: string | null; name: string; value: number; units: number }> = {};
    for (const p of mapped) {
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

  let products: any[];

  if (filters?.branchId) {
    // MANAGER view: only show products that exist in THIS branch's stock
    const branchStockRows = await prisma.branchStock.findMany({
      where: { branchId: filters.branchId },
      select: { productId: true, stockQty: true, minStock: true },
    });

    if (branchStockRows.length === 0) return []; // branch has no stock yet

    const stockMap: Record<string, { stockQty: number; minStock: number }> = {};
    for (const r of branchStockRows) {
      stockMap[r.productId] = { stockQty: r.stockQty, minStock: r.minStock };
    }

    // Restrict product query to only this branch's product IDs
    where.id = { in: branchStockRows.map(r => r.productId) };

    const result = await prisma.product.findMany({
      where,
      include: {
        supplier: { select: { id: true, name: true } },
        categoryType: { select: { id: true, name: true, slug: true } as any },
      },
      orderBy: { createdAt: 'desc' },
    });

    products = result.map(p => {
      const s = stockMap[p.id] ?? { stockQty: 0, minStock: 5 };
      return { ...p, stockQty: s.stockQty, minStock: s.minStock };
    });
  } else {
    // ADMIN view: all products, sum stock across all branches
    const result = await prisma.product.findMany({
      where,
      include: {
        supplier: { select: { id: true, name: true } },
        categoryType: { select: { id: true, name: true, slug: true } as any },
        branchStocks: { include: { branch: { select: { id: true, name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const allStockRows = await prisma.branchStock.findMany({
      select: { productId: true, stockQty: true, minStock: true },
    });
    const stockMap: Record<string, { stockQty: number; minStock: number }> = {};
    for (const r of allStockRows) {
      if (!stockMap[r.productId]) stockMap[r.productId] = { stockQty: 0, minStock: r.minStock };
      stockMap[r.productId].stockQty += r.stockQty;
    }

    products = result.map(p => {
      const s = stockMap[p.id] ?? { stockQty: 0, minStock: 5 };
      return { ...p, stockQty: s.stockQty, minStock: s.minStock };
    });
  }

  if (filters?.lowStock) {
    products = products.filter((p) => p.stockQty <= p.minStock);
  }
  return products;
}

async function getProductById(id: string, branchId?: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      supplier: true,
      categoryType: true,
      branchStocks: branchId ? { where: { branchId } } : true,
    },
  });
  if (!product) throw new AppError('Product not found', 404);
  const stockQty = product.branchStocks.reduce((sum, bs) => sum + bs.stockQty, 0);
  const minStock = product.branchStocks.reduce((sum, bs) => sum + bs.minStock, 0) || 5;
  return { ...product, stockQty, minStock };
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

  // Accept both backend names (price/cost) and frontend names (sellingPrice/costPrice)
  const bodyAny = data as any;
  const resolvedPrice = data.price !== undefined ? data.price : bodyAny.sellingPrice;
  const resolvedCost = data.cost !== undefined ? data.cost : bodyAny.costPrice;

  const updateData: any = {
    ...(data.sku && { sku: data.sku }),
    ...(data.name && { name: data.name }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.category && { category: data.category }),
    ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
    ...(data.supplierId !== undefined && { supplierId: data.supplierId }),
    ...(data.brand && { brand: data.brand }),
    ...(data.model !== undefined && { model: data.model }),
    ...(resolvedPrice !== undefined && { price: resolvedPrice }),
    ...(resolvedCost !== undefined && { cost: resolvedCost }),
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
