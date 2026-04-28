import { Prisma } from '@prisma/client';
export interface CreateProductData {
    sku: string;
    name: string;
    description?: string | null;
    category: 'MOBILE' | 'ACCESSORY' | 'SIM_CARD';
    categoryId?: string | null;
    supplierId?: string | null;
    brand: string;
    model?: string | null;
    price: number;
    cost: number;
    stockQty?: number;
    minStock?: number;
    imageUrl?: string | null;
}
export interface UpdateProductData {
    sku?: string;
    name?: string;
    description?: string | null;
    category?: 'MOBILE' | 'ACCESSORY' | 'SIM_CARD';
    categoryId?: string | null;
    supplierId?: string | null;
    brand?: string;
    model?: string | null;
    price?: number;
    cost?: number;
    stockQty?: number;
    minStock?: number;
    imageUrl?: string | null;
    isAvailable?: boolean;
}
export interface ProductFilters {
    category?: string;
    categoryId?: string;
    supplierId?: string;
    search?: string;
    lowStock?: boolean;
}
export type MovementType = 'SALE' | 'REPAIR_USE' | 'PURCHASE_RECEIVE' | 'MANUAL_ADJUSTMENT' | 'RETURN';
interface LogMovementArgs {
    productId: string;
    quantity: number;
    type: MovementType;
    reference?: string | null;
    purchaseOrderId?: string | null;
    userId?: string | null;
}
declare function logMovement(tx: Prisma.TransactionClient, args: LogMovementArgs): Promise<any>;
declare function checkStock(productId: string, quantity: number): Promise<boolean>;
declare function decrementStock(tx: Prisma.TransactionClient, productId: string, quantity: number, opts?: {
    type?: MovementType;
    reference?: string | null;
    userId?: string | null;
}): Promise<{
    success: boolean;
    updatedProduct: any;
}>;
declare function incrementStock(tx: Prisma.TransactionClient, productId: string, quantity: number, opts?: {
    type?: MovementType;
    reference?: string | null;
    purchaseOrderId?: string | null;
    userId?: string | null;
}): Promise<void>;
declare function adjustStock(productId: string, quantity: number, reason: string, userId?: string | null): Promise<{
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    supplierId: string | null;
    sku: string;
    category: import("@prisma/client").$Enums.Category;
    categoryId: string | null;
    brand: string;
    model: string | null;
    price: number;
    cost: number;
    stockQty: number;
    minStock: number;
    imageUrl: string | null;
    isAvailable: boolean;
}>;
declare function getLowStockProducts(): Promise<({
    supplier: {
        name: string;
        id: string;
        email: string | null;
        phone: string | null;
    } | null;
    categoryType: {
        [x: string]: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            supplierId: string | null;
            sku: string;
            category: import("@prisma/client").$Enums.Category;
            categoryId: string | null;
            brand: string;
            model: string | null;
            price: number;
            cost: number;
            stockQty: number;
            minStock: number;
            imageUrl: string | null;
            isAvailable: boolean;
        }[] | ({
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            supplierId: string | null;
            sku: string;
            category: import("@prisma/client").$Enums.Category;
            categoryId: string | null;
            brand: string;
            model: string | null;
            price: number;
            cost: number;
            stockQty: number;
            minStock: number;
            imageUrl: string | null;
            isAvailable: boolean;
        } | {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            supplierId: string | null;
            sku: string;
            category: import("@prisma/client").$Enums.Category;
            categoryId: string | null;
            brand: string;
            model: string | null;
            price: number;
            cost: number;
            stockQty: number;
            minStock: number;
            imageUrl: string | null;
            isAvailable: boolean;
        })[] | ({
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            supplierId: string | null;
            sku: string;
            categoryId: string | null;
            brand: string;
            model: string | null;
            stockQty: number;
            minStock: number;
            imageUrl: string | null;
            isAvailable: boolean;
            sellingPrice: number;
            compatibleDevices: string | null;
            purchasePrice: number;
        } | {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            supplierId: string | null;
            sku: string;
            categoryId: string | null;
            brand: string;
            model: string | null;
            stockQty: number;
            minStock: number;
            imageUrl: string | null;
            isAvailable: boolean;
            sellingPrice: number;
            compatibleDevices: string | null;
            purchasePrice: number;
        })[] | {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            supplierId: string | null;
            sku: string;
            categoryId: string | null;
            brand: string;
            model: string | null;
            stockQty: number;
            minStock: number;
            imageUrl: string | null;
            isAvailable: boolean;
            sellingPrice: number;
            compatibleDevices: string | null;
            purchasePrice: number;
        }[];
        [x: number]: never;
        [x: symbol]: never;
    } | null;
} & {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    supplierId: string | null;
    sku: string;
    category: import("@prisma/client").$Enums.Category;
    categoryId: string | null;
    brand: string;
    model: string | null;
    price: number;
    cost: number;
    stockQty: number;
    minStock: number;
    imageUrl: string | null;
    isAvailable: boolean;
})[]>;
declare function getReorderSuggestions(): Promise<{
    supplier: any;
    products: any[];
}[]>;
declare function getStockValuation(groupBy?: 'category'): Promise<{
    totalValue: any;
    totalUnits: any;
    byCategory: {
        categoryId: string | null;
        name: string;
        value: number;
        units: number;
    }[];
} | {
    totalValue: any;
    totalUnits: any;
    byCategory?: undefined;
}>;
declare function getProducts(filters?: ProductFilters): Promise<any[]>;
declare function getProductById(id: string): Promise<{
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
    } | null;
    categoryType: {
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
        slug: string;
        icon: string | null;
        displayOrder: number;
    } | null;
} & {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    supplierId: string | null;
    sku: string;
    category: import("@prisma/client").$Enums.Category;
    categoryId: string | null;
    brand: string;
    model: string | null;
    price: number;
    cost: number;
    stockQty: number;
    minStock: number;
    imageUrl: string | null;
    isAvailable: boolean;
}>;
declare function createProduct(data: CreateProductData): Promise<{
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    supplierId: string | null;
    sku: string;
    category: import("@prisma/client").$Enums.Category;
    categoryId: string | null;
    brand: string;
    model: string | null;
    price: number;
    cost: number;
    stockQty: number;
    minStock: number;
    imageUrl: string | null;
    isAvailable: boolean;
}>;
declare function updateProduct(id: string, data: UpdateProductData): Promise<{
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    supplierId: string | null;
    sku: string;
    category: import("@prisma/client").$Enums.Category;
    categoryId: string | null;
    brand: string;
    model: string | null;
    price: number;
    cost: number;
    stockQty: number;
    minStock: number;
    imageUrl: string | null;
    isAvailable: boolean;
}>;
declare function deleteProduct(id: string): Promise<void>;
declare function getCategories(): Promise<({
    _count: {
        products: number;
    };
} & {
    name: string;
    id: string;
    createdAt: Date;
    description: string | null;
    slug: string;
    icon: string | null;
    displayOrder: number;
})[]>;
declare function createCategory(data: any): Promise<{
    name: string;
    id: string;
    createdAt: Date;
    description: string | null;
    slug: string;
    icon: string | null;
    displayOrder: number;
}>;
declare function updateCategory(id: string, data: any): Promise<{
    name: string;
    id: string;
    createdAt: Date;
    description: string | null;
    slug: string;
    icon: string | null;
    displayOrder: number;
}>;
export declare const inventoryService: {
    checkStock: typeof checkStock;
    decrementStock: typeof decrementStock;
    incrementStock: typeof incrementStock;
    adjustStock: typeof adjustStock;
    logMovement: typeof logMovement;
    getLowStockProducts: typeof getLowStockProducts;
    getReorderSuggestions: typeof getReorderSuggestions;
    getStockValuation: typeof getStockValuation;
    getProducts: typeof getProducts;
    getProductById: typeof getProductById;
    createProduct: typeof createProduct;
    updateProduct: typeof updateProduct;
    deleteProduct: typeof deleteProduct;
    getCategories: typeof getCategories;
    createCategory: typeof createCategory;
    updateCategory: typeof updateCategory;
    category: {
        getAll(): Promise<({
            _count: {
                products: number;
            };
        } & {
            name: string;
            id: string;
            createdAt: Date;
            description: string | null;
            slug: string;
            icon: string | null;
            displayOrder: number;
        })[]>;
        getById(id: string): Promise<{
            _count: {
                products: number;
            };
        } & {
            name: string;
            id: string;
            createdAt: Date;
            description: string | null;
            slug: string;
            icon: string | null;
            displayOrder: number;
        }>;
        create(data: import("./category.service").CreateCategoryData): Promise<{
            name: string;
            id: string;
            createdAt: Date;
            description: string | null;
            slug: string;
            icon: string | null;
            displayOrder: number;
        }>;
        update(id: string, data: import("./category.service").UpdateCategoryData): Promise<{
            name: string;
            id: string;
            createdAt: Date;
            description: string | null;
            slug: string;
            icon: string | null;
            displayOrder: number;
        }>;
        delete(id: string): Promise<{
            success: boolean;
        }>;
    };
    supplier: {
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
        createSupplier(data: import("./supplier.service").CreateSupplierData): Promise<{
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
        updateSupplier(id: string, data: import("./supplier.service").UpdateSupplierData): Promise<{
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
        recordPayment(data: import("./supplier.service").CreatePaymentData): Promise<any>;
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
};
export {};
//# sourceMappingURL=inventory.service.d.ts.map