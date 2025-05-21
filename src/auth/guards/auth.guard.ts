// ---------- auth/guards/auth.guard.ts ----------
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authGuard = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Missing token' });
        return; // exit early without returning the response object
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token) as any;
        req.user = decoded;
        next();
    } catch {
        res.status(403).json({ message: 'Invalid token' });
        return;
    }
};
