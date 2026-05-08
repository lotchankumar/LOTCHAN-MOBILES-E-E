import express from 'express';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import { managerController } from '../controllers/manager.controller';
import { purchaseController } from '../controllers/purchase.controller';
import { expenseController } from '../controllers/expense.controller';
import { productController } from '../controllers/product.controller';
import { supplierController } from '../controllers/supplier.controller';
import { inventoryService } from '../services/inventory.service';
import { repairSpareController } from '../controllers/repairSpare.controller';

const router = express.Router();

// Manager CRUD (Admin only)
router.get('/managers', authenticate, requireRole(['ADMIN']), managerController.getAllManagers);
router.post('/managers', authenticate, requireRole(['ADMIN']), managerController.createManager);
router.patch('/managers/:id', authenticate, requireRole(['ADMIN']), managerController.updateManager);
router.post('/managers/:id/reset-password', authenticate, requireRole(['ADMIN']), managerController.resetPassword);

// Manager Dashboard: Profit & Cashflow (Manager only)
router.get('/manager/profit', authenticate, requireRole(['MANAGER', 'ADMIN']), managerController.getProfit);
router.get('/daily-cashflow', authenticate, requireRole(['MANAGER']), managerController.getDailyCashflow);
router.get('/dashboard-stats', authenticate, requireRole(['MANAGER', 'ADMIN']), managerController.getDashboardStats);

// Purchases
router.post('/purchases', authenticate, requireRole(['MANAGER', 'ADMIN']), purchaseController.createPurchase);
router.get('/purchases', authenticate, requireRole(['MANAGER', 'ADMIN']), purchaseController.getPurchases);

// Expenses
router.post('/expenses', authenticate, requireRole(['MANAGER', 'ADMIN']), expenseController.createExpense);
router.get('/expenses', authenticate, requireRole(['MANAGER', 'ADMIN']), expenseController.getExpenses);


// Suppliers
router.get('/suppliers', authenticate, requireRole(['MANAGER', 'ADMIN']), supplierController.getAllSuppliers);
router.post('/suppliers', authenticate, requireRole(['MANAGER', 'ADMIN']), supplierController.createSupplier);
router.get('/suppliers/:id', authenticate, requireRole(['MANAGER', 'ADMIN']), supplierController.getSupplier);
router.get('/suppliers/:supplierId/payments', authenticate, requireRole(['MANAGER', 'ADMIN']), supplierController.getPayments);
router.post('/suppliers/payments', authenticate, requireRole(['MANAGER', 'ADMIN']), supplierController.recordPayment);
router.patch('/suppliers/:id', authenticate, requireRole(['MANAGER', 'ADMIN']), supplierController.updateSupplier);
router.delete('/suppliers/:id', authenticate, requireRole(['ADMIN']), supplierController.deleteSupplier);

// Products
router.get('/products', authenticate, requireRole(['MANAGER', 'ADMIN']), productController.getAllProducts);
router.get('/products/:id', authenticate, requireRole(['MANAGER', 'ADMIN']), productController.getProductById);
router.post('/products', authenticate, requireRole(['MANAGER', 'ADMIN']), productController.createProduct);
router.patch('/products/:id', authenticate, requireRole(['MANAGER', 'ADMIN']), productController.updateProduct);
router.delete('/products/:id', authenticate, requireRole(['ADMIN']), productController.deleteProduct);

// Categories
router.get('/categories', authenticate, requireRole(['MANAGER', 'ADMIN']), async (req: express.Request, res: express.Response) => {
  try {
    const categories = await inventoryService.getCategories();
    res.json({ success: true, data: categories });
  } catch (error: any) {
    res.status(error.statusCode || error.status || 500).json({ error: error.message || 'Failed to fetch categories' });
  }
});
router.post('/categories', authenticate, requireRole(['MANAGER', 'ADMIN']), async (req: express.Request, res: express.Response) => {
  try {
    const category = await inventoryService.createCategory(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error: any) {
    res.status(error.statusCode || error.status || 500).json({ error: error.message || 'Failed to create category' });
  }
});

// Manager Product Inventory (branch-scoped, normal products ONLY — repair spares have their own endpoint)
router.get('/inventory', authenticate, requireRole(['MANAGER', 'ADMIN']), async (req: express.Request, res: express.Response) => {
  try {
    const authUser = (req as any).user;
    const branchId = authUser.role === 'MANAGER' ? authUser.branchId : (req.query.branchId as string | undefined);
    
    // Fetch normal products ONLY (repair spares are served by /repair-spare-products)
    const products = await inventoryService.getProducts({
      ...(req.query.category && { category: req.query.category as string }),
      ...(req.query.categoryId && { categoryId: req.query.categoryId as string }),
      ...(req.query.search && { search: req.query.search as string }),
      ...(branchId && { branchId }),
    });

    // Transform for frontend
    const transformed: any[] = [];

    for (const p of products) {
      if (!branchId && p.branchStocks && p.branchStocks.length > 0) {
        // Admin view across all branches: flatten so each branch has its own row
        for (const bs of p.branchStocks) {
          transformed.push({
            id: `${p.id}-${bs.branchId}`,
            originalId: p.id,
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
            stockQuantity: bs.stockQty,
            reorderLevel: bs.minStock,
            createdAt: p.createdAt,
            needsReorder: bs.stockQty <= bs.minStock,
            branchName: bs.branch?.name || 'Unknown',
            type: 'NORMAL'
          });
        }
      } else {
        // Manager view (filtered by branch) OR global product with no stock
        transformed.push({
          id: p.id,
          originalId: p.id,
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
          branchName: p.branchStocks?.[0]?.branch?.name || (branchId ? 'Unknown' : 'Global (No Stock)'),
          type: 'NORMAL'
        });
      }
    }

    res.json({ success: true, data: transformed });
  } catch (error) {
    console.error('Inventory fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

router.get('/low-stock', authenticate, requireRole(['MANAGER', 'ADMIN']), async (req: express.Request, res: express.Response) => {
  try {
    const authUser = (req as any).user;
    const branchId = authUser.role === 'MANAGER' ? authUser.branchId : (req.query.branchId as string | undefined);
    const products = await inventoryService.getLowStockProducts(branchId);
    const transformed = products.map((p: any) => ({
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
  } catch (error) {
    console.error('Low stock fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch low stock products', details: error instanceof Error ? error.message : String(error) });
  }
});

// ===== Repair Spare Parts Routes =====
// Inject branch scope for MANAGER callers before hitting the controller
const injectManagerBranch = (req: express.Request, _res: express.Response, next: express.NextFunction) => {
  const authUser = (req as any).user;
  
  if ((authUser?.role === 'MANAGER' || authUser?.role === 'ADMIN') && authUser.branchId) {
    // If the frontend didn't supply a branchId (or for MANAGERs who shouldn't override), inject the auth user's branch
    if (authUser.role === 'MANAGER' || !req.query?.branchId) {
      (req as any).managerBranchId = authUser.branchId;
      if (req.body && typeof req.body === 'object') {
        req.body.branchId = authUser.branchId;
      }
    }
  }
  next();
};

// Spare Products (branch-scoped for MANAGERs)
router.get('/repair-spare-products', authenticate, requireRole(['MANAGER', 'ADMIN']), injectManagerBranch, repairSpareController.getAllSpareProducts);
router.get('/repair-spare-products/:id', authenticate, requireRole(['MANAGER', 'ADMIN']), injectManagerBranch, repairSpareController.getSpareProductById);
router.post('/repair-spare-products', authenticate, requireRole(['MANAGER', 'ADMIN']), injectManagerBranch, repairSpareController.createSpareProduct);
router.patch('/repair-spare-products/:id', authenticate, requireRole(['MANAGER', 'ADMIN']), injectManagerBranch, repairSpareController.updateSpareProduct);
router.delete('/repair-spare-products/:id', authenticate, requireRole(['ADMIN']), injectManagerBranch, repairSpareController.deleteSpareProduct);

// Spare Purchases (branch-scoped for MANAGERs)
router.post('/repair-spare-purchases', authenticate, requireRole(['MANAGER', 'ADMIN']), injectManagerBranch, repairSpareController.createSparePurchase);
router.get('/repair-spare-purchases', authenticate, requireRole(['MANAGER', 'ADMIN']), injectManagerBranch, repairSpareController.getAllSparePurchases);
router.get('/repair-spare-purchases/:id', authenticate, requireRole(['MANAGER', 'ADMIN']), injectManagerBranch, repairSpareController.getSparePurchaseById);
router.delete('/repair-spare-purchases/:id', authenticate, requireRole(['ADMIN']), injectManagerBranch, repairSpareController.deleteSparePurchase);

export default router;
