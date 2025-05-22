// ---------- src/services/auth-service.ts ----------
import bcrypt from 'bcrypt';
import prisma from '../config/database';
import { RegisterDto } from '../dto/register-dto';
import { LoginDto } from '../dto/login-dto';
import { signToken, signRefreshToken } from '../utils/jwt';
import { ROLES, Role } from '../constants/role';

export class AuthService {
    async register(data: RegisterDto) {
        const { email, password, name } = data;
        const role = data.role ?? ROLES.USER;
        
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name, role },
        });
        
        const token = signToken({ id: user.id, role: user.role as Role });
        const refreshToken = signRefreshToken({ id: user.id, role: user.role as Role });
        
        return { 
            user: {
                id: user.id, 
                email: user.email, 
                name: user.name, 
                role: user.role 
            },
            token,
            refreshToken
        };
    }

    async login(data: LoginDto) {
        const { email, password } = data;
        
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error('Invalid credentials');
        }
        
        const token = signToken({ id: user.id, role: user.role as Role });
        const refreshToken = signRefreshToken({ id: user.id, role: user.role as Role });
        
        return { 
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            token,
            refreshToken
        };
    }

    async refreshToken(refreshToken: string) {
        try {
            const { verifyRefreshToken, signToken } = await import('../utils/jwt');
            const decoded = verifyRefreshToken(refreshToken);
            
            // Verify user still exists
            const user = await prisma.user.findUnique({ where: { id: decoded.id } });
            if (!user) {
                throw new Error('User not found');
            }
            
            const newToken = signToken({ id: user.id, role: user.role as Role });
            return { token: newToken };
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
}