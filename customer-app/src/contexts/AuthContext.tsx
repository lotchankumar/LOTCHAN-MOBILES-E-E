import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@/integrations/api';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  signIn: (token: string, userData: any) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session token
    const token = localStorage.getItem('customer_token');
    const userData = localStorage.getItem('customer_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        localStorage.removeItem('customer_token');
        localStorage.removeItem('customer_user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = (token: string, userData: any) => {
    localStorage.setItem('customer_token', token);
    localStorage.setItem('customer_user', JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = async () => {
    localStorage.removeItem('customer_token');
    localStorage.removeItem('customer_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
