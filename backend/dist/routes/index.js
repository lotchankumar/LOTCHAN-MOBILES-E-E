"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const order_controller_1 = require("../controllers/order.controller");
const repair_controller_1 = require("../controllers/repair.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// --- Product routes ---
// Public reads
router.get('/products', product_controller_1.productController.getAllProducts);
router.get('/products/:id', product_controller_1.productController.getProductById);
// Protected Product routes (Admin/Manager only)
router.post('/products', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN', 'MANAGER']), product_controller_1.productController.createProduct);
router.put('/products/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN', 'MANAGER']), product_controller_1.productController.updateProduct);
router.delete('/products/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN']), product_controller_1.productController.deleteProduct);
// --- Order routes ---
// Customers and Staff can create and view orders
router.post('/orders', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN']), order_controller_1.orderController.createOrder);
router.get('/orders', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN']), order_controller_1.orderController.getOrders);
router.get('/orders/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN']), order_controller_1.orderController.getOrderById);
// Only Staff/Admin can update order status
router.patch('/orders/:id/status', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['STAFF', 'MANAGER', 'ADMIN']), order_controller_1.orderController.updateOrderStatus);
// --- Repair routes ---
// Customers, Staff, and Technicians can create repairs and view them
router.post('/repairs', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN', 'TECHNICIAN']), repair_controller_1.repairController.createRepair);
router.get('/repairs', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN', 'TECHNICIAN']), repair_controller_1.repairController.getRepairs);
// Staff and Technicians can update status and add parts
router.patch('/repairs/:id/status', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['STAFF', 'MANAGER', 'ADMIN', 'TECHNICIAN']), repair_controller_1.repairController.updateStatus);
router.post('/repairs/:id/parts', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['STAFF', 'MANAGER', 'ADMIN', 'TECHNICIAN']), repair_controller_1.repairController.addParts);
const manager_routes_1 = __importDefault(require("./manager.routes"));
const branch_routes_1 = __importDefault(require("./branch.routes"));
const staff_routes_1 = __importDefault(require("./staff.routes"));
const staff_controller_1 = require("../controllers/staff.controller");
router.use('/admin/branches', branch_routes_1.default);
router.use('/admin', manager_routes_1.default);
router.use('/admin', staff_routes_1.default);
router.get('/admin/organization-hierarchy', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN']), staff_controller_1.staffController.getOrganizationHierarchy);
exports.default = router;
//# sourceMappingURL=index.js.map