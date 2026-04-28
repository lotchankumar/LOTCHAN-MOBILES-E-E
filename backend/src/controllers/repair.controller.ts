import { Request, Response } from 'express';
import { repairService } from '../services/repair.service';
import { RepairStatus } from '@prisma/client';
import prisma from '../prisma/client';

export const repairController = {
  async createRepair(req: Request, res: Response) {
    try {
      const { customerId, deviceModel, imeiSerial, issueDescription, estimatedCost, advancePaid, assignedToId } = req.body;
      
      const user = (req as any).user;
      const finalCustomerId = user && user.role === 'CUSTOMER' ? user.id : customerId;
      
      const job = await repairService.createRepairJob({
        customerId: finalCustomerId,
        deviceModel,
        imeiSerial,
        issueDescription,
        estimatedCost,
        advancePaid,
        assignedToId
      });
      res.status(201).json(job);
    } catch (error) {
      console.error('Failed to create repair job:', error);
      res.status(500).json({ error: 'Failed to create repair job' });
    }
  },

  async getRepairs(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const isCustomer = user && user.role === 'CUSTOMER';
      
      const repairs = await prisma.repairJob.findMany({
        where: isCustomer ? { customerId: user.id } : undefined,
        orderBy: { createdAt: 'desc' },
        include: { customer: true }
      });
      
      res.json(repairs);
    } catch (error) {
      console.error('Failed to fetch repair jobs:', error);
      res.status(500).json({ error: 'Failed to fetch repair jobs' });
    }
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { status } = req.body;
      const job = await repairService.updateRepairStatus(id, status as RepairStatus);
      res.json(job);
    } catch (error) {
      console.error('Failed to update repair status:', error);
      res.status(500).json({ error: 'Failed to update repair status' });
    }
  },

  async addParts(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { parts } = req.body; // Array<{ productId: string; quantity: number }>
      await repairService.usePartsInRepair(id, parts);
      res.status(200).json({ success: true, message: 'Parts added to repair successfully' });
    } catch (error: any) {
      if (error.message && error.message.includes('Insufficient stock')) {
        return res.status(400).json({ error: error.message });
      }
      console.error('Failed to add parts to repair:', error);
      res.status(500).json({ error: 'Failed to add parts to repair' });
    }
  }
};
