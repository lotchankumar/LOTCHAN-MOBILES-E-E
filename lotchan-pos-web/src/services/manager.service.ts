import { api } from './api';

const extractResponseData = <T>(response: any): T => {
  return response?.data?.data ?? response?.data;
};

export interface ProfitData {
  categoryProfit: {
    MOBILE: number;
    ACCESSORY: number;
    SIM_CARD: number;
    REPAIRS: number;
  };
  totalProfit: number;
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export interface CashflowData {
  date: string;
  openingBalance: number;
  cashInflows: {
    sales: number;
    total: number;
  };
  cashOutflows: {
    purchases: number;
    expenses: number;
    total: number;
  };
  expectedClosingBalance: number;
  actualClosingBalance: number;
  variance: number;
  cashSessions: Array<{
    id: string;
    staffId: string;
    openingBalance: number;
    closingBalance: number | null;
    notes: string | null;
  }>;
}

export interface ProductInventory {
  id: string;
  category: string;
  categoryId?: string;
  categoryName?: string;
  brand: string;
  model: string;
  sku: string;
  costPrice: number;
  sellingPrice: number;
  stockQuantity: number;
  reorderLevel: number | null;
  createdAt: string;
  needsReorder: boolean;
  supplier?: { id: string; name: string };
  supplierId?: string;
  supplierName?: string;
}

export interface PurchaseItem {
  productId: string;
  quantity: number;
  unitCost: number;
  isNewProduct?: boolean;
  sku?: string;
  name?: string;
  brand?: string;
  model?: string;
  category?: string;
  categoryId?: string;
  sellingPrice?: number;
}

export interface CreatePurchaseRequest {
  managerId: string;
  supplier: string;
  supplierId?: string;
  invoiceNo: string;
  paidAmount?: number;
  notes?: string;
  items: PurchaseItem[];
  spareItems?: RepairSparePurchaseItem[];
}

export interface Supplier {
  id: string;
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  creditBalance: number;
  totalPaid: number;
}

export interface RecordSupplierPaymentRequest {
  supplierId: string;
  amount: number;
  paymentType: 'CREDIT' | 'DEBIT';
  reference?: string;
  description?: string;
}

export interface CreateSupplierRequest {
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface Purchase {
  id: string;
  managerId: string;
  supplier: string;
  invoiceNo: string;
  totalAmount: number;
  purchaseDate: string;
  items: Array<{
    id: string;
    productId: string;
    quantity: number;
    unitCost: number;
    total: number;
    product: {
      id: string;
      brand: string;
      model: string;
      sku: string;
    };
  }>;
}

export interface CreateExpenseRequest {
  managerId: string;
  description: string;
  amount: number;
}

export interface Expense {
  id: string;
  managerId: string;
  description: string;
  amount: number;
  expenseDate: string;
}


export interface ProductUpdateRequest {
  costPrice?: number;
  sellingPrice?: number;
  reorderLevel?: number;
  supplierId?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface CreateProductRequest {
  sku: string;
  name: string;
  brand: string;
  model?: string;
  category: 'MOBILE' | 'ACCESSORY' | 'SIM_CARD';
  categoryId?: string;
  supplierId?: string;
  price: number;
  cost: number;
  stockQty?: number;
  minStock?: number;
}

// --- Repair Spare Parts Interfaces ---

export interface RepairSpareProduct {
  id: string;
  name: string;
  sku: string;
  description?: string;
  categoryId?: string;
  supplierId?: string;
  brand: string;
  model?: string;
  compatibleDevices?: string;
  purchasePrice: number;
  sellingPrice: number;
  stockQty: number;
  minStock: number;
  imageUrl?: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  supplier?: { id: string; name: string };
}

export interface CreateRepairSpareProductRequest {
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
}

export interface RepairSparePurchaseItem {
  id?: string;
  spareProductId: string;
  quantity: number;
  unitCost: number;
  sellingPrice?: number;
  total?: number;
  spareProduct?: {
    name: string;
    sku: string;
  };
}

export interface RepairSparePurchase {
  id: string;
  managerId: string;
  supplier: string;
  invoiceNo: string;
  totalAmount: number;
  notes?: string;
  purchaseDate: string;
  createdAt: string;
  items: RepairSparePurchaseItem[];
}

export interface CreateRepairSparePurchaseRequest {
  managerId: string;
  supplier: string;
  invoiceNo: string;
  notes?: string;
  items: RepairSparePurchaseItem[];
}

export const managerService = {
  // Dashboard Stats
  async getDashboardStats(branchId?: string): Promise<any> {
    try {
      const response = await api.get('/admin/dashboard-stats', {
        params: { ...(branchId && { branchId }) }
      });
      return extractResponseData(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard stats');
    }
  },

  // Profit
  async getProfit(startDate: string, endDate: string, branchId?: string): Promise<ProfitData> {
    try {
      const response = await api.get('/admin/manager/profit', {
        params: { startDate, endDate, ...(branchId && { branchId }) }
      });
      return extractResponseData<ProfitData>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profit data');
    }
  },

  // Cashflow
  async getDailyCashflow(date: string, branchId?: string): Promise<CashflowData> {
    try {
      const response = await api.get('/admin/daily-cashflow', {
        params: { date, ...(branchId && { branchId }) }
      });
      return extractResponseData<CashflowData>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cashflow data');
    }
  },

  // Inventory
  async getInventory(): Promise<ProductInventory[]> {
    try {
      const response = await api.get('/admin/inventory');
      return extractResponseData<ProductInventory[]>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch inventory');
    }
  },

  // Update product
  async updateProduct(productId: string, data: ProductUpdateRequest) {
    try {
      const response = await api.patch(`/admin/products/${productId}`, data);
      return extractResponseData(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update product');
    }
  },

  // Create product
  async createProduct(data: CreateProductRequest): Promise<ProductInventory> {
    try {
      const response = await api.post('/admin/products', data);
      return extractResponseData<ProductInventory>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create product');
    }
  },

  // Low stock
  async getLowStock(): Promise<ProductInventory[]> {
    try {
      const response = await api.get('/admin/low-stock');
      return extractResponseData<ProductInventory[]>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch low stock products');
    }
  },

  // Categories
  async getCategories(): Promise<ProductCategory[]> {
    try {
      const response = await api.get('/admin/categories');
      return extractResponseData<ProductCategory[]>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },

  async createCategory(data: CreateCategoryRequest): Promise<ProductCategory> {
    try {
      const response = await api.post('/admin/categories', data);
      return extractResponseData<ProductCategory>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create category');
    }
  },

  // Suppliers
  async getSuppliers(): Promise<Supplier[]> {
    try {
      const response = await api.get('/admin/suppliers');
      return extractResponseData<Supplier[]>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch suppliers');
    }
  },

  async createSupplier(supplierData: CreateSupplierRequest): Promise<Supplier> {
    try {
      const response = await api.post('/admin/suppliers', supplierData);
      return extractResponseData<Supplier>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create supplier');
    }
  },

  async updateSupplier(id: string, supplierData: Partial<CreateSupplierRequest>): Promise<Supplier> {
    try {
      const response = await api.patch(`/admin/suppliers/${id}`, supplierData);
      return extractResponseData<Supplier>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update supplier');
    }
  },

  async recordSupplierPayment(data: RecordSupplierPaymentRequest) {
    try {
      const response = await api.post('/admin/suppliers/payments', data);
      return extractResponseData(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to record supplier payment');
    }
  },

  // Purchases
  async createPurchase(purchaseData: CreatePurchaseRequest) {
    try {
      const response = await api.post('/admin/purchases', purchaseData);
      return extractResponseData(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create purchase');
    }
  },

  async getPurchases(): Promise<Purchase[]> {
    try {
      const response = await api.get('/admin/purchases');
      return extractResponseData<Purchase[]>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch purchases');
    }
  },

  // Expenses
  async createExpense(expenseData: CreateExpenseRequest) {
    try {
      const response = await api.post('/admin/expenses', expenseData);
      return extractResponseData(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create expense');
    }
  },

  async getExpenses(): Promise<Expense[]> {
    try {
      const response = await api.get('/admin/expenses');
      return extractResponseData<Expense[]>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch expenses');
    }
  },

  // Repair Spare Products
  async getRepairSpareProducts(): Promise<RepairSpareProduct[]> {
    try {
      const response = await api.get('/admin/repair-spare-products');
      return extractResponseData<RepairSpareProduct[]>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch repair spare products');
    }
  },

  async createRepairSpareProduct(data: CreateRepairSpareProductRequest): Promise<RepairSpareProduct> {
    try {
      const response = await api.post('/admin/repair-spare-products', data);
      return extractResponseData<RepairSpareProduct>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create repair spare product');
    }
  },

  async updateRepairSpareProduct(id: string, data: Partial<CreateRepairSpareProductRequest>): Promise<RepairSpareProduct> {
    try {
      const response = await api.patch(`/admin/repair-spare-products/${id}`, data);
      return extractResponseData<RepairSpareProduct>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update repair spare product');
    }
  },

  async deleteRepairSpareProduct(id: string): Promise<void> {
    try {
      await api.delete(`/admin/repair-spare-products/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete repair spare product');
    }
  },

  // Repair Spare Purchases
  async getRepairSparePurchases(): Promise<RepairSparePurchase[]> {
    try {
      const response = await api.get('/admin/repair-spare-purchases');
      return extractResponseData<RepairSparePurchase[]>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch repair spare purchases');
    }
  },

  async createRepairSparePurchase(data: CreateRepairSparePurchaseRequest): Promise<RepairSparePurchase> {
    try {
      const response = await api.post('/admin/repair-spare-purchases', data);
      return extractResponseData<RepairSparePurchase>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create repair spare purchase');
    }
  },

};