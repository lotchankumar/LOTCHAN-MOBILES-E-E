"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const manager_controller_1 = require("../controllers/manager.controller");
const purchase_controller_1 = require("../controllers/purchase.controller");
const expense_controller_1 = require("../controllers/expense.controller");
const product_controller_1 = require("../controllers/product.controller");
const supplier_controller_1 = require("../controllers/supplier.controller");
const inventory_service_1 = require("../services/inventory.service");
const repairSpare_controller_1 = require("../controllers/repairSpare.controller");
const router = express_1.default.Router();
// Manager CRUD (Admin only)
router.get('/managers', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN']), manager_controller_1.managerController.getAllManagers);
router.post('/managers', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN']), manager_controller_1.managerController.createManager);
router.patch('/managers/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN']), manager_controller_1.managerController.updateManager);
router.post('/managers/:id/reset-password', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN']), manager_controller_1.managerController.resetPassword);
// Manager Dashboard: Profit & Cashflow (Manager only)
router.get('/manager/profit', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), manager_controller_1.managerController.getProfit);
router.get('/daily-cashflow', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER']), manager_controller_1.managerController.getDailyCashflow);
// Purchases
router.post('/purchases', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), purchase_controller_1.purchaseController.createPurchase);
router.get('/purchases', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), purchase_controller_1.purchaseController.getPurchases);
// Expenses
router.post('/expenses', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), expense_controller_1.expenseController.createExpense);
router.get('/expenses', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), expense_controller_1.expenseController.getExpenses);
// Suppliers
router.get('/suppliers', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), supplier_controller_1.supplierController.getAllSuppliers);
router.post('/suppliers', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), supplier_controller_1.supplierController.createSupplier);
router.get('/suppliers/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), supplier_controller_1.supplierController.getSupplier);
router.get('/suppliers/:supplierId/payments', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), supplier_controller_1.supplierController.getPayments);
router.post('/suppliers/payments', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), supplier_controller_1.supplierController.recordPayment);
router.patch('/suppliers/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), supplier_controller_1.supplierController.updateSupplier);
router.delete('/suppliers/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN']), supplier_controller_1.supplierController.deleteSupplier);
// Products
router.get('/products', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), product_controller_1.productController.getAllProducts);
router.get('/products/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), product_controller_1.productController.getProductById);
router.post('/products', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), product_controller_1.productController.createProduct);
router.patch('/products/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN']), product_controller_1.productController.updateProduct);
router.delete('/products/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN']), product_controller_1.productController.deleteProduct);
// Categories
router.get('/categories', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), async (req, res) => {
    try {
        const categories = await inventory_service_1.inventoryService.getCategories();
        res.json({ success: true, data: categories });
    }
    catch (error) {
        res.status(error.statusCode || error.status || 500).json({ error: error.message || 'Failed to fetch categories' });
    }
});
router.post('/categories', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), async (req, res) => {
    try {
        const category = await inventory_service_1.inventoryService.createCategory(req.body);
        res.status(201).json({ success: true, data: category });
    }
    catch (error) {
        res.status(error.statusCode || error.status || 500).json({ error: error.message || 'Failed to create category' });
    }
});
// Manager Inventory (enhanced)
router.get('/inventory', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), async (req, res) => {
    try {
        const products = await inventory_service_1.inventoryService.getProducts({
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.categoryId && { categoryId: req.query.categoryId }),
            ...(req.query.search && { search: req.query.search })
        });
        // Transform for frontend
        const transformed = products.map((p) => ({
            id: p.id,
            category: p.category,
            categoryId: p.categoryType?.id,
            categoryName: p.categoryType?.name,
            supplierId: p.supplier?.id,
            supplierName: p.supplier?.name,
            brand: p.brand,
            model: p.model || '',
            sku: p.sku,
            costPrice: p.cost,
            sellingPrice: p.price,
            stockQuantity: p.stockQty,
            reorderLevel: p.minStock,
            createdAt: p.createdAt,
            needsReorder: p.stockQty <= p.minStock,
        }));
        res.json({ success: true, data: transformed });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch inventory' });
    }
});
router.get('/low-stock', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), async (req, res) => {
    try {
        const products = await inventory_service_1.inventoryService.getLowStockProducts();
        const transformed = products.map((p) => ({
            id: p.id,
            category: p.category,
            categoryId: p.categoryType?.id,
            categoryName: p.categoryType?.name,
            supplierName: p.supplier?.name,
            brand: p.brand,
            model: p.model || '',
            sku: p.sku,
            costPrice: p.cost,
            sellingPrice: p.price,
            stockQuantity: p.stockQty,
            reorderLevel: p.minStock,
            createdAt: p.createdAt,
            needsReorder: true,
        }));
        res.json({ success: true, data: transformed });
    }
    catch (error) {
        console.error('Low stock fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch low stock products', details: error instanceof Error ? error.message : String(error) });
    }
});
// ===== Repair Spare Parts Routes =====
// Spare Products
router.get('/repair-spare-products', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), repairSpare_controller_1.repairSpareController.getAllSpareProducts);
router.get('/repair-spare-products/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), repairSpare_controller_1.repairSpareController.getSpareProductById);
router.post('/repair-spare-products', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), repairSpare_controller_1.repairSpareController.createSpareProduct);
router.patch('/repair-spare-products/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), repairSpare_controller_1.repairSpareController.updateSpareProduct);
router.delete('/repair-spare-products/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN']), repairSpare_controller_1.repairSpareController.deleteSpareProduct);
// Spare Purchases
router.post('/repair-spare-purchases', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), repairSpare_controller_1.repairSpareController.createSparePurchase);
router.get('/repair-spare-purchases', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), repairSpare_controller_1.repairSpareController.getAllSparePurchases);
router.get('/repair-spare-purchases/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['MANAGER', 'ADMIN']), repairSpare_controller_1.repairSpareController.getSparePurchaseById);
router.delete('/repair-spare-purchases/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN']), repairSpare_controller_1.repairSpareController.deleteSparePurchase);
exports.default = router;
//# sourceMappingURL=manager.routes.js.map