export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'STAFF' | 'CUSTOMER';
  branchId?: string;
  isActive: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  items: Array<{
    id: string;
    productId: string;
    quantity: number;
    unitPrice: number;
  }>;
  staff?: {
    name: string;
    branch: {
      name: string;
    };
  };
}

export interface CashflowData {
  date: string;
  salesAmount: number;
  salesCount: number;
  repairAmount: number;
  repairCount: number;
  mtDeposits: number;
  totalIncome: number;
  netCashflow: number;
}

export interface PurchaseItemFrontend {
  productId: string;
  quantity: number;
  unitCost: number;
  sellingPrice?: number;
}

export interface Purchase {
  id: string;
  supplier: string;
  invoiceNo: string;
  totalAmount: number;
  items: Array<{
    product: {
      id: string;
      brand: string;
      model: string;
      sku: string;
      category?: string;
      categoryId?: string;
    };
    quantity: number;
    unitCost: number;
    sellingPrice?: number;
    total: number;
  }>;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  isActive: boolean;
  productCount: number;
  creditBalance?: number;
}

export interface SupplierPayment {
  id: string;
  supplierId: string;
  amount: number;
  paymentType: 'CREDIT' | 'DEBIT';
  reference?: string;
  description?: string;
  paymentDate: string;
  createdAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface InventoryProduct {
  id: string;
  category: string;
  categoryId?: string;
  categoryName?: string;
  supplierId?: string;
  supplierName?: string;
  brand: string;
  model: string;
  sku: string;
  costPrice: number;
  sellingPrice: number;
  stockQuantity: number;
  reorderLevel?: number;
  needsReorder: boolean;
  createdAt: string;
}

// ===== Repair Spare Types =====

export interface RepairSpareProduct {
  id: string;
  name: string;
  sku: string;
  description?: string;
  categoryId?: string;
  categoryName?: string;
  supplierId?: string;
  supplierName?: string;
  brand: string;
  model?: string;
  compatibleDevices?: string;
  purchasePrice: number;
  sellingPrice: number;
  stockQuantity: number;
  minStock?: number;
  needsReorder?: boolean;
  isAvailable: boolean;
  imageUrl?: string;
  createdAt: string;
}

export interface RepairSparePurchaseItem {
  spareProductId: string;
  quantity: number;
  unitCost: number;
  sellingPrice?: number;
  total?: number;
  spareProduct?: RepairSpareProduct;
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
  items: Array<{
    id: string;
    spareProductId: string;
    quantity: number;
    unitCost: number;
    sellingPrice?: number;
    total: number;
    spareProduct?: RepairSpareProduct;
  }>;
  manager?: { id: string; name: string };
}

export interface MTDeposit {
  id: string;
  managerId: string;
  provider: string;
  amount: number;
  reference: string;
  depositDate: string;
  createdAt: string;
  manager?: { id: string; name: string };
}
