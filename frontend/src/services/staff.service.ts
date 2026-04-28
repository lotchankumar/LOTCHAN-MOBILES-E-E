import { apiGet, apiPost } from './api';
import type { InventoryProduct, ProductCategory } from '../types';

// Product aliases for POS
export type Product = InventoryProduct;
export interface SaleItem {
  productId: string;
  quantity: number;
  price: number;
  discountPercent?: number;
  notes?: string;
}
export interface CreateOrderData {
  customerId?: string;
  items: SaleItem[];
  paymentMethod: string;
  totalAmount: number;
  tenderedAmount?: number;
  changeDue?: number;
  discountTotal?: number;
  notes?: string;
}

export const staffService = {
  getProducts: async (filters?: { search?: string; category?: string; categoryId?: string; lowStock?: boolean }): Promise<Product[]> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.categoryId) params.append('categoryId', filters.categoryId);
    if (filters?.lowStock) params.append('lowStock', 'true');
    return apiGet(`/products?${params.toString()}`);
  },

  getCategories: async (): Promise<ProductCategory[]> => apiGet('/categories'),

  searchCustomers: async (query: string): Promise<any[]> => {
    return apiGet(`/customers/search?q=${encodeURIComponent(query)}`);
  },

  createOrder: async (data: CreateOrderData): Promise<any> => {
    return apiPost('/orders', data);
  },
};

