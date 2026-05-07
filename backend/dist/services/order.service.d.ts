import { OrderType, PaymentMethod } from '@prisma/client';
export declare const orderService: {
    createOrder(data: {
        customerId: string;
        items: Array<{
            productId: string;
            quantity: number;
        }>;
        orderType: OrderType;
        paymentMethod: PaymentMethod;
        staffId?: string;
        branchId: string;
    }): Promise<{
        customer: {
            name: string;
            id: string;
            email: string;
            passwordHash: string | null;
            createdAt: Date;
            phone: string;
            address: string | null;
            walletBalance: number;
            referralCode: string;
            referredById: string | null;
            updatedAt: Date;
        };
        items: never;
    } & {
        id: string;
        branchId: string;
        createdAt: Date;
        updatedAt: Date;
        orderNumber: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        orderType: import(".prisma/client").$Enums.OrderType;
        totalAmount: number;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        customerId: string;
        staffId: string | null;
    }>;
};
//# sourceMappingURL=order.service.d.ts.map