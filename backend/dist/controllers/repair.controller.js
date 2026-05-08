"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.repairController = void 0;
const repair_service_1 = require("../services/repair.service");
const client_1 = __importDefault(require("../prisma/client"));
const auditLog_service_1 = require("../services/auditLog.service");
exports.repairController = {
    async createRepair(req, res) {
        try {
            const { customerId, deviceModel, imeiSerial, issueDescription, estimatedCost, advancePaid, assignedToId } = req.body;
            const user = req.user;
            const finalCustomerId = user && user.role === 'CUSTOMER' ? user.id : customerId;
            const job = await repair_service_1.repairService.createRepairJob({
                customerId: finalCustomerId,
                deviceModel,
                imeiSerial,
                issueDescription,
                estimatedCost,
                advancePaid,
                assignedToId,
                branchId: req.body.branchId || user?.branchId
            });
            // Log repair creation
            auditLog_service_1.auditLogService.logAction({
                userId: user?.id,
                action: 'REPAIR_CREATED',
                entity: 'RepairJob',
                entityId: job.id,
                details: JSON.stringify({ ticketNumber: job.ticketNumber, deviceModel, estimatedCost }),
                branchId: req.body.branchId || user?.branchId,
                ipAddress: req.ip,
            });
            res.status(201).json(job);
        }
        catch (error) {
            console.error('Failed to create repair job:', error);
            res.status(500).json({ error: 'Failed to create repair job' });
        }
    },
    async getRepairs(req, res) {
        try {
            const user = req.user;
            const isCustomer = user && user.role === 'CUSTOMER';
            const repairs = await client_1.default.repairJob.findMany({
                where: isCustomer ? { customerId: user.id } : undefined,
                orderBy: { createdAt: 'desc' },
                include: { customer: true }
            });
            res.json(repairs);
        }
        catch (error) {
            console.error('Failed to fetch repair jobs:', error);
            res.status(500).json({ error: 'Failed to fetch repair jobs' });
        }
    },
    async updateStatus(req, res) {
        try {
            const id = req.params.id;
            const { status } = req.body;
            const user = req.user;
            const job = await repair_service_1.repairService.updateRepairStatus(id, status);
            // Log repair status update
            auditLog_service_1.auditLogService.logAction({
                userId: user?.id,
                action: 'REPAIR_STATUS_UPDATED',
                entity: 'RepairJob',
                entityId: id,
                details: JSON.stringify({ ticketNumber: job.ticketNumber, newStatus: status }),
                branchId: user?.branchId,
                ipAddress: req.ip,
            });
            res.json(job);
        }
        catch (error) {
            console.error('Failed to update repair status:', error);
            res.status(500).json({ error: 'Failed to update repair status' });
        }
    },
    async addParts(req, res) {
        try {
            const id = req.params.id;
            const { parts } = req.body;
            const user = req.user;
            await repair_service_1.repairService.usePartsInRepair(id, parts);
            // Log parts added
            auditLog_service_1.auditLogService.logAction({
                userId: user?.id,
                action: 'REPAIR_PARTS_ADDED',
                entity: 'RepairJob',
                entityId: id,
                details: JSON.stringify({ partsCount: parts?.length }),
                branchId: user?.branchId,
                ipAddress: req.ip,
            });
            res.status(200).json({ success: true, message: 'Parts added to repair successfully' });
        }
        catch (error) {
            if (error.message && error.message.includes('Insufficient stock')) {
                return res.status(400).json({ error: error.message });
            }
            console.error('Failed to add parts to repair:', error);
            res.status(500).json({ error: 'Failed to add parts to repair' });
        }
    }
};
//# sourceMappingURL=repair.controller.js.map