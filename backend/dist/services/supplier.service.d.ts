export interface CreateSupplierData {
    name: string;
    contactName?: string;
    email?: string;
    phone?: string;
    address?: string;
    notes?: string;
}
export interface UpdateSupplierData {
    name?: string;
    contactName?: string;
    email?: string;
    phone?: string;
    address?: string;
    notes?: string;
    isActive?: boolean;
}
export interface CreatePaymentData {
    supplierId: string;
    amount: number;
    paymentType: 'CREDIT' | 'DEBIT';
    reference?: string;
    description?: string;
    paymentDate?: string;
}
export declare const supplierService: {
    getAllSuppliers(): Promise<{
        totalPaid: number;
        _count: {
            products: number;
        };
        payments: {
            amount: number;
        }[];
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
    }[]>;
    getSupplierById(id: string): Promise<{
        productCount: number;
        totalPaid: number;
        products: {
            name: string;
            id: string;
            sku: string;
            stockQty: number;
        }[];
        payments: {
            id: string;
            createdAt: Date;
            description: string | null;
            paymentType: string;
            supplierId: string;
            amount: number;
            reference: string | null;
            paymentDate: Date;
        }[];
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
    }>;
    createSupplier(data: CreateSupplierData): Promise<{
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
    }>;
    updateSupplier(id: string, data: UpdateSupplierData): Promise<{
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
    }>;
    deleteSupplier(id: string): Promise<{
        success: boolean;
    }>;
    getPayments(supplierId: string): Promise<any>;
    recordPayment(data: CreatePaymentData): Promise<any>;
    getSupplierWithBalance(id: string): Promise<{
        productCount: number;
        purchaseCount: number;
        totalPaid: number;
        payments: {
            id: string;
            createdAt: Date;
            description: string | null;
            paymentType: string;
            supplierId: string;
            amount: number;
            reference: string | null;
            paymentDate: Date;
        }[];
        _count: {
            purchases: number;
            products: number;
        };
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
    }>;
};
//# sourceMappingURL=supplier.service.d.ts.map