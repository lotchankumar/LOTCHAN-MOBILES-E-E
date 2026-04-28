import prisma from '../prisma/client';
import { Prisma } from '@prisma/client';
import { AppError } from '../middleware/error.middleware';
import { inventoryService } from './inventory.service';

interface CreatePOData {
  supplierId: string;
  branchId?: string | null;
  items: Array<{ productId: string; quantity: number; unitCost: number }>;
}

interface UpdatePOData {
  notes?: string;
  status?: string;
}

export const purchaseOrderService = {
  async getAll(filters?: { status?: string; supplierId?: string; branchId?: string }) {
    const where: any = {};
    if (filters?.status) where.status = filters.status;
    if (filters?.supplierId) where.supplierId = filters.supplierId;
    if (filters?.branchId) where.branchId = filters.branchId;
    return prisma.purchaseOrder.findMany({
      where,
      include: {
        supplier: { select: { id: true, name: true } },
        requestedBy: { select: { id: true, name: true } },
        branch: { select: { id: true, name: true } },
        items: { include: { product: { select: { id: true, sku: true, name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async getById(id: string) {
    const po = await prisma.purchaseOrder.findUnique({
      where: { id },
      include: {
        supplier: true,
        requestedBy: { select: { id: true, name: true } },
        branch: { select: { id: true, name: true } },
        items: { include: { product: true } },
        stockMovements: true,
      },
    });
    if (!po) throw new AppError('Purchase order not found', 404);
    return po;
  },

  async create(data: CreatePOData, userId: string) {
    if (!data.items?.length) throw new AppError('At least one item is required', 400);
    if (!data.supplierId) throw new AppError('Supplier is required', 400);

    const orderNumber = `PO-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    return prisma.$transaction(async (tx) => {
      return tx.purchaseOrder.create({
        data: {
          orderNumber,
          supplierId: data.supplierId,
          requestedById: userId,
          branchId: data.branchId ?? null,
          items: {
            create: data.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              unitCost: item.unitCost,
            })),
          },
        },
        include: {
          supplier: { select: { id: true, name: true } },
          requestedBy: { select: { id: true, name: true } },
          items: { include: { product: { select: { id: true, sku: true, name: true } } } },
        },
      });
    });
  },

  async update(id: string, data: UpdatePOData) {
    const po = await prisma.purchaseOrder.findUnique({ where: { id } });
    if (!po) throw new AppError('Purchase order not found', 404);

    return prisma.purchaseOrder.update({
      where: { id },
      data: {
        ...(data.notes !== undefined && { notes: data.notes }),
        ...(data.status !== undefined && { status: data.status as any }),
      },
      include: {
        supplier: { select: { id: true, name: true } },
        items: { include: { product: { select: { id: true, sku: true, name: true } } } },
      },
    });
  },

  async receive(id: string, userId: string) {
    const po = await prisma.purchaseOrder.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!po) throw new AppError('Purchase order not found', 404);
    if (po.status === 'RECEIVED') throw new AppError('Purchase order already received', 400);

    return prisma.$transaction(async (tx) => {
      for (const item of po.items) {
        await inventoryService.incrementStock(tx, item.productId, item.quantity, {
          type: 'PURCHASE_RECEIVE',
          reference: `PO:${po.orderNumber}`,
          purchaseOrderId: po.id,
          userId,
        });
      }

      return tx.purchaseOrder.update({
        where: { id },
        data: { status: 'RECEIVED' as any, receivedAt: new Date() },
        include: {
          supplier: { select: { id: true, name: true } },
          items: { include: { product: { select: { id: true, sku: true, name: true } } } },
        },
      });
    });
  },

  async delete(id: string) {
    const po = await prisma.purchaseOrder.findUnique({ where: { id } });
    if (!po) throw new AppError('Purchase order not found', 404);
    if (po.status === 'RECEIVED') throw new AppError('Cannot delete a received purchase order', 400);

    await prisma.purchaseOrder.delete({ where: { id } });
    return { success: true };
  },
};
