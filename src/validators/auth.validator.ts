import { z } from 'zod';

// Reusable schema components
const emailSchema = z.string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .toLowerCase(); // Normalize to lowercase

const passwordSchema = z.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

const nameSchema = z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .trim(); // Remove whitespace

const phoneSchema = z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
    .optional();

const roleSchema = z.enum(["USER", "ADMIN"], {
    errorMap: () => ({ message: "Role must be either USER or ADMIN" })
}).default("USER");

// Register validator
export const registerValidator = z.object({
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema,
    phone: phoneSchema,
    role: roleSchema
});

// Login validator (less strict password validation since we're checking existing)
export const loginValidator = z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required")
});

// OTP validators
export const verifyOtpValidator = z.object({
    email: emailSchema,
    otp: z.string()
        .length(6, "OTP must be exactly 6 characters")
        .regex(/^\d+$/, "OTP must contain only numbers")
});

export const resendOtpValidator = z.object({
    email: emailSchema
});

// Refresh token validator
export const refreshTokenValidator = z.object({
    refreshToken: z.string()
        .min(1, "Refresh token is required")
        .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, "Invalid refresh token format")
});

// Export types for use in controllers (TypeScript inference)
export type RegisterInput = z.infer<typeof registerValidator>;
export type LoginInput = z.infer<typeof loginValidator>;
export type VerifyOtpInput = z.infer<typeof verifyOtpValidator>;
export type ResendOtpInput = z.infer<typeof resendOtpValidator>;
export type RefreshTokenInput = z.infer<typeof refreshTokenValidator>;