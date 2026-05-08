import { Request, Response } from 'express';
import { repairSpareService } from '../services/repairSpare.service';

export const repairSpareController = {
  // ===== Spare Products =====
  async getAllSpareProducts(req: Request, res: Response) {
    try {
      const authUser = (req as any).user;
      console.log('[RepairSpare] GET /repair-spare-products | user:', authUser?.email, 'role:', authUser?.role, 'branchId:', authUser?.branchId);
      console.log('[RepairSpare] req.query.branchId:', req.query.branchId);

      const branchId = (req as any).managerBranchId || req.query.branchId;

      const filters = {
        ...(req.query.categoryId && { categoryId: req.query.categoryId as string }),
        ...(req.query.supplierId && { supplierId: req.query.supplierId as string }),
        ...(req.query.search && { search: req.query.search as string }),
        ...(req.query.lowStock === 'true' && { lowStock: true }),
        ...(branchId && { branchId: branchId as string }),
      };
      console.log('[RepairSpare] filters:', JSON.stringify(filters));

      const products = await repairSpareService.getAllSpareProducts(filters);
      console.log('[RepairSpare] returned', products.length, 'products');
      res.json({ success: true, data: products });
    } catch (error: any) {
      console.error('[RepairSpare] getAllSpareProducts error:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch spare products' });
    }
  },

  async getSpareProductById(req: Request, res: Response) {
    try {
      const product = await repairSpareService.getSpareProductById(req.params.id as string);
      res.json({ success: true, data: product });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch spare product' });
    }
  },

  async createSpareProduct(req: Request, res: Response) {
    try {
      const data = { ...req.body };
      if (req.query.branchId) data.branchId = req.query.branchId as string;
      const product = await repairSpareService.createSpareProduct(data);
      res.status(201).json({ success: true, data: product });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to create spare product' });
    }
  },

  async updateSpareProduct(req: Request, res: Response) {
    try {
      const data = { ...req.body };
      if (req.query.branchId) data.branchId = req.query.branchId as string;
      const product = await repairSpareService.updateSpareProduct(req.params.id as string, data);
      res.json({ success: true, data: product });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to update spare product' });
    }
  },

  async deleteSpareProduct(req: Request, res: Response) {
    try {
      const result = await repairSpareService.deleteSpareProduct(req.params.id as string);
      res.json(result);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to delete spare product' });
    }
  },

  // ===== Spare Purchases =====
  async getAllSparePurchases(req: Request, res: Response) {
    try {
      const branchId = (req as any).managerBranchId || req.query.branchId;
      const filters = {
        ...(req.query.startDate && { startDate: req.query.startDate as string }),
        ...(req.query.endDate && { endDate: req.query.endDate as string }),
        ...(branchId && { branchId: branchId as string }),
      };
      const purchases = await repairSpareService.getAllSparePurchases(filters);
      res.json({ success: true, data: purchases });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to fetch spare purchases' });
    }
  },

  async getSparePurchaseById(req: Request, res: Response) {
    try {
      const purchase = await repairSpareService.getSparePurchaseById(req.params.id as string);
      res.json({ success: true, data: purchase });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch spare purchase' });
    }
  },

  async createSparePurchase(req: Request, res: Response) {
    try {
      const purchase = await repairSpareService.createSparePurchase(req.body);
      res.status(201).json({ success: true, data: purchase });
    } catch (error: any) {
      if (error.code === 'P2002') {
        return res.status(409).json({ error: 'Invoice number already exists' });
      }
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to create spare purchase' });
    }
  },

  async deleteSparePurchase(req: Request, res: Response) {
    try {
      const result = await repairSpareService.deleteSparePurchase(req.params.id as string);
      res.json(result);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to delete spare purchase' });
    }
  },
};
