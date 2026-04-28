import { RepairStatus } from '@prisma/client';
import { inventoryService } from './inventory.service';
import { queueService } from './queue.service';
import prisma from '../prisma/client';

export const repairService = {
  async createRepairJob(data: {
    customerId: string;
    deviceModel: string;
    imeiSerial?: string;
    issueDescription: string;
    estimatedCost?: number;
    advancePaid?: number;
    assignedToId?: string;
  }) {
    const ticketNumber = `REP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    const job = await prisma.repairJob.create({
      data: {
        ticketNumber,
        customerId: data.customerId,
        deviceModel: data.deviceModel,
        imeiSerial: data.imeiSerial,
        issueDescription: data.issueDescription,
        estimatedCost: data.estimatedCost,
        advancePaid: data.advancePaid || 0,
        assignedToId: data.assignedToId,
        status: RepairStatus.RECEIVED
      },
      include: { customer: true }
    });

    await queueService.addJob('sendRepairStatusUpdate', {
      customerEmail: job.customer.email,
      customerPhone: job.customer.phone,
      ticketNumber: job.ticketNumber,
      status: 'received'
    });

    return job;
  },

  async usePartsInRepair(repairJobId: string, parts: Array<{ productId: string; quantity: number }>) {
    return prisma.$transaction(async (tx) => {
      for (const part of parts) {
        // Check stock and decrement atomically
        await inventoryService.decrementStock(tx, part.productId, part.quantity);
        
        const product = await tx.product.findUniqueOrThrow({ where: { id: part.productId } });
        
        await tx.repairPart.create({
          data: {
            repairJobId,
            productId: part.productId,
            quantity: part.quantity,
            unitPrice: product.cost // or price depending on policy
          }
        });
      }
    });
  },

  async updateRepairStatus(jobId: string, newStatus: RepairStatus) {
    const job = await prisma.repairJob.update({
      where: { id: jobId },
      data: { status: newStatus },
      include: { customer: true }
    });

    await queueService.addJob('sendRepairStatusUpdate', {
      customerEmail: job.customer.email,
      customerPhone: job.customer.phone,
      ticketNumber: job.ticketNumber,
      status: newStatus
    });

    return job;
  }
};
