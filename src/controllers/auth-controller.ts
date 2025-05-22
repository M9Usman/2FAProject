import { RequestHandler } from 'express';
import { AuthService } from '../service/auth-service';
import { RegisterDto } from '../dto/register-dto';
import { LoginDto } from '../dto/login-dto';

const authService = new AuthService();

export const register: RequestHandler = async (req, res, next) => {
    try {
        const data: RegisterDto = req.body;
        const user = await authService.register(data);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};
export const login: RequestHandler = async (req, res, next) => {
    try {
        const data: LoginDto = req.body;
        const result = await authService.login(data);
        res.json(result);
    } catch (err) {
        if (err instanceof Error && err.message === 'User not found') {
            res.status(404).json({ message: err.message });
            return;
        }
        if (err instanceof Error && err.message === 'Invalid credentials') {
            res.status(401).json({ message: err.message });
            return;
        }
        next(err);
    }
};

