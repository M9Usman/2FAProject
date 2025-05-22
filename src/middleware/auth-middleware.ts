// ---------- src/middleware/auth-middleware.ts ----------
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ROLES, Role, isValidRole } from '../constants/role';

interface JwtPayload {
  id: number;
  role: string;
}

// ✅ Fixed: No return when sending response
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      res.status(401).json({ message: 'Access denied. No token provided.' });
      return; // ✅ Just return, don't return the response
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    
    // ✅ Validate role before assigning
    if (!isValidRole(decoded.role)) {
      res.status(401).json({ message: 'Invalid user role.' });
      return;
    }
    
    req.user = {
      id: decoded.id,
      role: decoded.role as Role // ✅ Type assertion after validation
    };
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
    return; // ✅ Just return, don't return the response
  }
};

// ✅ Fixed: No return when sending response
export const authorize = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Access denied. User not authenticated.' });
      return; // ✅ Just return, don't return the response
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      return; // ✅ Just return, don't return the response
    }

    next();
  };
};

// ✅ Fixed: Specific role middleware
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ message: 'Access denied. User not authenticated.' });
    return;
  }

  if (req.user.role !== ROLES.ADMIN) {
    res.status(403).json({ message: 'Access denied. Admin role required.' });
    return;
  }

  next();
};