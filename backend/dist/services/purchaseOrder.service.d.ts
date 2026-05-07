interface CreatePOData {
    supplierId: string;
    branchId?: string | null;
    items: Array<{
        productId: string;
        quantity: number;
        unitCost: number;
    }>;
}
interface UpdatePOData {
    notes?: string;
    status?: string;
}
export declare const purchaseOrderService: {
    getAll(filters?: {
        status?: string;
        supplierId?: string;
        branchId?: string;
    }): Promise<({
        branch: {
            name: string;
            id: string;
        } | null;
        supplier: {
            name: string;
            id: string;
        };
        requestedBy: {
            name: string;
            id: string;
        };
        items: ({
            product: {
                name: string;
                id: string;
                sku: string;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            unitCost: number;
            receivedQty: number;
            purchaseOrderId: string;
        })[];
    } & {
        id: string;
        branchId: string | null;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        supplierId: string;
        orderNumber: string;
        requestedById: string;
        status: import(".prisma/client").$Enums.POStatus;
        totalCost: number;
        receivedAt: Date | null;
    })[]>;
    getById(id: string): Promise<{
        branch: {
            name: string;
            id: string;
        } | null;
        stockMovements: {
            id: string;
            branchId: string;
            createdAt: Date;
            type: import(".prisma/client").$Enums.MovementType;
            reference: string | null;
            productId: string;
            quantity: number;
            purchaseOrderId: string | null;
            userId: string | null;
        }[];
        supplier: {
            name: string;
            id: string;
            email: string | null;
            isActive: boolean;
            createdAt: Date;
            phone: string | null;
            address: string | null;
            updatedAt: Date;
            contactName: string | null;
            notes: string | null;
            creditBalance: number;
        };
        requestedBy: {
            name: string;
            id: string;
        };
        items: ({
            product: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                supplierId: string | null;
                sku: string;
                category: import(".prisma/client").$Enums.Category;
                categoryId: string | null;
                brand: string;
                model: string | null;
                price: number;
                cost: number;
                imageUrl: string | null;
                isAvailable: boolean;
                showInPosApp: boolean;
                showInCustomerApp: boolean;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            unitCost: number;
            receivedQty: number;
            purchaseOrderId: string;
        })[];
    } & {
        id: string;
        branchId: string | null;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        supplierId: string;
        orderNumber: string;
        requestedById: string;
        status: import(".prisma/client").$Enums.POStatus;
        totalCost: number;
        receivedAt: Date | null;
    }>;
    create(data: CreatePOData, userId: string): Promise<{
        supplier: {
            name: string;
            id: string;
        };
        requestedBy: {
            name: string;
            id: string;
        };
        items: ({
            product: {
                name: string;
                id: string;
                sku: string;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            unitCost: number;
            receivedQty: number;
            purchaseOrderId: string;
        })[];
    } & {
        id: string;
        branchId: string | null;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        supplierId: string;
        orderNumber: string;
        requestedById: string;
        status: import(".prisma/client").$Enums.POStatus;
        totalCost: number;
        receivedAt: Date | null;
    }>;
    update(id: string, data: UpdatePOData): Promise<{
        supplier: {
            name: string;
            id: string;
        };
        items: ({
            product: {
                name: string;
                id: string;
                sku: string;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            unitCost: number;
            receivedQty: number;
            purchaseOrderId: string;
        })[];
    } & {
        id: string;
        branchId: string | null;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        supplierId: string;
        orderNumber: string;
        requestedById: string;
        status: import(".prisma/client").$Enums.POStatus;
        totalCost: number;
        receivedAt: Date | null;
    }>;
    receive(id: string, userId: string): Promise<{
        supplier: {
            name: string;
            id: string;
        };
        items: ({
            product: {
                name: string;
                id: string;
                sku: string;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            unitCost: number;
            receivedQty: number;
            purchaseOrderId: string;
        })[];
    } & {
        id: string;
        branchId: string | null;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        supplierId: string;
        orderNumber: string;
        requestedById: string;
        status: import(".prisma/client").$Enums.POStatus;
        totalCost: number;
        receivedAt: Date | null;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
};
export {};
//# sourceMappingURL=purchaseOrder.service.d.ts.map