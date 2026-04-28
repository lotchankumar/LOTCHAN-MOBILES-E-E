"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repairSpareController = void 0;
const repairSpare_service_1 = require("../services/repairSpare.service");
exports.repairSpareController = {
    // ===== Spare Products =====
    async getAllSpareProducts(req, res) {
        try {
            const filters = {
                ...(req.query.categoryId && { categoryId: req.query.categoryId }),
                ...(req.query.supplierId && { supplierId: req.query.supplierId }),
                ...(req.query.search && { search: req.query.search }),
                ...(req.query.lowStock === 'true' && { lowStock: true }),
            };
            const products = await repairSpare_service_1.repairSpareService.getAllSpareProducts(filters);
            res.json({ success: true, data: products });
        }
        catch (error) {
            res.status(500).json({ error: error.message || 'Failed to fetch spare products' });
        }
    },
    async getSpareProductById(req, res) {
        try {
            const product = await repairSpare_service_1.repairSpareService.getSpareProductById(req.params.id);
            res.json({ success: true, data: product });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch spare product' });
        }
    },
    async createSpareProduct(req, res) {
        try {
            const product = await repairSpare_service_1.repairSpareService.createSpareProduct(req.body);
            res.status(201).json({ success: true, data: product });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to create spare product' });
        }
    },
    async updateSpareProduct(req, res) {
        try {
            const product = await repairSpare_service_1.repairSpareService.updateSpareProduct(req.params.id, req.body);
            res.json({ success: true, data: product });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to update spare product' });
        }
    },
    async deleteSpareProduct(req, res) {
        try {
            const result = await repairSpare_service_1.repairSpareService.deleteSpareProduct(req.params.id);
            res.json(result);
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to delete spare product' });
        }
    },
    // ===== Spare Purchases =====
    async getAllSparePurchases(req, res) {
        try {
            const filters = {
                ...(req.query.startDate && { startDate: req.query.startDate }),
                ...(req.query.endDate && { endDate: req.query.endDate }),
            };
            const purchases = await repairSpare_service_1.repairSpareService.getAllSparePurchases(filters);
            res.json({ success: true, data: purchases });
        }
        catch (error) {
            res.status(500).json({ error: error.message || 'Failed to fetch spare purchases' });
        }
    },
    async getSparePurchaseById(req, res) {
        try {
            const purchase = await repairSpare_service_1.repairSpareService.getSparePurchaseById(req.params.id);
            res.json({ success: true, data: purchase });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch spare purchase' });
        }
    },
    async createSparePurchase(req, res) {
        try {
            const purchase = await repairSpare_service_1.repairSpareService.createSparePurchase(req.body);
            res.status(201).json({ success: true, data: purchase });
        }
        catch (error) {
            if (error.code === 'P2002') {
                return res.status(409).json({ error: 'Invoice number already exists' });
            }
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to create spare purchase' });
        }
    },
    async deleteSparePurchase(req, res) {
        try {
            const result = await repairSpare_service_1.repairSpareService.deleteSparePurchase(req.params.id);
            res.json(result);
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to delete spare purchase' });
        }
    },
};
//# sourceMappingURL=repairSpare.controller.js.map