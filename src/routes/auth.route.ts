// src/routes/auth.route.ts 
import { Router } from 'express';
import { register, login, verifyEmail, resendVerificationOtp, refreshToken } from '../controllers/auth.controller';
import { registerValidator } from '../validators/register.validator';
import { loginValidator } from '../validators/login.validator';
import { verifyOtpValidator, resendOtpValidator } from '../validators/otp.validator';
import { validate } from '../middleware/validate.middleware';

const router = Router();

// Registration flow
/**
 * @description Register a new user account
 * @Route [POST] - /api/v1/auth/register
 * @Access Public
 * @body {string} email - User's email address
 * @body {string} password - User's password
 * @body {string} firstName - User's first name
 * @body {string} lastName - User's last name
 * @returns {Object} - User registration response with verification status
 */
router.post('/register', registerValidator, validate, register);

/**
 * @description Verify user email with OTP code
 * @Route [POST] - /api/v1/auth/verify-email
 * @Access Public
 * @body {string} email - User's email address
 * @body {string} otp - 6-digit verification code
 * @returns {Object} - Email verification confirmation
 */
router.post('/verify-email', verifyOtpValidator, validate, verifyEmail);

/**
 * @description Resend email verification OTP
 * @Route [POST] - /api/v1/auth/resend-verification
 * @Access Public
 * @body {string} email - User's email address
 * @returns {Object} - OTP resend confirmation
 */
router.post('/resend-verification', resendOtpValidator, validate, resendVerificationOtp);

// Authentication
/**
 * @description Authenticate user and generate access tokens
 * @Route [POST] - /api/v1/auth/login
 * @Access Public
 * @body {string} email - User's email address
 * @body {string} password - User's password
 * @returns {Object} - Authentication tokens and user data
 */
router.post('/login', loginValidator, validate, login);

/**
 * @description Refresh expired access token using refresh token
 * @Route [POST] - /api/v1/auth/refresh-token
 * @Access Public
 * @body {string} refreshToken - Valid refresh token
 * @returns {Object} - New access token and refresh token
 */
router.post('/refresh-token', refreshToken);

export default router;