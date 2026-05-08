"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerService = exports.organizationService = exports.staffService = exports.baseManagerService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const queue_service_1 = require("./queue.service");
const error_middleware_1 = require("../middleware/error.middleware");
const inventory_service_1 = require("./inventory.service");
const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8).toUpperCase().slice(0, 4);
};
exports.baseManagerService = {
    async getAllManagers() {
        return client_1.default.user.findMany({
            where: { role: 'MANAGER' },
            include: { branch: true },
            orderBy: { createdAt: 'desc' }
        });
    },
    async createManager(data) {
        // Validation
        if (!data.name?.trim() || !data.email?.trim() || !data.branchId) {
            throw new error_middleware_1.AppError('Missing required fields: name, email, branchId', 400);
        }
        // Check email unique
        const existingUser = await client_1.default.user.findUnique({
            where: { email: data.email.toLowerCase().trim() }
        });
        if (existingUser) {
            throw new error_middleware_1.AppError('Email already registered', 409);
        }
        // Check branch exists
        const branch = await client_1.default.branch.findUnique({ where: { id: data.branchId } });
        if (!branch) {
            throw new error_middleware_1.AppError('Branch not found', 400);
        }
        const tempPassword = data.password || generateRandomPassword();
        const passwordHash = await bcrypt_1.default.hash(tempPassword, 10);
        try {
            const user = await client_1.default.user.create({
                data: {
                    name: data.name.trim(),
                    email: data.email.toLowerCase().trim(),
                    passwordHash,
                    role: 'MANAGER',
                    branchId: data.branchId
                }
            });
            // Queue welcome email (fire & forget)
            queue_service_1.queueService.addJob('sendManagerWelcome', {
                email: user.email,
                name: user.name,
                branchName: branch.name,
                tempPassword
            }).catch(err => console.error('Failed to queue welcome email:', err));
            return user;
        }
        catch (error) {
            console.error('Prisma create manager error:', error);
            if (error.code === 'P2002') {
                throw new error_middleware_1.AppError('Email already in use', 409);
            }
            else if (error.code === 'P2025') {
                throw new error_middleware_1.AppError('Invalid branch association', 400);
            }
            throw new error_middleware_1.AppError('Failed to create manager', 500);
        }
    },
    async updateManager(id, data) {
        return client_1.default.user.update({
            where: { id },
            data,
            include: { branch: true },
        });
    },
    async resetPassword(id) {
        const tempPassword = generateRandomPassword();
        const passwordHash = await bcrypt_1.default.hash(tempPassword, 10);
        const user = await client_1.default.user.update({
            where: { id },
            data: { passwordHash }
        });
        queue_service_1.queueService.addJob('sendPasswordReset', {
            email: user.email,
            name: user.name,
            tempPassword
        });
        return { success: true };
    },
    async getAllBranches() {
        return client_1.default.branch.findMany({
            orderBy: { name: 'asc' }
        });
    },
    async getManagerById(id) {
        return client_1.default.user.findUnique({
            where: { id }
        });
    }
};
exports.staffService = {
    async getAllStaff(branchId) {
        return client_1.default.user.findMany({
            where: {
                role: { in: ['STAFF', 'TECHNICIAN'] },
                ...(branchId && { branchId }),
            },
            include: {
                branch: true,
                manager: {
                    select: { id: true, name: true, email: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    },
    async createStaff(data) {
        console.log('Staff creation service data:', JSON.stringify(data, null, 2));
        // Validation
        if (!data.name?.trim() || !data.email?.trim()) {
            throw new error_middleware_1.AppError('Missing required fields: name, email', 400);
        }
        // Check email unique
        const existingUser = await client_1.default.user.findUnique({
            where: { email: data.email.toLowerCase().trim() }
        });
        if (existingUser) {
            throw new error_middleware_1.AppError('Email already registered', 409);
        }
        // Check branch exists if provided
        let branch = null;
        if (data.branchId) {
            branch = await client_1.default.branch.findUnique({ where: { id: data.branchId } });
            if (!branch) {
                throw new error_middleware_1.AppError('Branch not found', 400);
            }
        }
        const tempPassword = data.password || generateRandomPassword();
        const passwordHash = await bcrypt_1.default.hash(tempPassword, 10);
        try {
            const userData = {
                name: data.name.trim(),
                email: data.email.toLowerCase().trim(),
                passwordHash,
                role: data.role || 'STAFF',
                branchId: data.branchId || null,
                managerId: data.managerId || null
            };
            console.log('Creating user with data:', JSON.stringify(userData, null, 2));
            const user = await client_1.default.user.create({
                data: userData
            });
            // Queue welcome email (fire & forget)
            queue_service_1.queueService.addJob('sendStaffWelcome', {
                email: user.email,
                name: user.name,
                branchName: branch?.name || 'No Branch',
                tempPassword
            }).catch(err => console.error('Failed to queue welcome email:', err));
            return user;
        }
        catch (error) {
            console.error('Prisma create staff error:', error);
            if (error.code === 'P2002') {
                throw new error_middleware_1.AppError('Email already in use', 409);
            }
            else if (error.code === 'P2025') {
                throw new error_middleware_1.AppError('Invalid branch association', 400);
            }
            throw new error_middleware_1.AppError('Failed to create staff', 500);
        }
    },
    async updateStaff(id, data) {
        return client_1.default.user.update({
            where: { id },
            data,
            include: { branch: true },
        });
    },
    async resetStaffPassword(id) {
        const tempPassword = generateRandomPassword();
        const passwordHash = await bcrypt_1.default.hash(tempPassword, 10);
        const user = await client_1.default.user.update({
            where: { id },
            data: { passwordHash }
        });
        queue_service_1.queueService.addJob('sendPasswordReset', {
            email: user.email,
            name: user.name,
            tempPassword
        });
        return { success: true };
    },
    async getStaffById(id) {
        return client_1.default.user.findUnique({
            where: { id }
        });
    }
};
exports.organizationService = {
    async getOrganizationHierarchy() {
        // Get all branches with their managers and managers' staff
        const branches = await client_1.default.branch.findMany({
            include: {
                users: {
                    where: { role: 'MANAGER' },
                    include: {
                        managedStaff: {
                            include: {
                                branch: true
                            }
                        }
                    },
                    orderBy: { name: 'asc' }
                }
            },
            orderBy: { name: 'asc' }
        });
        // Get staff that have no manager (unassigned)
        const unassignedStaff = await client_1.default.user.findMany({
            where: {
                role: { in: ['STAFF', 'TECHNICIAN'] },
                managerId: null
            },
            include: { branch: true },
            orderBy: { name: 'asc' }
        });
        return { branches, unassignedStaff };
    }
};
// --- Core manager service ---
const managerService = {
    ...exports.baseManagerService,
    async getProfit(branchId, startDate, endDate) {
        const start = new Date(startDate + 'T00:00:00.000Z');
        const end = new Date(endDate + 'T23:59:59.999Z');
        // Get staff IDs in this branch
        const userWhere = {};
        if (branchId && branchId !== 'all') {
            userWhere.branchId = branchId;
        }
        const staffIds = (await client_1.default.user.findMany({ where: userWhere, select: { id: true } })).map(u => u.id);
        // MOBILE sales: Sum of order items where product category is MOBILE
        const mobileOrders = await client_1.default.order.findMany({
            where: {
                status: 'COMPLETED',
                createdAt: { gte: start, lte: end },
                staffId: { in: staffIds }
            },
            include: {
                orderItems: {
                    include: { product: true }
                }
            }
        });
        let mobileProfit = 0;
        let accessoryProfit = 0;
        let simCardProfit = 0;
        for (const order of mobileOrders) {
            for (const item of order.orderItems) {
                const profit = (item.unitPrice - item.product.cost) * item.quantity;
                switch (item.product.category) {
                    case 'MOBILE':
                        mobileProfit += profit;
                        break;
                    case 'ACCESSORY':
                        accessoryProfit += profit;
                        break;
                    case 'SIM_CARD':
                        simCardProfit += profit;
                        break;
                }
            }
        }
        // REPAIRS: Completed/Delivered repair jobs final costs
        const repairs = await client_1.default.repairJob.findMany({
            where: {
                status: { in: ['COMPLETED', 'DELIVERED'] },
                createdAt: { gte: start, lte: end },
                assignedToId: { in: staffIds }
            }
        });
        const repairsAmount = repairs.reduce((sum, r) => sum + (r.finalCost || 0), 0);
        const totalProfit = mobileProfit + accessoryProfit + simCardProfit + repairsAmount;
        return {
            categoryProfit: {
                MOBILE: mobileProfit,
                ACCESSORY: accessoryProfit,
                SIM_CARD: simCardProfit,
                REPAIRS: repairsAmount,
            },
            totalProfit,
            dateRange: { startDate, endDate }
        };
    },
    async getDailyCashflow(branchId, date) {
        const startOfDay = new Date(date + 'T00:00:00.000Z');
        const endOfDay = new Date(date + 'T23:59:59.999Z');
        // Get staff IDs in branch
        const staffIds = (await client_1.default.user.findMany({ where: { branchId }, select: { id: true } })).map(u => u.id);
        // Sales (completed orders)
        const salesResult = await client_1.default.order.aggregate({
            where: {
                status: 'COMPLETED',
                createdAt: { gte: startOfDay, lte: endOfDay },
                staffId: { in: staffIds }
            },
            _sum: { totalAmount: true },
        });
        const salesAmount = salesResult._sum.totalAmount || 0;
        // Repairs completed
        const repairsResult = await client_1.default.repairJob.aggregate({
            where: {
                status: { in: ['COMPLETED', 'DELIVERED'] },
                createdAt: { gte: startOfDay, lte: endOfDay },
                assignedToId: { in: staffIds }
            },
            _sum: { finalCost: true },
        });
        const repairAmount = repairsResult._sum?.finalCost || 0;
        // Purchases for the day
        const purchasesResult = await client_1.default.purchase.aggregate({
            where: {
                purchaseDate: { gte: startOfDay, lte: endOfDay },
                manager: { branchId }
            },
            _sum: { totalAmount: true },
        });
        const purchasesAmount = purchasesResult._sum?.totalAmount || 0;
        // Expenses for the day
        const expensesResult = await client_1.default.expense.aggregate({
            where: {
                expenseDate: { gte: startOfDay, lte: endOfDay },
                manager: { branchId }
            },
            _sum: { amount: true },
        });
        const expensesAmount = expensesResult._sum?.amount || 0;
        const salesInflow = salesAmount;
        const totalInflows = salesInflow;
        const totalOutflows = purchasesAmount + expensesAmount;
        const expectedClosing = totalInflows - totalOutflows;
        return {
            date,
            openingBalance: 0,
            cashInflows: {
                sales: salesInflow,
                total: totalInflows,
            },
            cashOutflows: {
                purchases: purchasesAmount,
                expenses: expensesAmount,
                total: totalOutflows,
            },
            expectedClosingBalance: expectedClosing,
            actualClosingBalance: expectedClosing,
            variance: 0,
            cashSessions: [],
        };
    },
    async getDashboardStats(branchId) {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
        const targetBranchId = (branchId && branchId !== 'all') ? branchId : undefined;
        // 1. Sales & Profit MTD
        const profitData = await this.getProfit(branchId, startOfMonth, endOfMonth);
        // Get staff IDs in this branch for orders/repairs filtering
        const userWhere = {};
        if (targetBranchId)
            userWhere.branchId = targetBranchId;
        const staffIds = (await client_1.default.user.findMany({ where: userWhere, select: { id: true } })).map(u => u.id);
        const mtdOrders = await client_1.default.order.aggregate({
            where: {
                status: 'COMPLETED',
                createdAt: { gte: new Date(startOfMonth + 'T00:00:00.000Z') },
                staffId: { in: staffIds }
            },
            _sum: { totalAmount: true }
        });
        const salesMtd = mtdOrders._sum.totalAmount || 0;
        // 2. GST Liabilities (Proxy: Unpaid purchases)
        const unpaidPurchases = await client_1.default.purchase.aggregate({
            where: {
                ...(targetBranchId && { branchId: targetBranchId })
            },
            _sum: { totalAmount: true, paidAmount: true }
        });
        const liabilities = (unpaidPurchases._sum.totalAmount || 0) - (unpaidPurchases._sum.paidAmount || 0);
        // 3. Stock Valuation & Breakdown
        const stockValuation = await inventory_service_1.inventoryService.getStockValuation('category', targetBranchId);
        // 4. Critical Low Stock
        const lowStockRaw = await inventory_service_1.inventoryService.getLowStockProducts(targetBranchId);
        const lowStock = lowStockRaw.slice(0, 5).map((p) => ({
            id: p.id,
            name: p.name,
            stockQty: p.stockQty,
            minStock: p.minStock
        }));
        // 5. Supplier Orders (Recent SENT or PARTIALLY_RECEIVED)
        const supplierOrdersRaw = await client_1.default.purchaseOrder.findMany({
            where: {
                status: { in: ['SENT', 'PARTIALLY_RECEIVED'] },
                ...(targetBranchId && { branchId: targetBranchId })
            },
            include: { supplier: { select: { name: true } } },
            orderBy: { createdAt: 'desc' },
            take: 5
        });
        const supplierOrders = supplierOrdersRaw.map(po => ({
            id: po.id,
            supplierName: po.supplier.name,
            status: po.status
        }));
        // 6. User Controls
        const usersRaw = await client_1.default.user.findMany({
            where: {
                role: { in: ['MANAGER', 'ADMIN'] },
                ...(targetBranchId && { branchId: targetBranchId })
            },
            include: { branch: { select: { name: true } } },
            take: 5
        });
        const users = usersRaw.map(u => ({
            id: u.id,
            name: u.name,
            role: u.role,
            branchName: u.branch?.name || 'Global',
            initials: u.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        }));
        // 7. Technician Performance (MTD completed repairs)
        const repairsMTD = await client_1.default.repairJob.findMany({
            where: {
                status: { in: ['COMPLETED', 'DELIVERED'] },
                createdAt: { gte: new Date(startOfMonth + 'T00:00:00.000Z') },
                assignedToId: { in: staffIds }
            },
            include: { repairCategory: true }
        });
        const techDataMap = {};
        for (const r of repairsMTD) {
            const catName = r.repairCategory?.name?.toUpperCase() || 'GENERAL';
            techDataMap[catName] = (techDataMap[catName] || 0) + 1;
        }
        let technicianPerformance = Object.entries(techDataMap).map(([name, value]) => ({ name, value }));
        if (technicianPerformance.length === 0) {
            technicianPerformance = [
                { name: 'REPAIRS', value: 0 },
                { name: 'SOFTWARE', value: 0 },
                { name: 'HARDWARE', value: 0 },
                { name: 'EXCHANGE', value: 0 }
            ];
        }
        return {
            salesMtd,
            profitMtd: profitData.totalProfit,
            liabilities,
            stockValuation,
            lowStock,
            supplierOrders,
            users,
            technicianPerformance
        };
    }
};
exports.managerService = managerService;
//# sourceMappingURL=manager.service.js.map