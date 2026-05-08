import { Router } from 'express';
import { 
  seedAdmin, 
  customerRegister, 
  customerLogin, 
  staffLogin,
  getProfile,
  requestAdminPasswordReset,
  verifyAdminOTP,
  resetAdminPassword,
  requestPasswordReset,
  verifyPasswordResetOTP,
  resetPassword,
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { registerSchema, loginSchema } from '../utils/validation';

const router = Router();

// Public routes for Customers
router.post('/customer/register', validate(registerSchema), customerRegister);
router.post('/customer/login', validate(loginSchema), customerLogin);

// Public route for Staff / Manager / Technician
router.post('/staff/login', validate(loginSchema), staffLogin);

// Seed admin (public for initial setup)
router.post('/seed-admin', seedAdmin);

// ===== Admin Password Reset (legacy, kept for backward compat) =====
router.post('/admin/request-password-reset', requestAdminPasswordReset);
router.post('/admin/verify-otp', verifyAdminOTP);
router.post('/admin/reset-password', resetAdminPassword);

// ===== Universal Forgot Password (all roles) =====
// Step 1: User enters their email → OTP sent to the appropriate authority
router.post('/forgot-password', requestPasswordReset);
// Step 2: User enters OTP received from authority
router.post('/verify-otp', verifyPasswordResetOTP);
// Step 3: User sets new password
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/profile', authenticate, getProfile);

export default router;
