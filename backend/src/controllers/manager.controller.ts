import { Request, Response, NextFunction } from 'express';
import type { AuthRequest } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/auth.middleware';
import { managerService, CreateManagerData, UpdateManagerData } from '../services/manager.service';
import { AppError } from '../middleware/error.middleware';

export const managerController = {
  async getAllManagers(req: Request, res: Response) {
    const managers = await managerService.getAllManagers();
    res.json(managers);
  },

  async createManager(req: Request<{}, {}, CreateManagerData>, res: Response) {
    const manager = await managerService.createManager(req.body);
    res.status(201).json(manager);
  },

  async updateManager(req: Request<{ id: string }, {}, UpdateManagerData>, res: Response) {
    const manager = await managerService.updateManager(req.params.id, req.body);
    res.json(manager);
  },

  async resetPassword(req: Request<{ id: string }>, res: Response) {
    await managerService.resetPassword(req.params.id);
    res.json({ success: true, message: 'Password reset email sent' });
  },

  async getAllBranches(req: Request, res: Response) {
    const branches = await managerService.getAllBranches();
    res.json(branches);
  },

  async getDailyCashflow(req: AuthRequest, res: Response) {
    const { date, branchId: queryBranchId } = req.query;
    if (!date || typeof date !== 'string') {
      throw new AppError('Date parameter (YYYY-MM-DD) is required', 400);
    }
    
    let targetBranchId = req.user!.branchId;
    if (req.user!.role === 'ADMIN' && queryBranchId && typeof queryBranchId === 'string') {
      targetBranchId = queryBranchId;
    }

    if (!targetBranchId) {
      throw new AppError('Admin must select a branch, or Manager branch not found', 403);
    }
    
    const cashflow = await managerService.getDailyCashflow(targetBranchId, date);
    res.json(cashflow);
  },

  async getProfit(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate, branchId: queryBranchId } = req.query;
      
      if (!startDate || typeof startDate !== 'string' || !endDate || typeof endDate !== 'string') {
        throw new AppError('startDate and endDate parameters (YYYY-MM-DD) are required', 400);
      }
      
      let targetBranchId = req.user!.branchId;
      
      if (req.user!.role === 'ADMIN') {
        if (queryBranchId && typeof queryBranchId === 'string') {
          targetBranchId = queryBranchId;
        } else {
          targetBranchId = 'all'; // Default to all branches for Admin
        }
      }
      
      if (!targetBranchId && req.user!.role !== 'ADMIN') {
        throw new AppError('Branch ID is required', 400);
      }
      
      const profit = await managerService.getProfit(targetBranchId, startDate, endDate);
      res.json({ success: true, data: profit });
    } catch (err) {
      next(err);
    }
  }

};


