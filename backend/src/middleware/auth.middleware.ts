import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error.middleware';
import prisma from '../prisma/client';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    branchId?: string;
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  // Allow explicitly public paths to bypass if needed, but best practice is to not mount middleware on them
  // We check if headers are not present
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError('No token provided', 401));
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    // Using as any to allow parsing role
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      role: string;
    };
    
    // For non-customer users, fetch branchId from database
    let branchId: string | undefined;
    if (decoded.role !== 'CUSTOMER') {
      try {
        const user = await prisma.user.findUnique({
          where: { id: decoded.id },
          select: { branchId: true }
        });
        branchId = user?.branchId || undefined;
      } catch (dbError) {
        console.error('Failed to fetch user branch info:', dbError);
      }
    }
    
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      branchId
    };
    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      console.log(`[AUTH] Checking role. Required: ${allowedRoles}, User: ${req.user?.role}`);
      if (!req.user) {
        throw new AppError('Not authenticated', 401);
      }

      if (!allowedRoles.includes(req.user.role)) {
        console.log(`[AUTH] Forbidden! User role ${req.user.role} not in ${allowedRoles}`);
        throw new AppError('Insufficient permissions', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
