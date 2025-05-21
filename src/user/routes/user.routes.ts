
// ---------- user/routes/user.routes.ts ----------
import { Router } from 'express';
import { getProfile, adminOnly } from '../controllers/user.controller';
import { authGuard } from '../../auth/guards/auth.guard';
import { roleGuard } from '../../auth/guards/role.guard';

const router = Router();
router.get('/me', authGuard, getProfile);
router.get('/admin', authGuard, roleGuard(['ADMIN']), adminOnly);

export default router;