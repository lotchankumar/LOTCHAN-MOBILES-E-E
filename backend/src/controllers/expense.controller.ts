import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { AppError } from '../middleware/error.middleware';
import { auditLogService } from '../services/auditLog.service';

export const expenseController = {
  async createExpense(req: Request, res: Response) {
    try {
      const { managerId, description, amount } = req.body;

      if (!managerId || !description || !amount || amount <= 0) {
        throw new AppError('Missing required fields', 400);
      }

      const expense = await prisma.expense.create({
        data: { managerId, description, amount },
      });

      const user = (req as any).user;
      auditLogService.logAction({
        userId: user?.id || managerId,
        action: 'EXPENSE_CREATED',
        entity: 'Expense',
        entityId: expense.id,
        details: JSON.stringify({ description, amount }),
        branchId: user?.branchId,
        ipAddress: req.ip,
      });

      res.status(201).json({ success: true, data: expense });
    } catch (error: any) {
      console.error('Expense creation failed:', error);
      res.status(500).json({ error: error.message || 'Failed to create expense' });
    }
  },

  async getExpenses(req: Request, res: Response) {
    try {
      const expenses = await prisma.expense.findMany({
        orderBy: { createdAt: 'desc' },
      });
      res.json({ success: true, data: expenses });
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
      res.status(500).json({ error: 'Failed to fetch expenses' });
    }
  },
};
