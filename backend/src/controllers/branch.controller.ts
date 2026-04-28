import { Request, Response } from 'express';
import { branchService, type CreateBranchData, type UpdateBranchData } from '../services/branch.service';
import { AppError } from '../middleware/error.middleware';

export const branchController = {
  async getAllBranches(req: Request, res: Response) {
    try {
      const branches = await branchService.getAllBranches();
      res.json(branches);
    } catch (error) {
      throw new AppError('Failed to fetch branches', 500);
    }
  },

  async getBranchById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const branch = await branchService.getBranchById(id as string);
      if (!branch) {
        throw new AppError('Branch not found', 404);
      }
      res.json(branch);
    } catch (error) {
      throw new AppError('Failed to fetch branch', 500);
    }
  },

async createBranch(req: Request<{}, {}, CreateBranchData>, res: Response) {
    try {
      const data = req.body;
      const branch = await branchService.createBranch(data);
      res.status(201).json(branch);
    } catch (error: any) {
      console.error('Create branch error:', error);
      
      // Handle Prisma errors specifically
      if (error.code === 'P2002') {
        throw new AppError(`Branch validation failed: ${error.meta?.target?.join(', ') || error.message}`, 400);
      } else if (error.code === 'P2003') {
        throw new AppError('Foreign key constraint failed', 400);
      } else if (error.code?.startsWith('P20')) {
        throw new AppError(`Database error: ${error.message}`, 400);
      }
      
      throw new AppError(`Failed to create branch: ${error.message || error}`, 500);
    }
  },

  async updateBranch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body as UpdateBranchData;
      const branch = await branchService.updateBranch(id as string, data);
      res.json(branch);
    } catch (error: any) {
      if (error.message === 'Branch not found') {
        throw new AppError('Branch not found', 404);
      }
      throw new AppError('Failed to update branch', 500);
    }
  },

  async deleteBranch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await branchService.deleteBranch(id as string);
      res.status(204).send();
    } catch (error: any) {
      if (error.message.includes('not found')) {
        throw new AppError('Branch not found', 404);
      }
      throw new AppError(error.message, 400);
    }
  }
};

