import { OrderType, PaymentMethod, OrderStatus, PaymentStatus } from '@prisma/client';
import { inventoryService } from './inventory.service';
import { queueService } from './queue.service';
import prisma from '../prisma/client';

export const orderService = {
  async createOrder(data: {
    customerId: string;
    items: Array<{ productId: string; quantity: number }>;
    orderType: OrderType;
    paymentMethod: PaymentMethod;
    staffId?: string;
  }) {
    return prisma.$transaction(async (tx) => {
      // 1. Calculate total and verify stock
      let totalAmount = 0;
      const productUpdates = [];

      for (const item of data.items) {
        const product = await tx.product.findUniqueOrThrow({
          where: { id: item.productId }
        });
        
        if (product.stockQty < item.quantity) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }
        
        totalAmount += product.price * item.quantity;
        productUpdates.push({
          ...item,
          unitPrice: product.price
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
          status: OrderStatus.PENDING,
          totalAmount,
          paymentMethod: data.paymentMethod,
          paymentStatus: data.paymentMethod === 'CASH' ? PaymentStatus.PAID : PaymentStatus.PENDING,
          staffId: data.staffId,
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
        await inventoryService.decrementStock(tx, item.productId, item.quantity);
      }

      // 5. Queue async notifications (non-blocking)
      await queueService.addJob('sendOrderConfirmation', {
        orderId: order.id,
        customerEmail: order.customer.email,
        customerPhone: order.customer.phone,
        orderNumber: order.orderNumber
      });

      return order;
    });
  }
};
