import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { AppError } from './error.middleware';

/**
 * Generic validation middleware factory
 * @param schema - Zod schema to validate against
 * @param source - Where to get data from (body, query, params)
 */
export const validate = (schema: z.ZodSchema<any>, source: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[source];
      const validatedData = schema.parse(data);
      
      // Replace the request data with validated data
      req[source] = validatedData;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors
        const zodError = error as any;
        const errorMessages = zodError.errors?.map((err: any) => err.message) || ['Validation failed'];
        
        next(new AppError(`Validation failed: ${errorMessages.join(', ')}`, 400));
      } else {
        next(new AppError('Validation failed', 400));
      }
    }
  };
};

/**
 * Request validation middleware that validates multiple sources
 */
export const validateRequest = (schemas: {
  body?: z.ZodSchema<any>;
  query?: z.ZodSchema<any>;
  params?: z.ZodSchema<any>;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      
      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }
      
      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors
        const zodError = error as any;
        const errorMessages = zodError.errors?.map((err: any) => {
          const path = err.path?.join('.') || 'unknown';
          return `${path}: ${err.message}`;
        }) || ['Validation failed'];
        
        const errorMessage = `Validation failed: ${errorMessages.join(', ')}`;
        next(new AppError(errorMessage, 400));
      } else {
        next(new AppError('Validation failed', 400));
      }
    }
  };
};

/**
 * Middleware to validate that required fields are present
 */
export const validateRequiredFields = (fields: string[], source: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[source];
    const missingFields: string[] = [];
    
    for (const field of fields) {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        missingFields.push(field);
      }
    }
    
    if (missingFields.length > 0) {
      return next(new AppError(`Missing required fields: ${missingFields.join(', ')}`, 400));
    }
    
    next();
  };
};
