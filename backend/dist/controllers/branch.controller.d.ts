import { Request, Response, NextFunction } from 'express';
import { type CreateBranchData } from '../services/branch.service';
export declare const branchController: {
    getAllBranches(req: Request, res: Response, next: NextFunction): Promise<void>;
    getBranchById(req: Request, res: Response, next: NextFunction): Promise<void>;
    createBranch(req: Request<{}, {}, CreateBranchData>, res: Response, next: NextFunction): Promise<void>;
    updateBranch(req: Request, res: Response, next: NextFunction): Promise<void>;
    requestDeleteOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteBranch(req: Request, res: Response, next: NextFunction): Promise<void>;
};
//# sourceMappingURL=branch.controller.d.ts.map