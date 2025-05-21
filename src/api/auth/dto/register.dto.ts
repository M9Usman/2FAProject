// ---------- auth/dto/register.dto.ts ----------
import { Role } from '../../common/enums/roles.enum';

export interface RegisterDto {
    email: string;
    password: string;
    name:string;
    role?: Role;
}