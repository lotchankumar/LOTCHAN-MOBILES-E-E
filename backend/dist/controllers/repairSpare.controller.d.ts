import { Request, Response } from 'express';
export declare const repairSpareController: {
    getAllSpareProducts(req: Request, res: Response): Promise<void>;
    getSpareProductById(req: Request, res: Response): Promise<void>;
    createSpareProduct(req: Request, res: Response): Promise<void>;
    updateSpareProduct(req: Request, res: Response): Promise<void>;
    deleteSpareProduct(req: Request, res: Response): Promise<void>;
    getAllSparePurchases(req: Request, res: Response): Promise<void>;
    getSparePurchaseById(req: Request, res: Response): Promise<void>;
    createSparePurchase(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteSparePurchase(req: Request, res: Response): Promise<void>;
};
//# sourceMappingURL=repairSpare.controller.d.ts.map