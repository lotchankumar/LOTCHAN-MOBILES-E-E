import { Request, Response, NextFunction } from 'express';
import type { AuthRequest } from '../middleware/auth.middleware';
import { CreateManagerData, UpdateManagerData } from '../services/manager.service';
export declare const managerController: {
    getAllManagers(req: Request, res: Response): Promise<void>;
    createManager(req: Request<{}, {}, CreateManagerData>, res: Response): Promise<void>;
    updateManager(req: Request<{
        id: string;
    }, {}, UpdateManagerData>, res: Response): Promise<void>;
    resetPassword(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    getAllBranches(req: Request, res: Response): Promise<void>;
    getDailyCashflow(req: AuthRequest, res: Response): Promise<void>;
    getProfit(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    getDashboardStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
};
//# sourceMappingURL=manager.controller.d.ts.map