// ---------- auth/validators/login.validator.ts ----------
import { body } from 'express-validator';

export const loginValidator = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .isString()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
];
