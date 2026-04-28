import express from 'express';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import { branchController } from '../controllers/branch.controller';
import { validate } from '../middleware/validation.middleware';
import { createBranchSchema } from '../utils/validation';

const router = express.Router();

router.get('/', authenticate, requireRole(['ADMIN', 'MANAGER']), branchController.getAllBranches);
router.get('/:id', authenticate, requireRole(['ADMIN', 'MANAGER']), branchController.getBranchById);
router.post('/', authenticate, requireRole(['ADMIN']), validate(createBranchSchema), branchController.createBranch);
router.patch('/:id', authenticate, requireRole(['ADMIN']), branchController.updateBranch);
router.delete('/:id', authenticate, requireRole(['ADMIN']), branchController.deleteBranch);

export default router;

