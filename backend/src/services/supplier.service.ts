import prisma from '../prisma/client';
import { AppError } from '../middleware/error.middleware';

export interface CreateSupplierData {
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

export interface UpdateSupplierData {
  name?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  isActive?: boolean;
}

export interface CreatePaymentData {
  supplierId: string;
  amount: number;
  paymentType: 'CREDIT' | 'DEBIT';
  reference?: string;
  description?: string;
  paymentDate?: string;
  managerId?: string;
}

export const supplierService = {
  async getAllSuppliers() {
    const suppliers = await prisma.supplier.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { products: true }
        },
        payments: {
          where: { paymentType: 'DEBIT' },
          select: { amount: true }
        }
      }
    });

    return suppliers.map(supplier => {
      const totalPaid = supplier.payments.reduce((sum, p) => sum + p.amount, 0);
      return {
        ...supplier,
        totalPaid
      };
    });
  },

  async getSupplierById(id: string) {
    const supplier = await prisma.supplier.findUnique({
      where: { id },
      include: {
        products: {
          select: { id: true, name: true, sku: true, stockQty: true }
        },
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 50
        }
      }
    });
    if (!supplier) {
      throw new AppError('Supplier not found', 404);
    }
    
    const totalPaid = supplier.payments
      .filter(p => p.paymentType === 'DEBIT')
      .reduce((sum, p) => sum + p.amount, 0);

    return {
      ...supplier,
      productCount: supplier.products.length,
      totalPaid
    };
  },

  async createSupplier(data: CreateSupplierData) {
    if (!data.name?.trim()) {
      throw new AppError('Supplier name is required', 400);
    }
    // Check email unique if provided
    if (data.email && data.email.trim()) {
      const existing = await prisma.supplier.findUnique({
        where: { email: data.email.toLowerCase().trim() }
      });
      if (existing) {
        throw new AppError('Email already registered', 409);
      }
    }
    return prisma.supplier.create({
      data: {
        name: data.name.trim(),
        contactName: data.contactName?.trim() || null,
        email: data.email?.trim() ? data.email.toLowerCase().trim() : null,
        phone: data.phone?.trim() || null,
        address: data.address?.trim() || null,
        notes: data.notes?.trim() || null,
      }
    });
  },

  async updateSupplier(id: string, data: UpdateSupplierData) {
    const supplier = await prisma.supplier.findUnique({ where: { id } });
    if (!supplier) {
      throw new AppError('Supplier not found', 404);
    }
    // Check email unique if changed
    const cleanEmail = data.email?.trim() ? data.email.toLowerCase().trim() : null;
    
    if (cleanEmail && cleanEmail !== supplier.email) {
      const existing = await prisma.supplier.findUnique({
        where: { email: cleanEmail }
      });
      if (existing) {
        throw new AppError('Email already registered', 409);
      }
    }

    const updateData: any = { ...data };
    if (updateData.name !== undefined) updateData.name = updateData.name.trim();
    if (updateData.email !== undefined) updateData.email = cleanEmail;
    if (updateData.contactName !== undefined) updateData.contactName = updateData.contactName?.trim() || null;
    if (updateData.phone !== undefined) updateData.phone = updateData.phone?.trim() || null;
    if (updateData.address !== undefined) updateData.address = updateData.address?.trim() || null;
    if (updateData.notes !== undefined) updateData.notes = updateData.notes?.trim() || null;

    return prisma.supplier.update({
      where: { id },
      data: updateData
    });
  },

  async deleteSupplier(id: string) {
    const supplier = await prisma.supplier.findUnique({ 
      where: { id },
      include: { 
        products: true,
        purchaseOrders: { take: 1 },
        purchases: { take: 1 }
      }
    });
    if (!supplier) {
      throw new AppError('Supplier not found', 404);
    }
    if (supplier.products.length > 0) {
      throw new AppError('Cannot delete supplier with associated products', 400);
    }
    if (supplier.purchaseOrders.length > 0) {
      throw new AppError('Cannot delete supplier with associated purchase orders', 400);
    }
    await prisma.supplier.delete({ where: { id } });
    return { success: true };
  },

  // ========== Credit / Payment Management ==========

  async getPayments(supplierId: string) {
    const supplier = await prisma.supplier.findUnique({ where: { id: supplierId } });
    if (!supplier) throw new AppError('Supplier not found', 404);
    
    return (prisma as any).supplierPayment.findMany({
      where: { supplierId },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  },

  async recordPayment(data: CreatePaymentData) {
    const supplier = await prisma.supplier.findUnique({ where: { id: data.supplierId } });
    if (!supplier) throw new AppError('Supplier not found', 404);
    if (data.amount <= 0) throw new AppError('Amount must be positive', 400);

    return prisma.$transaction(async (tx) => {
      // For CREDIT: supplier gives us goods -> our debt to them increases
      // For DEBIT: we pay supplier -> our debt to them decreases
      const creditChange = data.paymentType === 'CREDIT' ? data.amount : -data.amount;

      await tx.supplier.update({
        where: { id: data.supplierId },
        data: { creditBalance: { increment: creditChange } },
      });

      const payment = await (tx as any).supplierPayment.create({
        data: {
          supplierId: data.supplierId,
          amount: data.amount,
          paymentType: data.paymentType,
          reference: data.reference ?? null,
          description: data.description ?? null,
          paymentDate: data.paymentDate ? new Date(data.paymentDate) : new Date(),
        },
      });

      // Automatically create an expense for DEBIT payments
      if (data.paymentType === 'DEBIT' && data.managerId) {
        await (tx as any).expense.create({
          data: {
            managerId: data.managerId,
            amount: data.amount,
            description: `Supplier Payment to ${supplier.name}` + (data.reference ? ` (Ref: ${data.reference})` : ''),
            expenseDate: data.paymentDate ? new Date(data.paymentDate) : new Date(),
          }
        });
      }

      return payment;
    });
  },

  async getSupplierWithBalance(id: string) {
    const supplier = await prisma.supplier.findUnique({
      where: { id },
      include: {
        payments: {
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: { products: true, purchases: true }
        }
      }
    });
    if (!supplier) throw new AppError('Supplier not found', 404);
    
    const totalPaid = supplier.payments
      .filter(p => p.paymentType === 'DEBIT')
      .reduce((sum, p) => sum + p.amount, 0);

    return {
      ...supplier,
      productCount: supplier._count.products,
      purchaseCount: supplier._count.purchases,
      totalPaid,
      payments: supplier.payments.slice(0, 50) // only return top 50 to client if needed
    };
  },
};
