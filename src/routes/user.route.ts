// ---------- src/routes/user-route.ts ----------
import { Router } from 'express';
import { getProfile, adminOnly } from '../controllers/user.controller';
import { authorize, requireAdmin } from '../middleware/auth.middleware';
import { ROLES } from '../constants/role';

const router = Router();

/**
 * @description Get current user's profile information
 * @Route [GET] - /api/v1/users/me
 * @Access Private
 * @headers {string} Authorization - Bearer token required
 * @returns {Object} - User profile data (id, email, firstName, lastName, role, etc.)
 */
router.get('/me', getProfile);

/**
 * @description Admin-only endpoint for administrative operations
 * @Route [GET] - /api/v1/users/admin
 * @Access Private (Admin Only)
 * @headers {string} Authorization - Bearer token required
 * @middleware authorize([ROLES.ADMIN]) - Restricts access to admin users only
 * @returns {Object} - Admin-specific data and operations
 */
router.get('/admin', authorize([ROLES.ADMIN]), adminOnly);

// ✅ Alternative using specific middleware
// router.get('/admin', requireAdmin, adminOnly);

export default router;