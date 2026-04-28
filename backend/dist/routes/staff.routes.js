"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const staff_controller_1 = require("../controllers/staff.controller");
const router = express_1.default.Router();
router.get('/staff', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN', 'MANAGER']), staff_controller_1.staffController.getAllStaff);
router.post('/staff', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN', 'MANAGER']), staff_controller_1.staffController.createStaff);
router.patch('/staff/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN', 'MANAGER']), staff_controller_1.staffController.updateStaff);
router.post('/staff/:id/reset-password', auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)(['ADMIN', 'MANAGER']), staff_controller_1.staffController.resetStaffPassword);
exports.default = router;
//# sourceMappingURL=staff.routes.js.map