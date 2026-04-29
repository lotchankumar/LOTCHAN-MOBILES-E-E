import { api } from './api';
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/staff/login', credentials);
      // Backend returns { token, user } directly (no nested data wrapper)
      const data = response.data;
      
      // Store token
      localStorage.setItem('auth_token', data.token);
      
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/register', credentials);
      // Backend returns { token, user } directly (no nested data wrapper)
      const data = response.data;
      
      // Store token
      localStorage.setItem('auth_token', data.token);
      
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  async getProfile(): Promise<any> {
    try {
      const response = await api.get('/auth/profile');
      // Backend returns the user object directly
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  },

  async seedAdmin(): Promise<void> {
    try {
      await api.post('/auth/seed-admin');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to seed admin');
    }
  },

  logout(): void {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
  },
};