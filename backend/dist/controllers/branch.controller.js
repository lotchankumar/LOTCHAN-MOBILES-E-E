"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.branchController = void 0;
const branch_service_1 = require("../services/branch.service");
const error_middleware_1 = require("../middleware/error.middleware");
const email_1 = require("../utils/email");
const cache_service_1 = require("../services/cache.service");
const client_1 = __importDefault(require("../prisma/client"));
const auditLog_service_1 = require("../services/auditLog.service");
exports.branchController = {
    async getAllBranches(req, res, next) {
        try {
            const branches = await branch_service_1.branchService.getAllBranches();
            res.json(branches);
        }
        catch (error) {
            next(new error_middleware_1.AppError('Failed to fetch branches', 500));
        }
    },
    async getBranchById(req, res, next) {
        try {
            const { id } = req.params;
            const branch = await branch_service_1.branchService.getBranchById(id);
            if (!branch) {
                return next(new error_middleware_1.AppError('Branch not found', 404));
            }
            res.json(branch);
        }
        catch (error) {
            next(new error_middleware_1.AppError('Failed to fetch branch', 500));
        }
    },
    async createBranch(req, res, next) {
        try {
            const data = req.body;
            const branch = await branch_service_1.branchService.createBranch(data);
            const user = req.user;
            // Log branch creation
            auditLog_service_1.auditLogService.logAction({
                userId: user?.id,
                action: 'BRANCH_CREATED',
                entity: 'Branch',
                entityId: branch.id,
                details: JSON.stringify({ name: branch.name, address: branch.address }),
                ipAddress: req.ip,
            });
            res.status(201).json(branch);
        }
        catch (error) {
            console.error('Create branch error:', error);
            // Handle Prisma errors specifically
            if (error.code === 'P2002') {
                return next(new error_middleware_1.AppError(`Branch validation failed: ${error.meta?.target?.join(', ') || error.message}`, 400));
            }
            else if (error.code === 'P2003') {
                return next(new error_middleware_1.AppError('Foreign key constraint failed', 400));
            }
            else if (error.code?.startsWith('P20')) {
                return next(new error_middleware_1.AppError(`Database error: ${error.message}`, 400));
            }
            next(new error_middleware_1.AppError(`Failed to create branch: ${error.message || error}`, 500));
        }
    },
    async updateBranch(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;
            const branch = await branch_service_1.branchService.updateBranch(id, data);
            const user = req.user;
            // Log branch update
            auditLog_service_1.auditLogService.logAction({
                userId: user?.id,
                action: 'BRANCH_UPDATED',
                entity: 'Branch',
                entityId: id,
                details: JSON.stringify(data),
                ipAddress: req.ip,
            });
            res.json(branch);
        }
        catch (error) {
            if (error.message === 'Branch not found') {
                return next(new error_middleware_1.AppError('Branch not found', 404));
            }
            next(new error_middleware_1.AppError('Failed to update branch', 500));
        }
    },
    async requestDeleteOtp(req, res, next) {
        try {
            const { id } = req.params;
            const user = req.user;
            const branch = await branch_service_1.branchService.getBranchById(id);
            if (!branch) {
                return next(new error_middleware_1.AppError('Branch not found', 404));
            }
            let adminEmail = user.email;
            if (user.role !== 'ADMIN') {
                const admin = await client_1.default.user.findFirst({ where: { role: 'ADMIN' } });
                if (!admin)
                    return next(new error_middleware_1.AppError('Admin not found', 500));
                adminEmail = admin.email;
            }
            const otp = (0, email_1.generateOTP)(6);
            cache_service_1.cacheService.set(`delete_branch_otp_${id}`, otp, 600); // 10 minutes
            try {
                await (0, email_1.sendOTPEmail)(adminEmail, otp);
            }
            catch (emailError) {
                console.error('Email sending failed:', emailError);
                if (process.env.NODE_ENV === 'production') {
                    return next(new error_middleware_1.AppError('Failed to send OTP email. Please try again.', 500));
                }
            }
            res.json({ message: 'OTP sent to admin email successfully', expiresIn: '10 minutes' });
        }
        catch (error) {
            next(new error_middleware_1.AppError(error.message, error.statusCode || 500));
        }
    },
    async deleteBranch(req, res, next) {
        try {
            const { id } = req.params;
            const { otp } = req.body;
            if (!otp) {
                return next(new error_middleware_1.AppError('OTP is required to delete a branch', 400));
            }
            const cachedOtp = cache_service_1.cacheService.get(`delete_branch_otp_${id}`);
            if (!cachedOtp || cachedOtp !== otp) {
                return next(new error_middleware_1.AppError('Invalid or expired OTP', 400));
            }
            await branch_service_1.branchService.deleteBranch(id);
            cache_service_1.cacheService.invalidate(`delete_branch_otp_${id}`);
            // Log branch deletion
            const user = req.user;
            auditLog_service_1.auditLogService.logAction({
                userId: user?.id,
                action: 'BRANCH_DELETED',
                entity: 'Branch',
                entityId: id,
                details: JSON.stringify({ deletedBranchId: id }),
                ipAddress: req.ip,
            });
            res.status(204).send();
        }
        catch (error) {
            if (error.message.includes('not found')) {
                return next(new error_middleware_1.AppError('Branch not found', 404));
            }
            next(new error_middleware_1.AppError(error.message, error.statusCode || 400));
        }
    }
};
//# sourceMappingURL=branch.controller.js.map