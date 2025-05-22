import { Role } from '../constants/role';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: Role; // ✅ Changed from string to Role type
      };
    }
  }
}

export {};
