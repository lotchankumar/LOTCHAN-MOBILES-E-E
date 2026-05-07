"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseOrderService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const error_middleware_1 = require("../middleware/error.middleware");
const inventory_service_1 = require("./inventory.service");
exports.purchaseOrderService = {
    async getAll(filters) {
        const where = {};
        if (filters?.status)
            where.status = filters.status;
        if (filters?.supplierId)
            where.supplierId = filters.supplierId;
        if (filters?.branchId)
            where.branchId = filters.branchId;
        return client_1.default.purchaseOrder.findMany({
            where,
            include: {
                supplier: { select: { id: true, name: true } },
                requestedBy: { select: { id: true, name: true } },
                branch: { select: { id: true, name: true } },
                items: { include: { product: { select: { id: true, sku: true, name: true } } } },
            },
            orderBy: { createdAt: 'desc' },
        });
    },
    async getById(id) {
        const po = await client_1.default.purchaseOrder.findUnique({
            where: { id },
            include: {
                supplier: true,
                requestedBy: { select: { id: true, name: true } },
                branch: { select: { id: true, name: true } },
                items: { include: { product: true } },
                stockMovements: true,
            },
        });
        if (!po)
            throw new error_middleware_1.AppError('Purchase order not found', 404);
        return po;
    },
    async create(data, userId) {
        if (!data.items?.length)
            throw new error_middleware_1.AppError('At least one item is required', 400);
        if (!data.supplierId)
            throw new error_middleware_1.AppError('Supplier is required', 400);
        const orderNumber = `PO-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        return client_1.default.$transaction(async (tx) => {
            return tx.purchaseOrder.create({
                data: {
                    orderNumber,
                    supplierId: data.supplierId,
                    requestedById: userId,
                    branchId: data.branchId ?? null,
                    items: {
                        create: data.items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            unitCost: item.unitCost,
                        })),
                    },
                },
                include: {
                    supplier: { select: { id: true, name: true } },
                    requestedBy: { select: { id: true, name: true } },
                    items: { include: { product: { select: { id: true, sku: true, name: true } } } },
                },
            });
        });
    },
    async update(id, data) {
        const po = await client_1.default.purchaseOrder.findUnique({ where: { id } });
        if (!po)
            throw new error_middleware_1.AppError('Purchase order not found', 404);
        return client_1.default.purchaseOrder.update({
            where: { id },
            data: {
                ...(data.notes !== undefined && { notes: data.notes }),
                ...(data.status !== undefined && { status: data.status }),
            },
            include: {
                supplier: { select: { id: true, name: true } },
                items: { include: { product: { select: { id: true, sku: true, name: true } } } },
            },
        });
    },
    async receive(id, userId) {
        const po = await client_1.default.purchaseOrder.findUnique({
            where: { id },
            include: { items: true },
        });
        if (!po)
            throw new error_middleware_1.AppError('Purchase order not found', 404);
        if (po.status === 'RECEIVED')
            throw new error_middleware_1.AppError('Purchase order already received', 400);
        if (!po.branchId)
            throw new error_middleware_1.AppError('Purchase order must be assigned to a branch to receive stock', 400);
        return client_1.default.$transaction(async (tx) => {
            for (const item of po.items) {
                await inventory_service_1.inventoryService.incrementStock(tx, item.productId, item.quantity, po.branchId, {
                    type: 'PURCHASE_RECEIVE',
                    reference: `PO:${po.orderNumber}`,
                    purchaseOrderId: po.id,
                    userId,
                });
            }
            return tx.purchaseOrder.update({
                where: { id },
                data: { status: 'RECEIVED', receivedAt: new Date() },
                include: {
                    supplier: { select: { id: true, name: true } },
                    items: { include: { product: { select: { id: true, sku: true, name: true } } } },
                },
            });
        });
    },
    async delete(id) {
        const po = await client_1.default.purchaseOrder.findUnique({ where: { id } });
        if (!po)
            throw new error_middleware_1.AppError('Purchase order not found', 404);
        if (po.status === 'RECEIVED')
            throw new error_middleware_1.AppError('Cannot delete a received purchase order', 400);
        await client_1.default.purchaseOrder.delete({ where: { id } });
        return { success: true };
    },
};
//# sourceMappingURL=purchaseOrder.service.js.map