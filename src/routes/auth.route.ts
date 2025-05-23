import { Router } from 'express';
import { register, login, verifyEmail, resendVerificationOtp, refreshToken } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validate.middleware';
import {
    registerValidator,
    loginValidator,
    verifyOtpValidator,
    resendOtpValidator,
    refreshTokenValidator
} from '../validators/auth.validator';

const router = Router();

// Registration flow
/**
 * @description Register a new user account
 * @Route [POST] - /api/v1/auth/register
 * @Access Public
 * @body {string} email - User's email address
 * @body {string} password - User's password
 * @body {string} name - User's full name
 * @body {string} [phone] - User's phone number (optional)
 * @body {string} [role] - User's role (defaults to USER)
 * @returns {Object} - User registration response with verification status
 */
router.post('/register', validateRequest(registerValidator), register);

/**
 * @description Verify user email with OTP code
 * @Route [POST] - /api/v1/auth/verify-email
 * @Access Public
 * @body {string} email - User's email address
 * @body {string} otp - 6-digit verification code
 * @returns {Object} - Email verification confirmation
 */
router.post('/verify-email', validateRequest(verifyOtpValidator), verifyEmail);

/**
 * @description Resend email verification OTP
 * @Route [POST] - /api/v1/auth/resend-verification
 * @Access Public
 * @body {string} email - User's email address
 * @returns {Object} - OTP resend confirmation
 */
router.post('/resend-verification', validateRequest(resendOtpValidator), resendVerificationOtp);

// Authentication
/**
 * @description Authenticate user and generate access tokens
 * @Route [POST] - /api/v1/auth/login
 * @Access Public
 * @body {string} email - User's email address
 * @body {string} password - User's password
 * @returns {Object} - Authentication tokens and user data
 */
router.post('/login', validateRequest(loginValidator), login);

/**
 * @description Refresh expired access token using refresh token
 * @Route [POST] - /api/v1/auth/refresh-token
 * @Access Public
 * @body {string} refreshToken - Valid refresh token
 * @returns {Object} - New access token and refresh token
 */
router.post('/refresh-token', validateRequest(refreshTokenValidator), refreshToken);

export default router;