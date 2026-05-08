import { Request, Response } from 'express';
import { requireRole } from '../middleware/auth.middleware';
import { staffService, CreateStaffData, UpdateStaffData, organizationService } from '../services/manager.service';
import { AppError } from '../middleware/error.middleware';
import prisma from '../prisma/client';

export const staffController = {
  async getAllStaff(req: Request, res: Response) {
    const loggedInUser = (req as any).user;
    // MANAGERs only see staff within their own branch; ADMINs see all
    const branchId = loggedInUser.role === 'MANAGER' ? loggedInUser.branchId : undefined;
    const staff = await staffService.getAllStaff(branchId);
    res.json(staff);
  },

  async createStaff(req: Request<{}, {}, CreateStaffData>, res: Response) {
    const loggedInUser = (req as any).user;
    const data = { ...req.body };

    // If the logged-in user is a MANAGER, auto-assign managerId and branchId
    if (loggedInUser.role === 'MANAGER') {
      data.managerId = loggedInUser.id;

      // Fetch the manager's branch and assign it to the staff
      const manager = await prisma.user.findUnique({
        where: { id: loggedInUser.id },
        select: { branchId: true }
      });
      if (manager?.branchId) {
        data.branchId = manager.branchId;
      }
    }

    console.log('Staff creation request body:', JSON.stringify(data, null, 2));
    const staff = await staffService.createStaff(data);
    res.status(201).json(staff);
  },

  async updateStaff(req: Request<{ id: string }, {}, UpdateStaffData>, res: Response) {
    const staff = await staffService.updateStaff(req.params.id, req.body);
    res.json(staff);
  },

  async resetStaffPassword(req: Request<{ id: string }>, res: Response) {
    await staffService.resetStaffPassword(req.params.id);
    res.json({ success: true, message: 'Password reset email sent' });
  },

  async getOrganizationHierarchy(req: Request, res: Response) {
    const hierarchy = await organizationService.getOrganizationHierarchy();
    res.json(hierarchy);
  }
};