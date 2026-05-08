import express from 'express';
import { productController } from '../controllers/product.controller';
import { orderController } from '../controllers/order.controller';
import { repairController } from '../controllers/repair.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = express.Router();

// --- Product routes ---
// Public reads
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);

// Protected Product routes (Admin/Manager only)
router.post('/products', authenticate, requireRole(['ADMIN', 'MANAGER']), productController.createProduct);
router.put('/products/:id', authenticate, requireRole(['ADMIN', 'MANAGER']), productController.updateProduct);
router.delete('/products/:id', authenticate, requireRole(['ADMIN']), productController.deleteProduct);

// --- Order routes ---
// Customers and Staff can create and view orders
router.post('/orders', authenticate, requireRole(['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN']), orderController.createOrder);
router.get('/orders', authenticate, requireRole(['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN']), orderController.getOrders);
router.get('/orders/:id', authenticate, requireRole(['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN']), orderController.getOrderById);

// Only Staff/Admin can update order status
router.patch('/orders/:id/status', authenticate, requireRole(['STAFF', 'MANAGER', 'ADMIN']), orderController.updateOrderStatus);

// --- Repair routes ---
// Customers, Staff, and Technicians can create repairs and view them
router.post('/repairs', authenticate, requireRole(['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN', 'TECHNICIAN']), repairController.createRepair);
router.get('/repairs', authenticate, requireRole(['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN', 'TECHNICIAN']), repairController.getRepairs);

// Staff and Technicians can update status and add parts
router.patch('/repairs/:id/status', authenticate, requireRole(['STAFF', 'MANAGER', 'ADMIN', 'TECHNICIAN']), repairController.updateStatus);
router.post('/repairs/:id/parts', authenticate, requireRole(['STAFF', 'MANAGER', 'ADMIN', 'TECHNICIAN']), repairController.addParts);

import managerRoutes from './manager.routes';
import branchRoutes from './branch.routes';
import staffRoutes from './staff.routes';
import { staffController } from '../controllers/staff.controller';
import { auditLogController } from '../controllers/auditLog.controller';

router.use('/admin/branches', branchRoutes);
router.use('/admin', managerRoutes);
router.use('/admin', staffRoutes);
router.get('/admin/organization-hierarchy', authenticate, requireRole(['ADMIN']), staffController.getOrganizationHierarchy);

// Audit Logs (Admin only)
router.get('/admin/audit-logs/stats', authenticate, requireRole(['ADMIN']), auditLogController.getStats);
router.get('/admin/audit-logs/export', authenticate, requireRole(['ADMIN']), auditLogController.exportCSV);
router.get('/admin/audit-logs', authenticate, requireRole(['ADMIN']), auditLogController.getLogs);

export default router;
