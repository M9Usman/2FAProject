// ---------- src/middleware/validate.middleware.ts ----------

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import createHttpError from 'http-errors';

// Base validation middleware that works with any Zod schema
export const validateRequest = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate the request body
      req.body = await schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        
        next(createHttpError(422, { 
          message: 'Validation failed', 
          errors 
        }));
      } else {
        next(createHttpError(422, 'Validation error'));
      }
    }
  };
};

// Middleware for validating URL parameters (like IDs)
export const validateParams = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.params = await schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        
        next(createHttpError(422, { 
          message: 'Invalid parameters', 
          errors 
        }));
      } else {
        next(createHttpError(422, 'Parameter validation error'));
      }
    }
  };
};

// Middleware for validating query parameters
export const validateQuery = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.query = await schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        
        next(createHttpError(422, { 
          message: 'Invalid query parameters', 
          errors 
        }));
      } else {
        next(createHttpError(422, 'Query validation error'));
      }
    }
  };
};

// Utility for Prisma ID validation (if you use cuid/uuid)
export const validatePrismaId = (paramName: string = 'id') => {
  const schema = z.object({
    [paramName]: z.string().min(1, `${paramName} is required`)
  });
  
  return validateParams(schema);
};