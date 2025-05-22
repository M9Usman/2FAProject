// ---------- src/routes/user-route.ts ----------
import { Router } from 'express';
import { getProfile, adminOnly } from '../controllers/user-controller';
import { authenticate, authorize, requireAdmin } from '../middleware/auth-middleware';
import { ROLES } from '../constants/role';

const router = Router();

// ✅ This will now work without TypeScript errors
router.get('/me', authenticate, getProfile);
router.get('/admin', authenticate, authorize([ROLES.ADMIN]), adminOnly);

// ✅ Alternative using specific middleware
// router.get('/admin', authenticate, requireAdmin, adminOnly);

export default router;
