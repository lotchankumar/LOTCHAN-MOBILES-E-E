"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierController = void 0;
const supplier_service_1 = require("../services/supplier.service");
exports.supplierController = {
    async getAllSuppliers(req, res) {
        try {
            const suppliers = await supplier_service_1.supplierService.getAllSuppliers();
            const mapped = suppliers.map((s) => ({
                id: s.id,
                name: s.name,
                contactName: s.contactName,
                email: s.email,
                phone: s.phone,
                address: s.address,
                notes: s.notes,
                creditBalance: s.creditBalance || 0,
                totalPaid: s.totalPaid || 0,
                isActive: s.isActive,
                productCount: s._count?.products || 0,
                createdAt: s.createdAt,
                updatedAt: s.updatedAt,
            }));
            res.json({ success: true, data: mapped });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch suppliers' });
        }
    },
    async getSupplier(req, res) {
        try {
            const id = req.params.id;
            const supplier = await supplier_service_1.supplierService.getSupplierWithBalance(id);
            res.json({ success: true, data: supplier });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch supplier' });
        }
    },
    async createSupplier(req, res) {
        try {
            const supplier = await supplier_service_1.supplierService.createSupplier(req.body);
            res.status(201).json({ success: true, data: supplier });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to create supplier' });
        }
    },
    async updateSupplier(req, res) {
        try {
            const id = req.params.id;
            const supplier = await supplier_service_1.supplierService.updateSupplier(id, req.body);
            res.json({ success: true, data: supplier });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to update supplier' });
        }
    },
    async deleteSupplier(req, res) {
        try {
            const id = req.params.id;
            await supplier_service_1.supplierService.deleteSupplier(id);
            res.json({ success: true });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to delete supplier' });
        }
    },
    // =========== Payment / Credit Routes ===========
    async getPayments(req, res) {
        try {
            const supplierId = Array.isArray(req.params.supplierId) ? req.params.supplierId[0] : req.params.supplierId;
            const payments = await supplier_service_1.supplierService.getPayments(supplierId);
            res.json({ success: true, data: payments });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch payments' });
        }
    },
    async recordPayment(req, res) {
        try {
            const paymentData = {
                ...req.body,
                managerId: req.user?.id,
            };
            const payment = await supplier_service_1.supplierService.recordPayment(paymentData);
            res.status(201).json({ success: true, data: payment });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to record payment' });
        }
    },
};
//# sourceMappingURL=supplier.controller.js.map