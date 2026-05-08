import prisma from '../prisma/client';
import type { Branch, User, Order } from '@prisma/client';

export type CreateBranchData = {
  name: string;
  address?: string;
  phone?: string;
  isActive?: boolean;
};

export type UpdateBranchData = {
  name?: string;
  address?: string;
  phone?: string;
  isActive?: boolean;
};

export const branchService = {
  async getAllBranches() {
    return prisma.branch.findMany({
      include: {
        _count: { 
          select: { 
            users: true
          } 
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  async getBranchById(id: string) {
    return prisma.branch.findUnique({
      where: { id },
      include: { 
        users: true, 
        orders: { select: { id: true, orderNumber: true, status: true, createdAt: true } }
      }
    });
  },

  async createBranch(data: CreateBranchData) {
    return prisma.branch.create({ data });
  },

  async updateBranch(id: string, data: UpdateBranchData) {
    return prisma.branch.update({
      where: { id },
      data
    });
  },

  async deleteBranch(id: string) {
    // Check dependencies
    const branch = await prisma.branch.findUnique({
      where: { id },
      include: { 
        _count: { select: { users: true, orders: true } } 
      }
    });

    if (!branch) {
      throw new Error('Branch not found');
    }

    return prisma.branch.delete({ where: { id } });
  }
};

