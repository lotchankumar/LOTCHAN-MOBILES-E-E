import express from 'express';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import { staffController } from '../controllers/staff.controller';

const router = express.Router();

router.get('/staff', authenticate, requireRole(['ADMIN', 'MANAGER']), staffController.getAllStaff);
router.post('/staff', authenticate, requireRole(['ADMIN', 'MANAGER']), staffController.createStaff);
router.patch('/staff/:id', authenticate, requireRole(['ADMIN', 'MANAGER']), staffController.updateStaff);
router.post('/staff/:id/reset-password', authenticate, requireRole(['ADMIN', 'MANAGER']), staffController.resetStaffPassword);

export default router;