import express, { Request, Response, NextFunction } from 'express';
import { branchService, type CreateBranchData, type UpdateBranchData } from '../services/branch.service';
import { AppError } from '../middleware/error.middleware';
import { generateOTP, sendOTPEmail } from '../utils/email';
import { cacheService } from '../services/cache.service';
import prisma from '../prisma/client';
import { auditLogService } from '../services/auditLog.service';

export const branchController = {
  async getAllBranches(req: Request, res: Response, next: NextFunction) {
    try {
      const branches = await branchService.getAllBranches();
      res.json(branches);
    } catch (error) {
      next(new AppError('Failed to fetch branches', 500));
    }
  },

  async getBranchById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const branch = await branchService.getBranchById(id as string);
      if (!branch) {
        return next(new AppError('Branch not found', 404));
      }
      res.json(branch);
    } catch (error) {
      next(new AppError('Failed to fetch branch', 500));
    }
  },

async createBranch(req: Request<{}, {}, CreateBranchData>, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const branch = await branchService.createBranch(data);
      const user = (req as any).user;

      // Log branch creation
      auditLogService.logAction({
        userId: user?.id,
        action: 'BRANCH_CREATED',
        entity: 'Branch',
        entityId: branch.id,
        details: JSON.stringify({ name: branch.name, address: branch.address }),
        ipAddress: req.ip,
      });

      res.status(201).json(branch);
    } catch (error: any) {
      console.error('Create branch error:', error);
      
      // Handle Prisma errors specifically
      if (error.code === 'P2002') {
        return next(new AppError(`Branch validation failed: ${error.meta?.target?.join(', ') || error.message}`, 400));
      } else if (error.code === 'P2003') {
        return next(new AppError('Foreign key constraint failed', 400));
      } else if (error.code?.startsWith('P20')) {
        return next(new AppError(`Database error: ${error.message}`, 400));
      }
      
      next(new AppError(`Failed to create branch: ${error.message || error}`, 500));
    }
  },

  async updateBranch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body as UpdateBranchData;
      const branch = await branchService.updateBranch(id as string, data);
      const user = (req as any).user;

      // Log branch update
      auditLogService.logAction({
        userId: user?.id,
        action: 'BRANCH_UPDATED',
        entity: 'Branch',
        entityId: id as string,
        details: JSON.stringify(data),
        ipAddress: req.ip,
      });

      res.json(branch);
    } catch (error: any) {
      if (error.message === 'Branch not found') {
        return next(new AppError('Branch not found', 404));
      }
      next(new AppError('Failed to update branch', 500));
    }
  },

  async requestDeleteOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = (req as any).user;
      
      const branch = await branchService.getBranchById(id as string);
      if (!branch) {
        return next(new AppError('Branch not found', 404));
      }

      let adminEmail = user.email;
      if (user.role !== 'ADMIN') {
        const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
        if (!admin) return next(new AppError('Admin not found', 500));
        adminEmail = admin.email;
      }

      const otp = generateOTP(6);
      cacheService.set(`delete_branch_otp_${id}`, otp, 600); // 10 minutes

      try {
        await sendOTPEmail(adminEmail, otp);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        if (process.env.NODE_ENV === 'production') {
          return next(new AppError('Failed to send OTP email. Please try again.', 500));
        }
      }

      res.json({ message: 'OTP sent to admin email successfully', expiresIn: '10 minutes' });
    } catch (error: any) {
      next(new AppError(error.message, error.statusCode || 500));
    }
  },

  async deleteBranch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { otp } = req.body;

      if (!otp) {
        return next(new AppError('OTP is required to delete a branch', 400));
      }

      const cachedOtp = cacheService.get<string>(`delete_branch_otp_${id}`);
      if (!cachedOtp || cachedOtp !== otp) {
        return next(new AppError('Invalid or expired OTP', 400));
      }

      await branchService.deleteBranch(id as string);
      cacheService.invalidate(`delete_branch_otp_${id}`);

      // Log branch deletion
      const user = (req as any).user;
      auditLogService.logAction({
        userId: user?.id,
        action: 'BRANCH_DELETED',
        entity: 'Branch',
        entityId: id as string,
        details: JSON.stringify({ deletedBranchId: id }),
        ipAddress: req.ip,
      });
      
      res.status(204).send();
    } catch (error: any) {
      if (error.message.includes('not found')) {
        return next(new AppError('Branch not found', 404));
      }
      next(new AppError(error.message, error.statusCode || 400));
    }
  }
};

