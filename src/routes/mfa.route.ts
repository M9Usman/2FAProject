// mfa.route.ts

import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import {
    setupMfa,
    enableMfa,
    verifyMfaLogin,
    disableMfa,
    getMfaStatus
} from '../controllers/mfa.controller';

const router = Router();

/**
 * @description Setup MFA - Generate QR code and secret
 * @Route [POST] - /api/v1/mfa/setup
 * @Access Private
 */
router.post('/setup', authenticate, setupMfa);

/**
 * @description Enable MFA after verification
 * @Route [POST] - /api/v1/mfa/enable
 * @Access Private
 */
router.post('/enable', authenticate, enableMfa);

/**
 * @description Verify MFA during login
 * @Route [POST] - /api/v1/mfa/verify
 * @Access Public
 */
router.post('/verify', verifyMfaLogin);

/**
 * @description Disable MFA
 * @Route [POST] - /api/v1/mfa/disable
 * @Access Private
 */
router.post('/disable', authenticate, disableMfa);

/**
 * @description Get MFA status
 * @Route [GET] - /api/v1/mfa/status
 * @Access Private
 */
router.get('/status', authenticate, getMfaStatus);

export default router;