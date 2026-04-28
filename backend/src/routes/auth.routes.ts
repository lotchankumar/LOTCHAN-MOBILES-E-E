import { Router } from 'express';
import { 
  seedAdmin, 
  customerRegister, 
  customerLogin, 
  staffLogin,
  getProfile,
  requestAdminPasswordReset,
  verifyAdminOTP,
  resetAdminPassword
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { registerSchema, loginSchema } from '../utils/validation';

const router = Router();

// Public routes for Customers
router.post('/customer/register', validate(registerSchema), customerRegister);
router.post('/customer/login', validate(loginSchema), customerLogin);

// Public route for Staff
router.post('/staff/login', validate(loginSchema), staffLogin);

// Seed admin (public for initial setup - in production, this should be protected)
router.post('/seed-admin', seedAdmin);

// Admin Password Reset Routes (Public)
router.post('/admin/request-password-reset', requestAdminPasswordReset);
router.post('/admin/verify-otp', verifyAdminOTP);
router.post('/admin/reset-password', resetAdminPassword);

// Protected routes
router.get('/profile', authenticate, getProfile);

export default router;
