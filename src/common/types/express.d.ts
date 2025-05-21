// ---------- common/types/express.d.ts ----------
import { Role } from '../enums/roles.enum';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                role: Role;
            };
        }
    }
}
export {};