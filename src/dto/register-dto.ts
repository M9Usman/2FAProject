// ---------- dto/register.dto.ts ----------
import { Role } from '../constants/role';

export interface RegisterDto {
    email: string;
    password: string;
    name: string;
    role?: Role;
}
