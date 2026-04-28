import { Request, Response } from 'express';
import { purchaseOrderService } from '../services/purchaseOrder.service';

export const purchaseOrderController = {
  async getAll(req: Request, res: Response) {
    try {
      const filters = {
        ...(req.query.status && { status: req.query.status as string }),
        ...(req.query.supplierId && { supplierId: req.query.supplierId as string }),
        ...(req.query.branchId && { branchId: req.query.branchId as string }),
      };
      const orders = await purchaseOrderService.getAll(filters);
      res.json({ success: true, data: orders });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch purchase orders' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const order = await purchaseOrderService.getById(req.params.id as string);
      res.json({ success: true, data: order });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch purchase order' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      const order = await purchaseOrderService.create(req.body, userId);
      res.status(201).json({ success: true, data: order });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to create purchase order' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const order = await purchaseOrderService.update(req.params.id as string, req.body);
      res.json({ success: true, data: order });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to update purchase order' });
    }
  },

  async receive(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      const order = await purchaseOrderService.receive(req.params.id as string, userId);
      res.json({ success: true, data: order });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to receive purchase order' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const result = await purchaseOrderService.delete(req.params.id as string);
      res.json(result);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to delete purchase order' });
    }
  },
};
