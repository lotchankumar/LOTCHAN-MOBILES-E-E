import { Request, Response } from 'express';
import { CreateStaffData, UpdateStaffData } from '../services/manager.service';
export declare const staffController: {
    getAllStaff(req: Request, res: Response): Promise<void>;
    createStaff(req: Request<{}, {}, CreateStaffData>, res: Response): Promise<void>;
    updateStaff(req: Request<{
        id: string;
    }, {}, UpdateStaffData>, res: Response): Promise<void>;
    resetStaffPassword(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    getOrganizationHierarchy(req: Request, res: Response): Promise<void>;
};
//# sourceMappingURL=staff.controller.d.ts.map