import { api } from './api';

const extractResponseData = <T>(response: any): T => {
  return response?.data?.data ?? response?.data;
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQty: number;
  category: 'ACCESSORY' | 'MOBILE' | 'SIM_CARD';
  createdAt: string;
  updatedAt: string;
}

export interface SaleItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface CreateSaleRequest {
  items: SaleItem[];
  paymentMethod: 'CASH' | 'CARD' | 'UPI';
  totalAmount: number;
  staffId: string;
}



export interface CreateRepairRequest {
  customerName: string;
  customerPhone: string;
  deviceType: string;
  deviceModel: string;
  complaint: string;
  estimatedCost: number;
  estimatedDelivery: string;
  staffId: string;
}

export interface Repair {
  id: string;
  customerName: string;
  customerPhone: string;
  deviceType: string;
  deviceModel: string;
  complaint: string;
  estimatedCost: number;
  actualCost: number | null;
  estimatedDelivery: string;
  actualDelivery: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DELIVERED';
  staffId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CashSession {
  id: string;
  staffId: string;
  openingBalance: number;
  closingBalance: number | null;
  expectedClosing: number | null;
  status: 'OPEN' | 'CLOSED';
  openedAt: string;
  closedAt: string | null;
}

export interface DailySummary {
  totalSales: number;
  totalRepairs: number;
  totalCommission: number;
  totalCashIn: number;
  totalCashOut: number;
  netBalance: number;
}

export const staffService = {
  // Products
  async getProducts(category?: string): Promise<Product[]> {
    try {
      const url = category ? `/products?category=${category}` : '/products';
      const response = await api.get(url);
      return extractResponseData<Product[]>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  },

  // Sales
  async createSale(saleData: CreateSaleRequest) {
    try {
      const response = await api.post('/sales', saleData);
      return extractResponseData(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create sale');
    }
  },



  // Repairs
  async createRepair(repairData: CreateRepairRequest) {
    try {
      const response = await api.post('/repairs', repairData);
      return extractResponseData(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create repair');
    }
  },

  async getRepairs(status?: string): Promise<Repair[]> {
    try {
      const url = status ? `/repairs?status=${status}` : '/repairs';
      const response = await api.get(url);
      return extractResponseData<Repair[]>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch repairs');
    }
  },

  async addPartsToRepair(repairId: string, parts: { productId: string; quantity: number }[]) {
    try {
      const response = await api.post(`/repairs/${repairId}/parts`, { parts });
      return extractResponseData(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to add parts');
    }
  },

  async updateRepairStatus(repairId: string, status: string, actualCost?: number) {
    try {
      const response = await api.put(`/staff/repairs/${repairId}/complete`, { status, actualCost });
      return extractResponseData(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update repair status');
    }
  },

  // Cash Sessions
  async openCashSession(staffId: string, openingBalance: number) {
    try {
      const response = await api.post('/staff/cash-sessions/open', { staffId, openingBalance });
      return extractResponseData<CashSession>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to open cash session');
    }
  },

  async closeCashSession(staffId: string, closingBalance: number) {
    try {
      const response = await api.put('/staff/cash-sessions/close', { staffId, closingBalance });
      return extractResponseData<CashSession>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to close cash session');
    }
  },

  async getCurrentCashSession(staffId: string): Promise<CashSession | null> {
    try {
      const response = await api.get(`/staff/cash-sessions/current?staffId=${staffId}`);
      return extractResponseData<CashSession | null>(response);
    } catch (error: any) {
      // If no active session, return null
      if (error.response?.status === 404) {
        return null;
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch cash session');
    }
  },

  // Daily Summary
  async getDailySummary(staffId: string, date?: string): Promise<DailySummary> {
    try {
      const url = date 
        ? `/staff/daily-summary/${staffId}?date=${date}`
        : `/staff/daily-summary/${staffId}`;
      const response = await api.get(url);
      return extractResponseData<DailySummary>(response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch daily summary');
    }
  },
};