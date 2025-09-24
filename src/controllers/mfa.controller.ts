// src/controllers/mfa.controller.ts

import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/response.utils';
import { MfaService } from '../service/mfa.service';
import { AuthService } from '../service/auth.service';

const mfaService = new MfaService();
const authService = new AuthService();

export const setupMfa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id.toString();
        if (!userId) {
            ApiResponse.unauthorized(res, 'Authentication required');
            return;
        }

        const result = await mfaService.generateMfaSecret(userId);
        ApiResponse.success(res, result, 'MFA setup initiated');
    } catch (error) {
        next(error);
    }
};

export const enableMfa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id.toString();
        const { secret, token } = req.body;

        if (!userId) {
            ApiResponse.unauthorized(res, 'Authentication required');
            return;
        }

        const result = await mfaService.enableMfa(userId, secret, token);
        ApiResponse.success(res, result, result.message);
    } catch (error: any) {
        if (error.message === 'Invalid MFA token') {
            ApiResponse.error(res, error.message, 400);
            return;
        }
        next(error);
    }
};

export const verifyMfaLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { tempToken, mfaToken } = req.body;
        const result = await authService.verifyMfaLogin(tempToken, mfaToken);

        const responseData = {
            user: result.user,
            tokens: {
                accessToken: result.token,
                refreshToken: result.refreshToken
            }
        };

        ApiResponse.success(res, responseData, result.message);
    } catch (error: any) {
        if (error.message === 'Invalid MFA token' ||
            error.message === 'Invalid or expired temporary token') {
            ApiResponse.error(res, error.message, 400);
            return;
        }
        next(error);
    }
};

export const disableMfa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id.toString();
        const { token } = req.body;

        if (!userId) {
            ApiResponse.unauthorized(res, 'Authentication required');
            return;
        }

        const result = await mfaService.disableMfa(userId, token);
        ApiResponse.success(res, null, result.message);
    } catch (error: any) {
        if (error.message === 'Invalid MFA token') {
            ApiResponse.error(res, error.message, 400);
            return;
        }
        next(error);
    }
};

export const getMfaStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id.toString();
        if (!userId) {
            ApiResponse.unauthorized(res, 'Authentication required');
            return;
        }

        const result = await mfaService.getUserMfaStatus(userId);
        ApiResponse.success(res, result, 'MFA status retrieved');
    } catch (error) {
        next(error);
    }
};