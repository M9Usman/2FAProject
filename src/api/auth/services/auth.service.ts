import bcrypt from 'bcrypt';
import prisma from '../../../prisma/client';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { signToken } from '../utils/jwt';
import { Role } from '../../../common/enums/roles.enum';

export class AuthService {
    async register(data: RegisterDto) {
        const { email, password, name } = data;
        const role = data.role ?? Role.USER; // ✅ fallback to default if not provided

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name, role },
        });

        return { id: user.id, email: user.email, name: user.name, role: user.role };
    }


    async login(data: LoginDto) {
        const { email, password } = data;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) throw new Error('User not found');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error('Invalid credentials');

        const token = signToken({ id: user.id, role: user.role });
        return { token };
    }
}
