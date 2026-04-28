"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseOrderController = void 0;
const purchaseOrder_service_1 = require("../services/purchaseOrder.service");
exports.purchaseOrderController = {
    async getAll(req, res) {
        try {
            const filters = {
                ...(req.query.status && { status: req.query.status }),
                ...(req.query.supplierId && { supplierId: req.query.supplierId }),
                ...(req.query.branchId && { branchId: req.query.branchId }),
            };
            const orders = await purchaseOrder_service_1.purchaseOrderService.getAll(filters);
            res.json({ success: true, data: orders });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch purchase orders' });
        }
    },
    async getById(req, res) {
        try {
            const order = await purchaseOrder_service_1.purchaseOrderService.getById(req.params.id);
            res.json({ success: true, data: order });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch purchase order' });
        }
    },
    async create(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId)
                return res.status(401).json({ error: 'Unauthorized' });
            const order = await purchaseOrder_service_1.purchaseOrderService.create(req.body, userId);
            res.status(201).json({ success: true, data: order });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to create purchase order' });
        }
    },
    async update(req, res) {
        try {
            const order = await purchaseOrder_service_1.purchaseOrderService.update(req.params.id, req.body);
            res.json({ success: true, data: order });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to update purchase order' });
        }
    },
    async receive(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId)
                return res.status(401).json({ error: 'Unauthorized' });
            const order = await purchaseOrder_service_1.purchaseOrderService.receive(req.params.id, userId);
            res.json({ success: true, data: order });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to receive purchase order' });
        }
    },
    async delete(req, res) {
        try {
            const result = await purchaseOrder_service_1.purchaseOrderService.delete(req.params.id);
            res.json(result);
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to delete purchase order' });
        }
    },
};
//# sourceMappingURL=purchaseOrder.controller.js.map