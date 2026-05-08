"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.branchService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
exports.branchService = {
    async getAllBranches() {
        return client_1.default.branch.findMany({
            include: {
                _count: {
                    select: {
                        users: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    },
    async getBranchById(id) {
        return client_1.default.branch.findUnique({
            where: { id },
            include: {
                users: true,
                orders: { select: { id: true, orderNumber: true, status: true, createdAt: true } }
            }
        });
    },
    async createBranch(data) {
        return client_1.default.branch.create({ data });
    },
    async updateBranch(id, data) {
        return client_1.default.branch.update({
            where: { id },
            data
        });
    },
    async deleteBranch(id) {
        // Check dependencies
        const branch = await client_1.default.branch.findUnique({
            where: { id },
            include: {
                _count: { select: { users: true, orders: true } }
            }
        });
        if (!branch) {
            throw new Error('Branch not found');
        }
        return client_1.default.branch.delete({ where: { id } });
    }
};
//# sourceMappingURL=branch.service.js.map