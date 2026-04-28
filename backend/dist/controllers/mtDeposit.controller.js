"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mtDepositController = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const error_middleware_1 = require("../middleware/error.middleware");
exports.mtDepositController = {
    async createMTDeposit(req, res) {
        try {
            const { managerId, provider, amount, reference } = req.body;
            if (!managerId || !provider || !amount || amount <= 0 || !reference) {
                throw new error_middleware_1.AppError('Missing required fields', 400);
            }
            const deposit = await client_1.default.mTDeposit.create({
                data: { managerId, provider, amount, reference },
            });
            res.status(201).json({ success: true, data: deposit });
        }
        catch (error) {
            console.error('MT Deposit creation failed:', error);
            res.status(500).json({ error: error.message || 'Failed to create MT deposit' });
        }
    },
    async getMTDeposits(req, res) {
        try {
            const deposits = await client_1.default.mTDeposit.findMany({
                orderBy: { createdAt: 'desc' },
            });
            res.json({ success: true, data: deposits });
        }
        catch (error) {
            console.error('Failed to fetch MT deposits:', error);
            res.status(500).json({ error: 'Failed to fetch MT deposits' });
        }
    },
};
//# sourceMappingURL=mtDeposit.controller.js.map