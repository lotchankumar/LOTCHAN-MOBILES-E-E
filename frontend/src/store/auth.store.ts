import { create } from 'zustand';

interface AuthState {
  user: any;
  token: string;
  loading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string; role: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: any, token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: '',
  loading: false,
  error: null,
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: '', error: null });
  },
  clearError: () => {
    set({ error: null });
  },
  setUser: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token });
  },
}));


