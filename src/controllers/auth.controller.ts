import { RequestHandler } from 'express';
import { AuthService } from '../service/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { VerifyOtpDto, ResendOtpDto } from '../dto/verifyOtp.dto';

const authService = new AuthService();

export const register: RequestHandler = async (req, res, next) => {
    try {
        const data: RegisterDto = req.body;
        const result = await authService.register(data);
        res.status(201).json(result);
    } catch (err) {
        if (err instanceof Error && err.message === 'User with this email already exists') {
            res.status(409).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const verifyEmail: RequestHandler = async (req, res, next) => {
    try {
        const data: VerifyOtpDto = req.body;
        const result = await authService.verifyEmail(data);
        res.json(result);
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === 'User not found') {
                res.status(404).json({ message: err.message });
                return;
            }
            if (err.message === 'Email is already verified') {
                res.status(400).json({ message: err.message });
                return;
            }
            if (err.message === 'Invalid or expired OTP') {
                res.status(400).json({ message: err.message });
                return;
            }
        }
        next(err);
    }
};

export const resendVerificationOtp: RequestHandler = async (req, res, next) => {
    try {
        const { email }: ResendOtpDto = req.body;
        const result = await authService.resendVerificationOtp(email);
        res.json(result);
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === 'User not found') {
                res.status(404).json({ message: err.message });
                return;
            }
            if (err.message === 'Email is already verified') {
                res.status(400).json({ message: err.message });
                return;
            }
            if (err.message === 'Please wait before requesting a new OTP') {
                res.status(429).json({ message: err.message });
                return;
            }
        }
        next(err);
    }
};

export const login: RequestHandler = async (req, res, next) => {
    try {
        const data: LoginDto = req.body;
        const result = await authService.login(data);
        res.json(result);
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === 'Invalid credentials') {
                res.status(401).json({ message: err.message });
                return;
            }
            if (err.message === 'Please verify your email before logging in') {
                res.status(403).json({ message: err.message });
                return;
            }
        }
        next(err);
    }
};

export const refreshToken: RequestHandler = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const result = await authService.refreshToken(refreshToken);
        res.json(result);
    } catch (err) {
        if (err instanceof Error && err.message === 'Invalid refresh token') {
            res.status(401).json({ message: err.message });
            return;
        }
        next(err);
    }
};