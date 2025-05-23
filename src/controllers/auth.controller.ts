// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/response.utils';
import { AuthService } from '../service/auth.service';

const authService = new AuthService();

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.register(req.body);

        // Create data object separately
        const responseData = {
            user: result.user
        };

        ApiResponse.created(res, responseData, result.message);

    } catch (error: any) {
        if (error.message === 'User with this email already exists') {
            ApiResponse.error(res, error.message, 409);
            return;
        }
        next(error);
    }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.verifyEmail(req.body);

        // Create data object separately
        const responseData = {
            user: result.user,
            tokens: {
                accessToken: result.token,
                refreshToken: result.refreshToken
            }
        };

        ApiResponse.success(res, responseData, result.message);

    } catch (error: any) {
        if (error.message === 'User not found') {
            ApiResponse.notFound(res, error.message);
            return;
        }

        if (error.message === 'Email is already verified') {
            ApiResponse.error(res, error.message, 400);
            return;
        }

        if (error.message === 'Invalid or expired OTP') {
            ApiResponse.error(res, error.message, 400);
            return;
        }

        next(error);
    }
};

export const resendVerificationOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const result = await authService.resendVerificationOtp(email);

        // For this endpoint, we don't need to send any data back
        const responseData = null;

        ApiResponse.success(res, responseData, result.message);

    } catch (error: any) {
        if (error.message === 'User not found') {
            ApiResponse.notFound(res, error.message);
            return;
        }

        if (error.message === 'Email is already verified') {
            ApiResponse.error(res, error.message, 400);
            return;
        }

        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.login(req.body);

        // Create data object separately
        const responseData = {
            user: result.user,
            tokens: {
                accessToken: result.token,
                refreshToken: result.refreshToken
            }
        };

        ApiResponse.success(res, responseData, 'Login successful');

    } catch (error: any) {
        if (error.message === 'Invalid credentials') {
            ApiResponse.unauthorized(res, error.message);
            return;
        }

        if (error.message === 'Please verify your email before logging in') {
            ApiResponse.forbidden(res, error.message);
            return;
        }

        next(error);
    }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body;
        const result = await authService.refreshToken(refreshToken);

        // Create data object separately
        const responseData = {
            tokens: {
                accessToken: result.token
            }
        };

        ApiResponse.success(res, responseData, 'Token refreshed successfully');

    } catch (error: any) {
        if (error.message === 'Invalid refresh token' ||
            error.message === 'User not found' ||
            error.message === 'User email not verified') {
            ApiResponse.unauthorized(res, 'Invalid or expired refresh token');
            return;
        }

        next(error);
    }
};