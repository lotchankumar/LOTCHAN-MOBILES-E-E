"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseController = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const error_middleware_1 = require("../middleware/error.middleware");
exports.expenseController = {
    async createExpense(req, res) {
        try {
            const { managerId, description, amount } = req.body;
            if (!managerId || !description || !amount || amount <= 0) {
                throw new error_middleware_1.AppError('Missing required fields', 400);
            }
            const expense = await client_1.default.expense.create({
                data: { managerId, description, amount },
            });
            res.status(201).json({ success: true, data: expense });
        }
        catch (error) {
            console.error('Expense creation failed:', error);
            res.status(500).json({ error: error.message || 'Failed to create expense' });
        }
    },
    async getExpenses(req, res) {
        try {
            const expenses = await client_1.default.expense.findMany({
                orderBy: { createdAt: 'desc' },
            });
            res.json({ success: true, data: expenses });
        }
        catch (error) {
            console.error('Failed to fetch expenses:', error);
            res.status(500).json({ error: 'Failed to fetch expenses' });
        }
    },
};
//# sourceMappingURL=expense.controller.js.map