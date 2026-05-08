"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffController = void 0;
const manager_service_1 = require("../services/manager.service");
const client_1 = __importDefault(require("../prisma/client"));
exports.staffController = {
    async getAllStaff(req, res) {
        const loggedInUser = req.user;
        // MANAGERs only see staff within their own branch; ADMINs see all
        const branchId = loggedInUser.role === 'MANAGER' ? loggedInUser.branchId : undefined;
        const staff = await manager_service_1.staffService.getAllStaff(branchId);
        res.json(staff);
    },
    async createStaff(req, res) {
        const loggedInUser = req.user;
        const data = { ...req.body };
        // If the logged-in user is a MANAGER, auto-assign managerId and branchId
        if (loggedInUser.role === 'MANAGER') {
            data.managerId = loggedInUser.id;
            // Fetch the manager's branch and assign it to the staff
            const manager = await client_1.default.user.findUnique({
                where: { id: loggedInUser.id },
                select: { branchId: true }
            });
            if (manager?.branchId) {
                data.branchId = manager.branchId;
            }
        }
        console.log('Staff creation request body:', JSON.stringify(data, null, 2));
        const staff = await manager_service_1.staffService.createStaff(data);
        res.status(201).json(staff);
    },
    async updateStaff(req, res) {
        const staff = await manager_service_1.staffService.updateStaff(req.params.id, req.body);
        res.json(staff);
    },
    async resetStaffPassword(req, res) {
        await manager_service_1.staffService.resetStaffPassword(req.params.id);
        res.json({ success: true, message: 'Password reset email sent' });
    },
    async getOrganizationHierarchy(req, res) {
        const hierarchy = await manager_service_1.organizationService.getOrganizationHierarchy();
        res.json(hierarchy);
    }
};
//# sourceMappingURL=staff.controller.js.map