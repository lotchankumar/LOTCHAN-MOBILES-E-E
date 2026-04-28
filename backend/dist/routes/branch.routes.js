"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const branch_controller_1 = require("../controllers/branch.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const validation_1 = require("../utils/validation");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN', 'MANAGER']), branch_controller_1.branchController.getAllBranches);
router.get('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN', 'MANAGER']), branch_controller_1.branchController.getBranchById);
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN']), (0, validation_middleware_1.validate)(validation_1.createBranchSchema), branch_controller_1.branchController.createBranch);
router.patch('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN']), branch_controller_1.branchController.updateBranch);
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN']), branch_controller_1.branchController.deleteBranch);
exports.default = router;
//# sourceMappingURL=branch.routes.js.map