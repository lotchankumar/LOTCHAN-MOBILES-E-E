import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
/**
 * Generic validation middleware factory
 * @param schema - Zod schema to validate against
 * @param source - Where to get data from (body, query, params)
 */
export declare const validate: (schema: z.ZodSchema<any>, source?: "body" | "query" | "params") => (req: Request, res: Response, next: NextFunction) => void;
/**
 * Request validation middleware that validates multiple sources
 */
export declare const validateRequest: (schemas: {
    body?: z.ZodSchema<any>;
    query?: z.ZodSchema<any>;
    params?: z.ZodSchema<any>;
}) => (req: Request, res: Response, next: NextFunction) => void;
/**
 * Middleware to validate that required fields are present
 */
export declare const validateRequiredFields: (fields: string[], source?: "body" | "query" | "params") => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validation.middleware.d.ts.map