import { Request, Response } from 'express';
import { repairService } from '../services/repair.service';
import { RepairStatus } from '@prisma/client';
import prisma from '../prisma/client';
import { auditLogService } from '../services/auditLog.service';

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
        assignedToId,
        branchId: req.body.branchId || user?.branchId
      });

      // Log repair creation
      auditLogService.logAction({
        userId: user?.id,
        action: 'REPAIR_CREATED',
        entity: 'RepairJob',
        entityId: job.id,
        details: JSON.stringify({ ticketNumber: job.ticketNumber, deviceModel, estimatedCost }),
        branchId: req.body.branchId || user?.branchId,
        ipAddress: req.ip,
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
      const user = (req as any).user;
      const job = await repairService.updateRepairStatus(id, status as RepairStatus);

      // Log repair status update
      auditLogService.logAction({
        userId: user?.id,
        action: 'REPAIR_STATUS_UPDATED',
        entity: 'RepairJob',
        entityId: id,
        details: JSON.stringify({ ticketNumber: job.ticketNumber, newStatus: status }),
        branchId: user?.branchId,
        ipAddress: req.ip,
      });

      res.json(job);
    } catch (error) {
      console.error('Failed to update repair status:', error);
      res.status(500).json({ error: 'Failed to update repair status' });
    }
  },

  async addParts(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { parts } = req.body;
      const user = (req as any).user;
      await repairService.usePartsInRepair(id, parts);

      // Log parts added
      auditLogService.logAction({
        userId: user?.id,
        action: 'REPAIR_PARTS_ADDED',
        entity: 'RepairJob',
        entityId: id,
        details: JSON.stringify({ partsCount: parts?.length }),
        branchId: user?.branchId,
        ipAddress: req.ip,
      });

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
