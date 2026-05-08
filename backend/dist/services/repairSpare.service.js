"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.repairSpareService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const error_middleware_1 = require("../middleware/error.middleware");
const db = client_1.default;
exports.repairSpareService = {
    // ===== Spare Products =====
    async getAllSpareProducts(filters) {
        const where = {};
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
        // Filter directly by branchId on the product
        if (filters?.branchId) {
            where.branchId = filters.branchId;
        }
        let products = await db.repairSpareProduct.findMany({
            where,
            include: {
                categoryType: { select: { id: true, name: true } },
                supplier: { select: { id: true, name: true } },
                branch: { select: { id: true, name: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        if (filters?.lowStock) {
            products = products.filter((p) => p.stockQty <= p.minStock);
        }
        return products;
    },
    async getSpareProductById(id) {
        const product = await db.repairSpareProduct.findUnique({
            where: { id },
            include: {
                categoryType: { select: { id: true, name: true } },
                supplier: { select: { id: true, name: true } },
            },
        });
        if (!product)
            throw new error_middleware_1.AppError('Spare product not found', 404);
        return product;
    },
    async createSpareProduct(data) {
        if (!data.branchId) {
            throw new error_middleware_1.AppError('Branch ID is required to create a repair spare product', 400);
        }
        // Check branch-specific SKU
        const existing = await db.repairSpareProduct.findUnique({
            where: {
                branchId_sku: {
                    branchId: data.branchId,
                    sku: data.sku,
                }
            }
        });
        if (existing) {
            throw new error_middleware_1.AppError('SKU already exists in this branch', 409);
        }
        const createData = {
            name: data.name,
            sku: data.sku,
            branchId: data.branchId,
            stockQty: data.stockQty ?? 0,
            minStock: data.minStock ?? 5,
            ...(data.description !== undefined && { description: data.description }),
            ...(data.categoryId && { categoryId: data.categoryId }),
            ...(data.supplierId && { supplierId: data.supplierId }),
            ...(data.brand && { brand: data.brand }),
            ...(data.model !== undefined && { model: data.model }),
            ...(data.compatibleDevices !== undefined && { compatibleDevices: data.compatibleDevices }),
            ...(data.purchasePrice !== undefined && { purchasePrice: data.purchasePrice }),
            ...(data.sellingPrice !== undefined && { sellingPrice: data.sellingPrice }),
            ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
        };
        const newProduct = await db.repairSpareProduct.create({ data: createData });
        return newProduct;
    },
    async updateSpareProduct(id, data) {
        const product = await db.repairSpareProduct.findUnique({ where: { id } });
        if (!product)
            throw new error_middleware_1.AppError('Spare product not found', 404);
        if (data.sku && data.sku !== product.sku) {
            const existing = await db.repairSpareProduct.findUnique({
                where: {
                    branchId_sku: {
                        branchId: product.branchId,
                        sku: data.sku,
                    }
                }
            });
            if (existing) {
                throw new error_middleware_1.AppError('SKU already exists in this branch', 409);
            }
        }
        const updateData = {
            ...(data.name !== undefined && { name: data.name }),
            ...(data.sku !== undefined && { sku: data.sku }),
            ...(data.description !== undefined && { description: data.description }),
            ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
            ...(data.supplierId !== undefined && { supplierId: data.supplierId }),
            ...(data.brand !== undefined && { brand: data.brand }),
            ...(data.model !== undefined && { model: data.model }),
            ...(data.compatibleDevices !== undefined && { compatibleDevices: data.compatibleDevices }),
            ...(data.purchasePrice !== undefined && { purchasePrice: data.purchasePrice }),
            ...(data.sellingPrice !== undefined && { sellingPrice: data.sellingPrice }),
            ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
            ...(data.isAvailable !== undefined && { isAvailable: data.isAvailable }),
            ...(data.stockQty !== undefined && { stockQty: data.stockQty }),
            ...(data.minStock !== undefined && { minStock: data.minStock }),
        };
        const updatedProduct = await db.repairSpareProduct.update({ where: { id }, data: updateData });
        return updatedProduct;
    },
    async deleteSpareProduct(id) {
        const product = await db.repairSpareProduct.findUnique({ where: { id } });
        if (!product)
            throw new error_middleware_1.AppError('Spare product not found', 404);
        await db.repairSpareProduct.delete({ where: { id } });
        return { success: true, message: 'Spare product deleted successfully' };
    },
    // ===== Spare Purchases =====
    async getAllSparePurchases(filters) {
        const where = {};
        if (filters?.startDate && filters?.endDate) {
            where.purchaseDate = {
                gte: new Date(filters.startDate + 'T00:00:00.000Z'),
                lte: new Date(filters.endDate + 'T23:59:59.999Z'),
            };
        }
        // Scope by branch for MANAGER callers
        if (filters?.branchId) {
            where.branchId = filters.branchId;
        }
        return db.repairSparePurchase.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                manager: { select: { id: true, name: true } },
                items: {
                    include: {
                        spareProduct: {
                            select: { id: true, name: true, sku: true, brand: true, model: true, sellingPrice: true },
                        },
                    },
                },
            },
        });
    },
    async getSparePurchaseById(id) {
        const purchase = await db.repairSparePurchase.findUnique({
            where: { id },
            include: {
                manager: { select: { id: true, name: true } },
                items: {
                    include: {
                        spareProduct: {
                            select: { id: true, name: true, sku: true, brand: true, model: true, sellingPrice: true },
                        },
                    },
                },
            },
        });
        if (!purchase)
            throw new error_middleware_1.AppError('Spare purchase not found', 404);
        return purchase;
    },
    async createSparePurchase(data) {
        const { managerId, supplier, invoiceNo, notes, items, branchId } = data;
        if (!managerId || !supplier || !invoiceNo || !branchId || !items || !Array.isArray(items) || items.length === 0) {
            throw new error_middleware_1.AppError('Missing required fields', 400);
        }
        const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);
        const purchase = await client_1.default.$transaction(async (tx) => {
            const created = await tx.repairSparePurchase.create({
                data: {
                    managerId,
                    supplier,
                    invoiceNo,
                    totalAmount,
                    notes: notes || null,
                    branchId,
                    items: {
                        create: items.map((item) => ({
                            spareProductId: item.spareProductId,
                            quantity: item.quantity,
                            unitCost: item.unitCost,
                            sellingPrice: item.sellingPrice || 0,
                            total: item.quantity * item.unitCost,
                        })),
                    },
                },
                include: {
                    items: {
                        include: {
                            spareProduct: {
                                select: { id: true, name: true, sku: true, brand: true, model: true },
                            },
                        },
                    },
                },
            });
            // Update stock directly on RepairSpareProduct
            for (const item of items) {
                const updateData = {
                    stockQty: { increment: item.quantity }
                };
                if (item.sellingPrice && item.sellingPrice > 0) {
                    updateData.sellingPrice = item.sellingPrice;
                }
                await tx.repairSpareProduct.update({
                    where: { id: item.spareProductId },
                    data: updateData,
                });
            }
            return created;
        });
        return purchase;
    },
    async deleteSparePurchase(id) {
        const purchase = await db.repairSparePurchase.findUnique({ where: { id } });
        if (!purchase)
            throw new error_middleware_1.AppError('Spare purchase not found', 404);
        // Restore stock
        await client_1.default.$transaction(async (tx) => {
            const items = await tx.repairSparePurchaseItem.findMany({
                where: { purchaseId: id },
            });
            for (const item of items) {
                await tx.repairSpareProduct.update({
                    where: { id: item.spareProductId },
                    data: { stockQty: { decrement: item.quantity } },
                });
            }
            await tx.repairSparePurchaseItem.deleteMany({ where: { purchaseId: id } });
            await tx.repairSparePurchase.delete({ where: { id } });
        });
        return { success: true, message: 'Spare purchase deleted successfully' };
    },
};
//# sourceMappingURL=repairSpare.service.js.map