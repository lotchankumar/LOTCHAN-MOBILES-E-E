import { Request, Response } from 'express';
export declare const repairController: {
    createRepair(req: Request, res: Response): Promise<void>;
    getRepairs(req: Request, res: Response): Promise<void>;
    updateStatus(req: Request, res: Response): Promise<void>;
    addParts(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=repair.controller.d.ts.map