import { Request, Response } from 'express';
export declare const orderController: {
    createOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getOrders(req: Request, res: Response): Promise<void>;
    getOrderById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateOrderStatus(req: Request, res: Response): Promise<void>;
};
//# sourceMappingURL=order.controller.d.ts.map