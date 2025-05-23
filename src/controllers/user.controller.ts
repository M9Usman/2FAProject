// ---------- controllers/user-controller.ts ----------
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/response.utils';
import { ROLES } from '../constants/role';

export const getProfile = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (!req.user) {
      ApiResponse.unauthorized(res, 'User not authenticated');
      return;
    }

    const data = {
      message: `Hello ${req.user.role}, user ID ${req.user.id}`
    };

    ApiResponse.success(res, data, 'User profile fetched successfully');
  } catch (error: any) {
    next(error);
  }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (!req.user) {
      ApiResponse.unauthorized(res, 'User not authenticated');
      return;
    }

    if (req.user.role !== ROLES.ADMIN) {
      ApiResponse.forbidden(res, 'Access denied: Admins only');
      return;
    }

    const data = { message: 'Admin content' };

    ApiResponse.success(res, data, 'Admin access granted');
  } catch (error: any) {
    next(error);
  }
};
