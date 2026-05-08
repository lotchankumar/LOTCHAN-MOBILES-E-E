export interface CreateSpareProductData {
    name: string;
    sku: string;
    description?: string;
    categoryId?: string;
    supplierId?: string;
    brand?: string;
    model?: string;
    compatibleDevices?: string;
    purchasePrice?: number;
    sellingPrice?: number;
    stockQty?: number;
    minStock?: number;
    imageUrl?: string;
    branchId?: string;
}
export interface UpdateSpareProductData {
    name?: string;
    sku?: string;
    description?: string;
    categoryId?: string;
    supplierId?: string;
    brand?: string;
    model?: string;
    compatibleDevices?: string;
    purchasePrice?: number;
    sellingPrice?: number;
    stockQty?: number;
    minStock?: number;
    imageUrl?: string;
    isAvailable?: boolean;
    branchId?: string;
}
export interface SpareProductFilters {
    categoryId?: string;
    supplierId?: string;
    search?: string;
    lowStock?: boolean;
    branchId?: string;
}
export interface SparePurchaseFilters {
    startDate?: string;
    endDate?: string;
    branchId?: string;
}
export interface CreateSparePurchaseData {
    managerId: string;
    supplier: string;
    invoiceNo: string;
    notes?: string;
    items: Array<{
        spareProductId: string;
        quantity: number;
        unitCost: number;
        sellingPrice?: number;
    }>;
    branchId: string;
}
export declare const repairSpareService: {
    getAllSpareProducts(filters?: SpareProductFilters): Promise<any>;
    getSpareProductById(id: string): Promise<any>;
    createSpareProduct(data: CreateSpareProductData): Promise<any>;
    updateSpareProduct(id: string, data: UpdateSpareProductData): Promise<any>;
    deleteSpareProduct(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllSparePurchases(filters?: SparePurchaseFilters): Promise<any>;
    getSparePurchaseById(id: string): Promise<any>;
    createSparePurchase(data: CreateSparePurchaseData): Promise<any>;
    deleteSparePurchase(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
};
//# sourceMappingURL=repairSpare.service.d.ts.map