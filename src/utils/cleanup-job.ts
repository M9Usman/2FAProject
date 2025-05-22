import cron from 'node-cron';
import { OtpService } from '../service/otp-service';

const otpService = new OtpService();

// Run cleanup every hour
export const startCleanupJob = () => {
    cron.schedule('0 * * * *', async () => {
        try {
            await otpService.cleanupExpiredOtps();
            console.log('Expired OTPs cleaned up successfully');
        } catch (error) {
            console.error('Error cleaning up expired OTPs:', error);
        }
    });
    
    console.log('OTP cleanup cron job started');
};