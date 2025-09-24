// mfa.service.ts
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import crypto from 'crypto';
import prisma from '../config/database';

export class MfaService {
    private readonly APP_NAME = 'YourAppName';

    async generateMfaSecret(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { email: true, name: true }
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Generate secret
        const secret = speakeasy.generateSecret({
            name: `${this.APP_NAME} (${user.email})`,
            issuer: this.APP_NAME,
            length: 32
        });

        // Generate QR code
        const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);

        return {
            secret: secret.base32,
            qrCode: qrCodeUrl,
            manualEntryKey: secret.base32,
            otpauth_url: secret.otpauth_url
        };
    }

    async enableMfa(userId: string, secret: string, token: string) {
        // Verify the token first
        const verified = speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: token,
            window: 2
        });

        if (!verified) {
            throw new Error('Invalid MFA token');
        }

        // Generate backup codes
        const backupCodes = this.generateBackupCodes();

        // Update user in database
        await prisma.user.update({
            where: { id: userId },
            data: {
                mfaEnabled: true,
                mfaSecret: secret,
                mfaBackupCodes: backupCodes
            }
        });

        return {
            message: 'MFA enabled successfully',
            backupCodes
        };
    }

    async verifyMfaToken(userId: string, token: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { mfaSecret: true, mfaEnabled: true, mfaBackupCodes: true }
        });

        if (!user || !user.mfaEnabled || !user.mfaSecret) {
            throw new Error('MFA not enabled for this user');
        }

        // Check if it's a backup code
        if (user.mfaBackupCodes.includes(token.toUpperCase())) {
            // Remove used backup code
            const updatedBackupCodes = user.mfaBackupCodes.filter(code => code !== token.toUpperCase());
            await prisma.user.update({
                where: { id: userId },
                data: { mfaBackupCodes: updatedBackupCodes }
            });
            return true;
        }

        // Verify TOTP token
        return speakeasy.totp.verify({
            secret: user.mfaSecret,
            encoding: 'base32',
            token: token,
            window: 2
        });
    }

    async disableMfa(userId: string, token: string) {
        // Verify token before disabling
        const isValid = await this.verifyMfaToken(userId, token);
        if (!isValid) {
            throw new Error('Invalid MFA token');
        }

        await prisma.user.update({
            where: { id: userId },
            data: {
                mfaEnabled: false,
                mfaSecret: null,
                mfaBackupCodes: []
            }
        });

        return { message: 'MFA disabled successfully' };
    }

    private generateBackupCodes(count: number = 10): string[] {
        const codes: string[] = [];
        for (let i = 0; i < count; i++) {
            const code = crypto.randomBytes(4).toString('hex').toUpperCase();
            codes.push(code);
        }
        return codes;
    }

    async getUserMfaStatus(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                mfaEnabled: true,
                mfaBackupCodes: true
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        return {
            mfaEnabled: user.mfaEnabled,
            backupCodesCount: user.mfaBackupCodes.length
        };
    }
}