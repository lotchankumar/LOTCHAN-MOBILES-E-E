import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  branch: {
    id: string;
    name: string;
    address?: string;
    phone?: string;
  } | null;
  manager: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export const useStaff = () => {
  const [staff, setStaff] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/staff');
      setStaff(response.data);
    } catch (err) {
      setError('Failed to fetch staff');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { staff, loading, error, refetch };
};

export const useCreateStaff = () => {
  const [loading, setLoading] = useState(false);

  const createStaff = async (data: { name: string; email: string; branchId?: string; password?: string; role?: 'STAFF' | 'TECHNICIAN' }) => {
    console.log('Frontend sending staff creation data:', JSON.stringify(data, null, 2));
    setLoading(true);
    try {
      const response = await api.post('/admin/staff', data);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { createStaff, loading };
};

export const useUpdateStaff = () => {
  const [loading, setLoading] = useState(false);

  const updateStaff = async (id: string, data: { name?: string; email?: string; branchId?: string; isActive?: boolean; role?: 'STAFF' | 'TECHNICIAN' }) => {
    setLoading(true);
    try {
      const response = await api.patch(`/admin/staff/${id}`, data);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { updateStaff, loading };
};

export const useResetStaffPassword = () => {
  const [loading, setLoading] = useState(false);

  const resetStaffPassword = async (id: string) => {
    setLoading(true);
    try {
      const response = await api.post(`/admin/staff/${id}/reset-password`);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { resetStaffPassword, loading };
};