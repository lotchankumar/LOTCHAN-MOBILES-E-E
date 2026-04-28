"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.repairService = void 0;
const client_1 = require("@prisma/client");
const inventory_service_1 = require("./inventory.service");
const queue_service_1 = require("./queue.service");
const client_2 = __importDefault(require("../prisma/client"));
exports.repairService = {
    async createRepairJob(data) {
        const ticketNumber = `REP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const job = await client_2.default.repairJob.create({
            data: {
                ticketNumber,
                customerId: data.customerId,
                deviceModel: data.deviceModel,
                imeiSerial: data.imeiSerial,
                issueDescription: data.issueDescription,
                estimatedCost: data.estimatedCost,
                advancePaid: data.advancePaid || 0,
                assignedToId: data.assignedToId,
                status: client_1.RepairStatus.RECEIVED
            },
            include: { customer: true }
        });
        await queue_service_1.queueService.addJob('sendRepairStatusUpdate', {
            customerEmail: job.customer.email,
            customerPhone: job.customer.phone,
            ticketNumber: job.ticketNumber,
            status: 'received'
        });
        return job;
    },
    async usePartsInRepair(repairJobId, parts) {
        return client_2.default.$transaction(async (tx) => {
            for (const part of parts) {
                // Check stock and decrement atomically
                await inventory_service_1.inventoryService.decrementStock(tx, part.productId, part.quantity);
                const product = await tx.product.findUniqueOrThrow({ where: { id: part.productId } });
                await tx.repairPart.create({
                    data: {
                        repairJobId,
                        productId: part.productId,
                        quantity: part.quantity,
                        unitPrice: product.cost // or price depending on policy
                    }
                });
            }
        });
    },
    async updateRepairStatus(jobId, newStatus) {
        const job = await client_2.default.repairJob.update({
            where: { id: jobId },
            data: { status: newStatus },
            include: { customer: true }
        });
        await queue_service_1.queueService.addJob('sendRepairStatusUpdate', {
            customerEmail: job.customer.email,
            customerPhone: job.customer.phone,
            ticketNumber: job.ticketNumber,
            status: newStatus
        });
        return job;
    }
};
//# sourceMappingURL=repair.service.js.map