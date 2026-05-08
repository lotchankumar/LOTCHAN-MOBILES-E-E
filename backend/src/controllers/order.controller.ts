import { Request, Response } from 'express';
import { orderService } from '../services/order.service';
import { OrderType, PaymentMethod } from '@prisma/client';
import prisma from '../prisma/client';
import { auditLogService } from '../services/auditLog.service';

export const orderController = {
  async createOrder(req: Request, res: Response) {
    try {
      const { customerId, items, orderType, paymentMethod, staffId } = req.body;
      
      // If customer is creating, force customerId to be their own
      const user = (req as any).user;
      const finalCustomerId = user && user.role === 'CUSTOMER' ? user.id : customerId;
      
      const order = await orderService.createOrder({
        customerId: finalCustomerId,
        items,
        orderType: orderType as OrderType,
        paymentMethod: paymentMethod as PaymentMethod,
        staffId,
        branchId: req.body.branchId || user?.branchId
      });

      // Log order creation
      auditLogService.logAction({
        userId: user?.id,
        action: 'ORDER_CREATED',
        entity: 'Order',
        entityId: order.id,
        details: JSON.stringify({ orderNumber: order.orderNumber, totalAmount: order.totalAmount, paymentMethod }),
        branchId: req.body.branchId || user?.branchId,
        ipAddress: req.ip,
      });
      
      res.status(201).json(order);
    } catch (error: any) {
      if (error.message && error.message.includes('Insufficient stock')) {
        return res.status(400).json({ error: error.message });
      }
      console.error('Order creation failed:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  },

  async getOrders(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const isCustomer = user && user.role === 'CUSTOMER';
      
      // Role-based base filter
      let roleWhere: any = {};
      if (isCustomer) {
        roleWhere = { customerId: user.id };
      } else if (user.role === 'MANAGER' && user.branchId) {
        roleWhere = { staff: { branchId: user.branchId } };
      }

      // Parse query filters
      const {
        dateFrom, dateTo, status, customerName, staffName, 
        paymentMethod, minTotal, maxTotal, page = '0', limit = '50'
      } = req.query;

      const skip = parseInt(page as string) * parseInt(limit as string);
      const take = parseInt(limit as string);

      const filterWhere: any = {};

      // Date range
      if (dateFrom) {
        filterWhere.createdAt = { ...filterWhere.createdAt, gte: new Date(dateFrom as string) };
      }
      if (dateTo) {
        filterWhere.createdAt = { ...filterWhere.createdAt, lte: new Date((dateTo as string) + 'T23:59:59.999Z') };
      }

      // Status
      if (status) {
        filterWhere.status = { in: (status as string).split(',') };
      }

      // Numeric total
      if (minTotal) {
        filterWhere.totalAmount = { ...filterWhere.totalAmount, gte: parseFloat(minTotal as string) };
      }
      if (maxTotal) {
        filterWhere.totalAmount = { ...filterWhere.totalAmount, lte: parseFloat(maxTotal as string) };
      }

      // Payment method
      if (paymentMethod) {
        filterWhere.paymentMethod = paymentMethod as string;
      }

      // Search OR conditions
      const searchOr: any[] = [];
      if (customerName) {
        searchOr.push({ customer: { name: { contains: (customerName as string), mode: 'insensitive' } } });
      }
      if (staffName) {
        searchOr.push({ staff: { name: { contains: (staffName as string), mode: 'insensitive' } } });
      }

      // Combine
      const whereClause: any = {
        AND: [
          roleWhere,
          filterWhere,
          ...(searchOr.length > 0 ? [{ OR: searchOr }] : [])
        ].filter(Boolean)
      };

      const orders = await prisma.order.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        include: { 
          items: true, 
          customer: true,
          staff: { 
            select: { name: true, branch: { select: { name: true } } } 
          }
        }
      });

      // Get total count for pagination
      const total = await prisma.order.count({ where: whereClause });

      res.json({ data: orders, pagination: { page: parseInt(page as string), limit: take, total, pages: Math.ceil(total / take) } });
    } catch (error: any) {
      console.error('Get orders error:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  },

  async getOrderById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const user = (req as any).user;
      const isCustomer = user && user.role === 'CUSTOMER';
      
      const order = await prisma.order.findUnique({
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
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  },

  async updateOrderStatus(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { status } = req.body;
      const user = (req as any).user;
      const order = await prisma.order.update({
        where: { id },
        data: { status }
      });

      // Log status update
      auditLogService.logAction({
        userId: user?.id,
        action: 'ORDER_STATUS_UPDATED',
        entity: 'Order',
        entityId: id,
        details: JSON.stringify({ orderNumber: order.orderNumber, newStatus: status }),
        branchId: user?.branchId,
        ipAddress: req.ip,
      });

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update order status' });
    }
  }
};
