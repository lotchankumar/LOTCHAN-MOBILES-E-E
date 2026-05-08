"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const inventory_service_1 = require("../services/inventory.service");
const cache_service_1 = require("../services/cache.service");
const auditLog_service_1 = require("../services/auditLog.service");
const client_1 = __importDefault(require("../prisma/client"));
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
            const user = req.user;
            // Create BranchStock for the creator's branch so the product appears in branch-scoped inventory
            const branchId = req.body.branchId || user?.branchId;
            if (branchId) {
                try {
                    await client_1.default.branchStock.create({
                        data: {
                            branchId,
                            productId: product.id,
                            stockQty: req.body.stockQty || 0,
                            minStock: req.body.minStock || 5,
                        },
                    });
                }
                catch (stockErr) {
                    console.error('[PRODUCT] Failed to create branch stock:', stockErr);
                }
            }
            auditLog_service_1.auditLogService.logAction({
                userId: user?.id,
                action: 'PRODUCT_CREATED',
                entity: 'Product',
                entityId: product.id,
                details: JSON.stringify({ name: req.body.name || `${req.body.brand} ${req.body.model}`, sku: product.sku }),
                branchId: user?.branchId,
                ipAddress: req.ip,
            });
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
            const user = req.user;
            auditLog_service_1.auditLogService.logAction({
                userId: user?.id,
                action: 'PRODUCT_UPDATED',
                entity: 'Product',
                entityId: id,
                details: JSON.stringify(req.body),
                branchId: user?.branchId,
                ipAddress: req.ip,
            });
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
            const user = req.user;
            auditLog_service_1.auditLogService.logAction({
                userId: user?.id,
                action: 'PRODUCT_DELETED',
                entity: 'Product',
                entityId: id,
                details: JSON.stringify({ deletedProductId: id }),
                branchId: user?.branchId,
                ipAddress: req.ip,
            });
            res.status(204).send();
        }
        catch (error) {
            res.status(error.status || 500).json({ error: error.message || 'Failed to delete product' });
        }
    }
};
//# sourceMappingURL=product.controller.js.map