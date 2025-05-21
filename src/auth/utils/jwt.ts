// ---------- auth/utils/jwt.ts ----------
import jwt from 'jsonwebtoken';

const SECRET = 'your_jwt_secret'; // Should be in .env

export const signToken = (payload: any) => jwt.sign(payload, SECRET, { expiresIn: '1h' });

export const verifyToken = (token: string) => jwt.verify(token, SECRET);
