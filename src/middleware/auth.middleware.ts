// ---------- src/middleware/auth-middleware.ts ----------
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ROLES, Role, isValidRole } from '../constants/role';

interface JwtPayload {
  id: number;
  role: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      res.status(401).json({ message: 'Access denied. No token provided.' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    
    if (!isValidRole(decoded.role)) {
      res.status(401).json({ message: 'Invalid user role.' });
      return;
    }
    
    req.user = {
      id: decoded.id,
      role: decoded.role as Role 
    };
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
    return; 
  }
};

export const authorize = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Access denied. User not authenticated.' });
      return; 
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      return; 
    }

    next();
  };
};

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