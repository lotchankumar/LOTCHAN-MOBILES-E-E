"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const client_1 = require("@prisma/client");
const inventory_service_1 = require("./inventory.service");
const queue_service_1 = require("./queue.service");
const client_2 = __importDefault(require("../prisma/client"));
exports.orderService = {
    async createOrder(data) {
        return client_2.default.$transaction(async (tx) => {
            // 1. Calculate total and verify stock
            let totalAmount = 0;
            const productUpdates = [];
            for (const item of data.items) {
                const branchStock = await tx.branchStock.findUnique({
                    where: { branchId_productId: { branchId: data.branchId, productId: item.productId } },
                    include: { product: true }
                });
                if (!branchStock || branchStock.stockQty < item.quantity) {
                    throw new Error(`Insufficient stock for product ${branchStock?.product?.name || item.productId} in this branch`);
                }
                totalAmount += branchStock.product.price * item.quantity;
                productUpdates.push({
                    ...item,
                    unitPrice: branchStock.product.price
                });
            }
            // 2. Generate order number
            const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            // 3. Create order
            const order = await tx.order.create({
                data: {
                    orderNumber,
                    customerId: data.customerId,
                    orderType: data.orderType,
                    status: client_1.OrderStatus.PENDING,
                    totalAmount,
                    paymentMethod: data.paymentMethod,
                    paymentStatus: data.paymentMethod === 'CASH' ? client_1.PaymentStatus.PAID : client_1.PaymentStatus.PENDING,
                    staffId: data.staffId,
                    branchId: data.branchId,
                    items: {
                        create: productUpdates.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice
                        }))
                    }
                },
                include: { items: true, customer: true }
            });
            // 4. Decrement stock for each item (atomic within transaction)
            for (const item of productUpdates) {
                await inventory_service_1.inventoryService.decrementStock(tx, item.productId, item.quantity, data.branchId);
            }
            // 5. Queue async notifications (non-blocking)
            await queue_service_1.queueService.addJob('sendOrderConfirmation', {
                orderId: order.id,
                customerEmail: order.customer.email,
                customerPhone: order.customer.phone,
                orderNumber: order.orderNumber
            });
            return order;
        });
    }
};
//# sourceMappingURL=order.service.js.map