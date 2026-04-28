"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const error_middleware_1 = require("../middleware/error.middleware");
const supplier_service_1 = require("./supplier.service");
const category_service_1 = require("./category.service");
async function logMovement(tx, args) {
    // Cast to any because the generated Prisma client may not yet include
    // stockMovement until `prisma generate` is run.
    const txAny = tx;
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
async function checkStock(productId, quantity) {
    const product = await client_1.default.product.findUnique({
        where: { id: productId },
        select: { stockQty: true },
    });
    return product ? product.stockQty >= quantity : false;
}
async function decrementStock(tx, productId, quantity, opts = {}) {
    if (quantity <= 0)
        throw new error_middleware_1.AppError('Quantity must be positive', 400);
    const updated = await tx.product.update({
        where: { id: productId, stockQty: { gte: quantity } },
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
async function incrementStock(tx, productId, quantity, opts = {}) {
    if (quantity <= 0)
        throw new error_middleware_1.AppError('Quantity must be positive', 400);
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
async function adjustStock(productId, quantity, reason, userId) {
    if (!Number.isInteger(quantity) || quantity === 0) {
        throw new error_middleware_1.AppError('Quantity must be a non-zero integer', 400);
    }
    if (!reason?.trim())
        throw new error_middleware_1.AppError('Reason is required', 400);
    return client_1.default.$transaction(async (tx) => {
        const product = await tx.product.findUnique({ where: { id: productId } });
        if (!product)
            throw new error_middleware_1.AppError('Product not found', 404);
        const newQty = product.stockQty + quantity;
        if (newQty < 0)
            throw new error_middleware_1.AppError('Adjustment would make stock negative', 400);
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
    const products = await client_1.default.product.findMany({
        where: { isAvailable: true },
        include: {
            supplier: { select: { id: true, name: true, phone: true, email: true } },
            categoryType: { select: { id: true, name: true, slug: true } },
        },
        orderBy: { stockQty: 'asc' },
    });
    return products.filter((p) => p.stockQty <= p.minStock);
}
async function getReorderSuggestions() {
    const low = await getLowStockProducts();
    const grouped = {};
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
async function getStockValuation(groupBy) {
    const products = await client_1.default.product.findMany({
        where: { isAvailable: true },
        include: { categoryType: { select: { id: true, name: true } } },
    });
    const totalValue = products.reduce((s, p) => s + p.stockQty * p.cost, 0);
    const totalUnits = products.reduce((s, p) => s + p.stockQty, 0);
    if (groupBy === 'category') {
        const byCat = {};
        for (const p of products) {
            const id = p.categoryType?.id ?? '__none__';
            const name = p.categoryType?.name ?? 'Uncategorized';
            if (!byCat[id])
                byCat[id] = { categoryId: p.categoryType?.id ?? null, name, value: 0, units: 0 };
            byCat[id].value += p.stockQty * p.cost;
            byCat[id].units += p.stockQty;
        }
        return { totalValue, totalUnits, byCategory: Object.values(byCat) };
    }
    return { totalValue, totalUnits };
}
async function getProducts(filters) {
    const where = {};
    if (filters?.category)
        where.category = filters.category;
    if (filters?.categoryId)
        where.categoryId = filters.categoryId;
    if (filters?.supplierId)
        where.supplierId = filters.supplierId;
    if (filters?.search) {
        where.OR = [
            { name: { contains: filters.search } },
            { brand: { contains: filters.search } },
            { sku: { contains: filters.search } },
        ];
    }
    let products = await client_1.default.product.findMany({
        where,
        include: {
            supplier: { select: { id: true, name: true } },
            categoryType: { select: { id: true, name: true, slug: true } },
        },
        orderBy: { createdAt: 'desc' },
    });
    if (filters?.lowStock) {
        products = products.filter((p) => p.stockQty <= p.minStock);
    }
    return products;
}
async function getProductById(id) {
    const product = await client_1.default.product.findUnique({
        where: { id },
        include: {
            supplier: true,
            categoryType: true,
        },
    });
    if (!product)
        throw new error_middleware_1.AppError('Product not found', 404);
    return product;
}
async function createProduct(data) {
    if (await client_1.default.product.findUnique({ where: { sku: data.sku } })) {
        throw new error_middleware_1.AppError('SKU already exists', 409);
    }
    const createData = {
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
    return client_1.default.product.create({ data: createData });
}
async function updateProduct(id, data) {
    const product = await client_1.default.product.findUnique({ where: { id } });
    if (!product)
        throw new error_middleware_1.AppError('Product not found', 404);
    if (data.sku && data.sku !== product.sku) {
        if (await client_1.default.product.findUnique({ where: { sku: data.sku } })) {
            throw new error_middleware_1.AppError('SKU already exists', 409);
        }
    }
    const updateData = {
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
    return client_1.default.product.update({ where: { id }, data: updateData });
}
async function deleteProduct(id) {
    await client_1.default.product.delete({ where: { id } });
}
async function getCategories() {
    return category_service_1.categoryService.getAll();
}
async function createCategory(data) {
    return category_service_1.categoryService.create(data);
}
async function updateCategory(id, data) {
    return category_service_1.categoryService.update(id, data);
}
exports.inventoryService = {
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
    category: category_service_1.categoryService,
    supplier: supplier_service_1.supplierService,
};
//# sourceMappingURL=inventory.service.js.map