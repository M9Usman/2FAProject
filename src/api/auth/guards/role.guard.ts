// ---------- auth/guards/role.guard.ts ----------
import { Request, Response, NextFunction } from 'express';

export const roleGuard = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: 'Insufficient permissions' });
            return;  // exit early without returning the Response object
        }
        next();
    };
};
