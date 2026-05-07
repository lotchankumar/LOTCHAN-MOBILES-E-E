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
        let products = await db.repairSpareProduct.findMany({
            where,
            include: {
                categoryType: { select: { id: true, name: true } },
                supplier: { select: { id: true, name: true } },
                branchStocks: filters?.branchId ? { where: { branchId: filters.branchId } } : true,
            },
            orderBy: { createdAt: 'desc' },
        });
        products = products.map((p) => {
            const stockQty = p.branchStocks?.reduce((sum, bs) => sum + bs.stockQty, 0) || 0;
            const minStock = p.branchStocks?.reduce((sum, bs) => sum + bs.minStock, 0) || 5;
            return { ...p, stockQty, minStock };
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
                branchStocks: true,
            },
        });
        if (!product)
            throw new error_middleware_1.AppError('Spare product not found', 404);
        const stockQty = product.branchStocks?.reduce((sum, bs) => sum + bs.stockQty, 0) || 0;
        const minStock = product.branchStocks?.reduce((sum, bs) => sum + bs.minStock, 0) || 5;
        return { ...product, stockQty, minStock };
    },
    async createSpareProduct(data) {
        if (await db.repairSpareProduct.findUnique({ where: { sku: data.sku } })) {
            throw new error_middleware_1.AppError('SKU already exists', 409);
        }
        const createData = {
            name: data.name,
            sku: data.sku,
            ...(data.description !== undefined && { description: data.description }),
            ...(data.categoryId && { categoryId: data.categoryId }),
            ...(data.supplierId && { supplierId: data.supplierId }),
            ...(data.brand && { brand: data.brand }),
            ...(data.model !== undefined && { model: data.model }),
            ...(data.compatibleDevices !== undefined && { compatibleDevices: data.compatibleDevices }),
            ...(data.purchasePrice !== undefined && { purchasePrice: data.purchasePrice }),
            ...(data.sellingPrice !== undefined && { sellingPrice: data.sellingPrice }),
            ...(data.stockQty !== undefined && { stockQty: data.stockQty }),
            ...(data.minStock !== undefined && { minStock: data.minStock }),
            ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
        };
        return db.repairSpareProduct.create({ data: createData });
    },
    async updateSpareProduct(id, data) {
        const product = await db.repairSpareProduct.findUnique({ where: { id } });
        if (!product)
            throw new error_middleware_1.AppError('Spare product not found', 404);
        if (data.sku && data.sku !== product.sku) {
            if (await db.repairSpareProduct.findUnique({ where: { sku: data.sku } })) {
                throw new error_middleware_1.AppError('SKU already exists', 409);
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
            ...(data.stockQty !== undefined && { stockQty: data.stockQty }),
            ...(data.minStock !== undefined && { minStock: data.minStock }),
            ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
            ...(data.isAvailable !== undefined && { isAvailable: data.isAvailable }),
        };
        return db.repairSpareProduct.update({ where: { id }, data: updateData });
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
            where.createdAt = {
                gte: new Date(filters.startDate + 'T00:00:00.000Z'),
                lte: new Date(filters.endDate + 'T23:59:59.999Z'),
            };
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
            // Update stock for each item, and also set selling price if provided
            for (const item of items) {
                if (item.sellingPrice && item.sellingPrice > 0) {
                    await tx.repairSpareProduct.update({
                        where: { id: item.spareProductId },
                        data: { sellingPrice: item.sellingPrice },
                    });
                }
                await tx.branchRepairSpareStock.upsert({
                    where: { branchId_spareProductId: { branchId, spareProductId: item.spareProductId } },
                    update: { stockQty: { increment: item.quantity } },
                    create: { branchId, spareProductId: item.spareProductId, stockQty: item.quantity }
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
                await tx.branchRepairSpareStock.update({
                    where: { branchId_spareProductId: { branchId: purchase.branchId, spareProductId: item.spareProductId } },
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