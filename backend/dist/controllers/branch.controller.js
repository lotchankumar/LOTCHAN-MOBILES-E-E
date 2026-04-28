"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.branchController = void 0;
const branch_service_1 = require("../services/branch.service");
const error_middleware_1 = require("../middleware/error.middleware");
exports.branchController = {
    async getAllBranches(req, res) {
        try {
            const branches = await branch_service_1.branchService.getAllBranches();
            res.json(branches);
        }
        catch (error) {
            throw new error_middleware_1.AppError('Failed to fetch branches', 500);
        }
    },
    async getBranchById(req, res) {
        try {
            const { id } = req.params;
            const branch = await branch_service_1.branchService.getBranchById(id);
            if (!branch) {
                throw new error_middleware_1.AppError('Branch not found', 404);
            }
            res.json(branch);
        }
        catch (error) {
            throw new error_middleware_1.AppError('Failed to fetch branch', 500);
        }
    },
    async createBranch(req, res) {
        try {
            const data = req.body;
            const branch = await branch_service_1.branchService.createBranch(data);
            res.status(201).json(branch);
        }
        catch (error) {
            console.error('Create branch error:', error);
            // Handle Prisma errors specifically
            if (error.code === 'P2002') {
                throw new error_middleware_1.AppError(`Branch validation failed: ${error.meta?.target?.join(', ') || error.message}`, 400);
            }
            else if (error.code === 'P2003') {
                throw new error_middleware_1.AppError('Foreign key constraint failed', 400);
            }
            else if (error.code?.startsWith('P20')) {
                throw new error_middleware_1.AppError(`Database error: ${error.message}`, 400);
            }
            throw new error_middleware_1.AppError(`Failed to create branch: ${error.message || error}`, 500);
        }
    },
    async updateBranch(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const branch = await branch_service_1.branchService.updateBranch(id, data);
            res.json(branch);
        }
        catch (error) {
            if (error.message === 'Branch not found') {
                throw new error_middleware_1.AppError('Branch not found', 404);
            }
            throw new error_middleware_1.AppError('Failed to update branch', 500);
        }
    },
    async deleteBranch(req, res) {
        try {
            const { id } = req.params;
            await branch_service_1.branchService.deleteBranch(id);
            res.status(204).send();
        }
        catch (error) {
            if (error.message.includes('not found')) {
                throw new error_middleware_1.AppError('Branch not found', 404);
            }
            throw new error_middleware_1.AppError(error.message, 400);
        }
    }
};
//# sourceMappingURL=branch.controller.js.map