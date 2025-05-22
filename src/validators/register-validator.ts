// ---------- validators/register-validator.ts ----------
import { body } from 'express-validator';

export const registerValidator = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid')
        .normalizeEmail(), // Normalizes email format

    body('name')
        .isString()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .trim(), // Remove whitespace

    body('password')
        .isString()
        .isLength({ min: 6, max: 128 })
        .withMessage('Password must be between 6 and 128 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),

    body('phone')
        .isMobilePhone('any')
        .withMessage('Phone number must be valid')
        .optional(), // Make phone optional if needed

    body('role')
        .optional()
        .isIn(['USER', 'ADMIN'])
        .withMessage('Role must be either USER or ADMIN')
        .default('USER'), // Set default role
];