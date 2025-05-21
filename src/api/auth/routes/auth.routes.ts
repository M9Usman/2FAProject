// ---------- auth/routes/auth.routes.ts ----------
import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { loginValidator } from '../../validators/login.validator';
import { validate } from '../../../common/middleware/validate.middleware';

const router = Router();
router.post('/register', register);
router.post('/login',loginValidator,validate, login);

export default router;