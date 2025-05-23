import nodemailer from 'nodemailer';

export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async sendVerificationEmail(email: string, otp: string, name: string) {
        const mailOptions = {
            from: `"${process.env.APP_NAME}" <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: 'Email Verification - OTP Code',
            html: this.getVerificationEmailTemplate(name, otp),
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent:', info.messageId);
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send verification email');
        }
    }

    private getVerificationEmailTemplate(name: string, otp: string): string {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f4f4f4;
                    }
                    .container {
                        background: white;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .otp-code {
                        background: #007bff;
                        color: white;
                        padding: 15px 30px;
                        font-size: 24px;
                        font-weight: bold;
                        text-align: center;
                        border-radius: 8px;
                        margin: 20px 0;
                        letter-spacing: 3px;
                    }
                    .warning {
                        background: #fff3cd;
                        border: 1px solid #ffeaa7;
                        color: #856404;
                        padding: 15px;
                        border-radius: 5px;
                        margin: 20px 0;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 30px;
                        color: #666;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Welcome to ${process.env.APP_NAME}!</h1>
                        <p>Hi ${name},</p>
                    </div>
                    
                    <p>Thank you for registering with us. To complete your registration, please verify your email address using the OTP code below:</p>
                    
                    <div class="otp-code">
                        ${otp}
                    </div>
                    
                    <div class="warning">
                        <strong>Important:</strong> This OTP will expire in 5 minutes. Please use it as soon as possible.
                    </div>
                    
                    <p>If you didn't create an account with us, please ignore this email.</p>
                    
                    <div class="footer">
                        <p>Best regards,<br>The ${process.env.APP_NAME} Team</p>
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    async sendPasswordResetEmail(email: string, otp: string, name: string) {
        const mailOptions = {
            from: `"${process.env.APP_NAME}" <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: 'Password Reset - OTP Code',
            html: this.getPasswordResetEmailTemplate(name, otp),
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Password reset email sent:', info.messageId);
            return info;
        } catch (error) {
            console.error('Error sending password reset email:', error);
            throw new Error('Failed to send password reset email');
        }
    }

    private getPasswordResetEmailTemplate(name: string, otp: string): string {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f4f4f4;
                    }
                    .container {
                        background: white;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .otp-code {
                        background: #dc3545;
                        color: white;
                        padding: 15px 30px;
                        font-size: 24px;
                        font-weight: bold;
                        text-align: center;
                        border-radius: 8px;
                        margin: 20px 0;
                        letter-spacing: 3px;
                    }
                    .warning {
                        background: #f8d7da;
                        border: 1px solid #f5c6cb;
                        color: #721c24;
                        padding: 15px;
                        border-radius: 5px;
                        margin: 20px 0;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 30px;
                        color: #666;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Password Reset Request</h1>
                        <p>Hi ${name},</p>
                    </div>
                    
                    <p>We received a request to reset your password. Please use the OTP code below to proceed:</p>
                    
                    <div class="otp-code">
                        ${otp}
                    </div>
                    
                    <div class="warning">
                        <strong>Security Notice:</strong> This OTP will expire in 5 minutes. If you didn't request a password reset, please ignore this email.
                    </div>
                    
                    <div class="footer">
                        <p>Best regards,<br>The ${process.env.APP_NAME} Team</p>
                    </div>
                </div>
            </body>
            </html>
        `;
    }
}