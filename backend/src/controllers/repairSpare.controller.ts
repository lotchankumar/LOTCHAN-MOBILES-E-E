import { Request, Response } from 'express';
import { repairSpareService } from '../services/repairSpare.service';

export const repairSpareController = {
  // ===== Spare Products =====
  async getAllSpareProducts(req: Request, res: Response) {
    try {
      const filters = {
        ...(req.query.categoryId && { categoryId: req.query.categoryId as string }),
        ...(req.query.supplierId && { supplierId: req.query.supplierId as string }),
        ...(req.query.search && { search: req.query.search as string }),
        ...(req.query.lowStock === 'true' && { lowStock: true }),
      };
      const products = await repairSpareService.getAllSpareProducts(filters);
      res.json({ success: true, data: products });
    } catch (error: any) {
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
      const product = await repairSpareService.createSpareProduct(req.body);
      res.status(201).json({ success: true, data: product });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to create spare product' });
    }
  },

  async updateSpareProduct(req: Request, res: Response) {
    try {
      const product = await repairSpareService.updateSpareProduct(req.params.id as string, req.body);
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
      const filters = {
        ...(req.query.startDate && { startDate: req.query.startDate as string }),
        ...(req.query.endDate && { endDate: req.query.endDate as string }),
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
