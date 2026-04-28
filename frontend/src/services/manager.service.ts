import { apiGet, apiPost, apiPatch } from './api';

const managerService = {
  // Inventory methods
  getInventory: async (filters?: { category?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiGet(`/inventory${queryString}`);
  },

  getLowStock: async () => {
    return apiGet('/inventory/low-stock');
  },

  updateProduct: async (id: string, data: any) => {
    return apiPatch(`/inventory/${id}`, data);
  },

  createSupplier: async (data: any) => {
    return apiPost('/suppliers', data);
  },

  getSuppliers: async () => {
    return apiGet('/suppliers');
  },

  // Purchases methods
  getPurchases: async (filters?: any) => {
    const params = new URLSearchParams();
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters?.dateTo) params.append('dateTo', filters.dateTo);
    if (filters?.supplierId) params.append('supplierId', filters.supplierId);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiGet(`/purchases${queryString}`);
  },

  createPurchase: async (data: any) => {
    return apiPost('/purchases', data);
  },

  // Categories methods
  getCategories: async () => {
    return apiGet('/categories');
  },

  // Repair Spare Products methods
  getRepairSpareProducts: async () => {
    return apiGet('/repair-spares');
  },

  createRepairSpareProduct: async (data: any) => {
    return apiPost('/repair-spares', data);
  },

  updateRepairSpareProduct: async (id: string, data: any) => {
    return apiPatch(`/repair-spares/${id}`, data);
  },

  deleteRepairSpareProduct: async (id: string) => {
    return apiPost(`/repair-spares/${id}/delete`, {});
  },

  // Repair Spare Purchases methods
  getRepairSparePurchases: async () => {
    return apiGet('/repair-spare-purchases');
  },

  createRepairSparePurchase: async (data: any) => {
    return apiPost('/repair-spare-purchases', data);
  },

  // Expenses methods
  getExpenses: async (filters?: any) => {
    const params = new URLSearchParams();
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters?.dateTo) params.append('dateTo', filters.dateTo);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiGet(`/expenses${queryString}`);
  },

  // Sales methods
  getSales: async (filters?: any) => {
    const params = new URLSearchParams();
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters?.dateTo) params.append('dateTo', filters.dateTo);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.customerName) params.append('customerName', filters.customerName);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiGet(`/orders${queryString}`);
  },
};

export default managerService;
export { managerService };

