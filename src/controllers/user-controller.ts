// ---------- controllers/user-controller.ts ----------
import { Request, Response } from 'express';

export const getProfile = (req: Request, res: Response) => {
  res.json({ 
    message: `Hello ${req.user?.role}, user ID ${req.user?.id}` 
  });
};

export const adminOnly = (req: Request, res: Response) => {
  res.json({ message: 'Admin content' });
};