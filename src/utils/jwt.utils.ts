import jwt from 'jsonwebtoken';
import { Role } from '../constants/role';

interface TokenPayload {
    id: string; // Changed from number to string
    role: Role;
    temp?:boolean;
}

export const signToken = (payload: TokenPayload): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return jwt.sign(
        payload,
        secret,
        {
            expiresIn: '24h',
            algorithm: 'HS256'
        }
    );
};

export const verifyToken = (token: string): TokenPayload => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    try {
        const decoded = jwt.verify(token, secret) as TokenPayload;
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

export const signRefreshToken = (payload: TokenPayload): string => {
    const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return jwt.sign(
        payload,
        secret,
        {
            expiresIn: '7d',
            algorithm: 'HS256'
        }
    );
};

export const verifyRefreshToken = (token: string): TokenPayload => {
    const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    try {
        const decoded = jwt.verify(token, secret) as TokenPayload;
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired refresh token');
    }
};

export const decodeToken = (token: string): TokenPayload | null => {
    try {
        return jwt.decode(token) as TokenPayload;
    } catch (error) {
        return null;
    }
};

export const isTokenValid = (token: string): boolean => {
    try {
        verifyToken(token);
        return true;
    } catch (error) {
        return false;
    }
};

export const getTokenExpiration = (token: string): Date | null => {
    try {
        const decoded = jwt.decode(token) as any;
        if (decoded?.exp) {
            return new Date(decoded.exp * 1000);
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const isTokenExpired = (token: string): boolean => {
    const expiration = getTokenExpiration(token);
    return !expiration || expiration.getTime() < Date.now();
};