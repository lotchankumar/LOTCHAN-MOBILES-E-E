"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
// Public routes for Customers
router.post('/customer/register', (0, validation_middleware_1.validate)(validation_1.registerSchema), auth_controller_1.customerRegister);
router.post('/customer/login', (0, validation_middleware_1.validate)(validation_1.loginSchema), auth_controller_1.customerLogin);
// Public route for Staff
router.post('/staff/login', (0, validation_middleware_1.validate)(validation_1.loginSchema), auth_controller_1.staffLogin);
// Seed admin (public for initial setup - in production, this should be protected)
router.post('/seed-admin', auth_controller_1.seedAdmin);
// Admin Password Reset Routes (Public)
router.post('/admin/request-password-reset', auth_controller_1.requestAdminPasswordReset);
router.post('/admin/verify-otp', auth_controller_1.verifyAdminOTP);
router.post('/admin/reset-password', auth_controller_1.resetAdminPassword);
// Protected routes
router.get('/profile', auth_middleware_1.authenticate, auth_controller_1.getProfile);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map