import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getBanners: (req: Request, res: Response) => Promise<void>;
export declare const getCategories: (req: Request, res: Response) => Promise<void>;
export declare const getProducts: (req: Request, res: Response) => Promise<void>;
export declare const getProfile: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getBookings: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createBooking: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getCommunityPosts: (req: Request, res: Response) => Promise<void>;
export declare const createCommunityPost: (req: AuthRequest, res: Response) => Promise<void>;
export declare const postChatMessage: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=customer.controller.d.ts.map