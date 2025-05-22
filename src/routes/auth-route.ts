import { Router } from 'express';
import { register, login, verifyEmail, resendVerificationOtp, refreshToken } from '../controllers/auth-controller';
import { registerValidator } from '../validators/register-validator';
import { loginValidator } from '../validators/login-validator';
import { verifyOtpValidator, resendOtpValidator } from '../validators/otp-validator';
import { validate } from '../middleware/validate-middleware';

const router = Router();

// Registration flow
router.post('/register', registerValidator, validate, register);
router.post('/verify-email', verifyOtpValidator, validate, verifyEmail);
router.post('/resend-verification', resendOtpValidator, validate, resendVerificationOtp);

// Authentication
router.post('/login', loginValidator, validate, login);
router.post('/refresh-token', refreshToken);

export default router;