"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("../services/order.service");
const client_1 = __importDefault(require("../prisma/client"));
exports.orderController = {
    async createOrder(req, res) {
        try {
            const { customerId, items, orderType, paymentMethod, staffId } = req.body;
            // If customer is creating, force customerId to be their own
            const user = req.user;
            const finalCustomerId = user && user.role === 'CUSTOMER' ? user.id : customerId;
            const order = await order_service_1.orderService.createOrder({
                customerId: finalCustomerId,
                items,
                orderType: orderType,
                paymentMethod: paymentMethod,
                staffId
            });
            res.status(201).json(order);
        }
        catch (error) {
            if (error.message && error.message.includes('Insufficient stock')) {
                return res.status(400).json({ error: error.message });
            }
            console.error('Order creation failed:', error);
            res.status(500).json({ error: 'Failed to create order' });
        }
    },
    async getOrders(req, res) {
        try {
            const user = req.user;
            const isCustomer = user && user.role === 'CUSTOMER';
            const whereClause = isCustomer
                ? { customerId: user.id }
                : user.role === 'MANAGER' && user.branchId
                    ? { staff: { branchId: user.branchId } }
                    : {};
            const orders = await client_1.default.order.findMany({
                where: whereClause,
                orderBy: { createdAt: 'desc' },
                include: {
                    items: true,
                    customer: true,
                    staff: {
                        select: { name: true, branch: { select: { name: true } } }
                    }
                }
            });
            res.json(orders);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch orders' });
        }
    },
    async getOrderById(req, res) {
        try {
            const id = req.params.id;
            const user = req.user;
            const isCustomer = user && user.role === 'CUSTOMER';
            const order = await client_1.default.order.findUnique({
                where: { id },
                include: { items: true, customer: true }
            });
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            // Prevent customer from viewing someone else's order
            if (isCustomer && order.customerId !== user.id) {
                return res.status(403).json({ error: 'Forbidden' });
            }
            res.json(order);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch order' });
        }
    },
    async updateOrderStatus(req, res) {
        try {
            const id = req.params.id;
            const { status } = req.body;
            const order = await client_1.default.order.update({
                where: { id },
                data: { status }
            });
            res.json(order);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to update order status' });
        }
    }
};
//# sourceMappingURL=order.controller.js.map