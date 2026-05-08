"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerController = void 0;
const manager_service_1 = require("../services/manager.service");
const error_middleware_1 = require("../middleware/error.middleware");
const auditLog_service_1 = require("../services/auditLog.service");
exports.managerController = {
    async getAllManagers(req, res) {
        const managers = await manager_service_1.managerService.getAllManagers();
        res.json(managers);
    },
    async createManager(req, res) {
        const manager = await manager_service_1.managerService.createManager(req.body);
        const user = req.user;
        // Log user creation
        auditLog_service_1.auditLogService.logAction({
            userId: user?.id,
            action: 'USER_CREATED',
            entity: 'User',
            entityId: manager.id,
            details: JSON.stringify({ name: req.body.name, email: req.body.email, role: req.body.role || 'MANAGER' }),
            branchId: user?.branchId,
            ipAddress: req.ip,
        });
        res.status(201).json(manager);
    },
    async updateManager(req, res) {
        const manager = await manager_service_1.managerService.updateManager(req.params.id, req.body);
        const user = req.user;
        // Log user update
        auditLog_service_1.auditLogService.logAction({
            userId: user?.id,
            action: 'USER_UPDATED',
            entity: 'User',
            entityId: req.params.id,
            details: JSON.stringify(req.body),
            branchId: user?.branchId,
            ipAddress: req.ip,
        });
        res.json(manager);
    },
    async resetPassword(req, res) {
        await manager_service_1.managerService.resetPassword(req.params.id);
        res.json({ success: true, message: 'Password reset email sent' });
    },
    async getAllBranches(req, res) {
        const branches = await manager_service_1.managerService.getAllBranches();
        res.json(branches);
    },
    async getDailyCashflow(req, res) {
        const { date, branchId: queryBranchId } = req.query;
        if (!date || typeof date !== 'string') {
            throw new error_middleware_1.AppError('Date parameter (YYYY-MM-DD) is required', 400);
        }
        let targetBranchId = req.user.branchId;
        if (req.user.role === 'ADMIN' && queryBranchId && typeof queryBranchId === 'string') {
            targetBranchId = queryBranchId;
        }
        if (!targetBranchId) {
            throw new error_middleware_1.AppError('Admin must select a branch, or Manager branch not found', 403);
        }
        const cashflow = await manager_service_1.managerService.getDailyCashflow(targetBranchId, date);
        res.json(cashflow);
    },
    async getProfit(req, res, next) {
        try {
            const { startDate, endDate, branchId: queryBranchId } = req.query;
            if (!startDate || typeof startDate !== 'string' || !endDate || typeof endDate !== 'string') {
                throw new error_middleware_1.AppError('startDate and endDate parameters (YYYY-MM-DD) are required', 400);
            }
            let targetBranchId = req.user.branchId;
            if (req.user.role === 'ADMIN') {
                if (queryBranchId && typeof queryBranchId === 'string') {
                    targetBranchId = queryBranchId;
                }
                else {
                    targetBranchId = 'all'; // Default to all branches for Admin
                }
            }
            if (!targetBranchId && req.user.role !== 'ADMIN') {
                throw new error_middleware_1.AppError('Branch ID is required', 400);
            }
            const profit = await manager_service_1.managerService.getProfit(targetBranchId, startDate, endDate);
            res.json({ success: true, data: profit });
        }
        catch (err) {
            next(err);
        }
    },
    async getDashboardStats(req, res, next) {
        try {
            const { branchId: queryBranchId } = req.query;
            let targetBranchId = req.user.branchId;
            if (req.user.role === 'ADMIN') {
                if (queryBranchId && typeof queryBranchId === 'string') {
                    targetBranchId = queryBranchId;
                }
                else {
                    targetBranchId = 'all'; // Default to all branches for Admin
                }
            }
            if (!targetBranchId && req.user.role !== 'ADMIN') {
                throw new error_middleware_1.AppError('Branch ID is required', 400);
            }
            const stats = await manager_service_1.managerService.getDashboardStats(targetBranchId);
            res.json({ success: true, data: stats });
        }
        catch (err) {
            next(err);
        }
    }
};
//# sourceMappingURL=manager.controller.js.map