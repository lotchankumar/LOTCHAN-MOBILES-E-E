export const UserRole = {
  STAFF: 'STAFF',
  MANAGER: 'MANAGER',
  ADMIN: 'ADMIN',
  TECHNICIAN: 'TECHNICIAN'
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: UserRole;
  branchId?: string | null;
  branchName?: string;
  managerId?: string | null;
  isActive?: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  otp?: string;
  role?: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password?: string;
  role?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  model?: string;
  sku: string;
  price: number;
  cost?: number;
  category?: string;
  imageUrl?: string;
  stockQty?: number;
  minStock?: number;
}
