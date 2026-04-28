"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const inventory_service_1 = require("../services/inventory.service");
const cache_service_1 = require("../services/cache.service");
exports.productController = {
    async getAllProducts(req, res) {
        try {
            const filters = {
                category: req.query.category,
                supplierId: req.query.supplierId,
                search: req.query.search,
                lowStock: req.query.lowStock === 'true'
            };
            const products = await cache_service_1.cacheService.getOrSet(`products:${JSON.stringify(filters)}`, () => inventory_service_1.inventoryService.getProducts(filters), 60);
            res.json(products);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    },
    async getProductById(req, res) {
        try {
            const id = req.params.id;
            const product = await cache_service_1.cacheService.getOrSet(`product:${id}`, () => inventory_service_1.inventoryService.getProductById(id), 120);
            res.json(product);
        }
        catch (error) {
            res.status(error.status || 500).json({ error: error.message || 'Failed to fetch product' });
        }
    },
    async createProduct(req, res) {
        try {
            const product = await inventory_service_1.inventoryService.createProduct(req.body);
            cache_service_1.cacheService.invalidatePattern('products:*');
            cache_service_1.cacheService.invalidatePattern('product:*');
            res.status(201).json(product);
        }
        catch (error) {
            res.status(error.status || 500).json({ error: error.message || 'Failed to create product' });
        }
    },
    async updateProduct(req, res) {
        try {
            const id = req.params.id;
            const product = await inventory_service_1.inventoryService.updateProduct(id, req.body);
            cache_service_1.cacheService.invalidatePattern('products:*');
            cache_service_1.cacheService.invalidatePattern('product:*');
            res.json(product);
        }
        catch (error) {
            res.status(error.status || 500).json({ error: error.message || 'Failed to update product' });
        }
    },
    async deleteProduct(req, res) {
        try {
            const id = req.params.id;
            await inventory_service_1.inventoryService.deleteProduct(id);
            cache_service_1.cacheService.invalidatePattern('products:*');
            cache_service_1.cacheService.invalidatePattern('product:*');
            res.status(204).send();
        }
        catch (error) {
            res.status(error.status || 500).json({ error: error.message || 'Failed to delete product' });
        }
    }
};
//# sourceMappingURL=product.controller.js.map