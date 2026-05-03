import { Request, Response } from 'express';
import { supplierService } from '../services/supplier.service';
import { AuthRequest } from '../middleware/auth.middleware';

export const supplierController = {
  async getAllSuppliers(req: Request, res: Response) {
    try {
      const suppliers = await supplierService.getAllSuppliers();
      const mapped = suppliers.map((s: any) => ({
        id: s.id,
        name: s.name,
        contactName: s.contactName,
        email: s.email,
        phone: s.phone,
        address: s.address,
        notes: s.notes,
        creditBalance: s.creditBalance || 0,
        totalPaid: s.totalPaid || 0,
        isActive: s.isActive,
        productCount: s._count?.products || 0,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
      }));
      res.json({ success: true, data: mapped });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch suppliers' });
    }
  },

  async getSupplier(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const supplier = await supplierService.getSupplierWithBalance(id);
      res.json({ success: true, data: supplier });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch supplier' });
    }
  },

  async createSupplier(req: Request, res: Response) {
    try {
      const supplier = await supplierService.createSupplier(req.body);
      res.status(201).json({ success: true, data: supplier });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to create supplier' });
    }
  },

  async updateSupplier(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const supplier = await supplierService.updateSupplier(id, req.body);
      res.json({ success: true, data: supplier });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to update supplier' });
    }
  },

  async deleteSupplier(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      await supplierService.deleteSupplier(id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to delete supplier' });
    }
  },

  // =========== Payment / Credit Routes ===========

  async getPayments(req: Request, res: Response) {
    try {
      const supplierId = Array.isArray(req.params.supplierId) ? req.params.supplierId[0] : req.params.supplierId;
      const payments = await supplierService.getPayments(supplierId);
      res.json({ success: true, data: payments });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch payments' });
    }
  },

  async recordPayment(req: AuthRequest, res: Response) {
    try {
      const paymentData = {
        ...req.body,
        managerId: req.user?.id,
      };
      const payment = await supplierService.recordPayment(paymentData);
      res.status(201).json({ success: true, data: payment });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to record payment' });
    }
  },
};
