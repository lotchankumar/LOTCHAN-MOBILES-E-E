import { Request, Response } from 'express';
import { type CreateBranchData } from '../services/branch.service';
export declare const branchController: {
    getAllBranches(req: Request, res: Response): Promise<void>;
    getBranchById(req: Request, res: Response): Promise<void>;
    createBranch(req: Request<{}, {}, CreateBranchData>, res: Response): Promise<void>;
    updateBranch(req: Request, res: Response): Promise<void>;
    deleteBranch(req: Request, res: Response): Promise<void>;
};
//# sourceMappingURL=branch.controller.d.ts.map