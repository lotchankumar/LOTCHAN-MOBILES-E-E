import { Request, Response, NextFunction } from 'express';
export declare const seedAdmin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const customerRegister: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const customerLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const staffLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const requestAdminPasswordReset: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const verifyAdminOTP: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const resetAdminPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map