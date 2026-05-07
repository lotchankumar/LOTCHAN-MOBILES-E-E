import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export interface Branch {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    users: number;
    orders: number;
  };
}

export interface BranchWithCount extends Branch {
  _count: {
    users: number;
    orders: number;
  };
}

export interface ManagerUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  branch: Branch | null;
}

export const useManagers = () => {
  const [managers, setManagers] = useState<ManagerUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/managers');
        setManagers(response.data);
      } catch (err) {
        setError('Failed to fetch managers');
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);

  return { managers, loading, error, refetch: () => window.location.reload() };
};

export const useCreateManager = () => {
  const [loading, setLoading] = useState(false);

  const createManager = async (data: { name: string; email: string; branchId: string; password?: string }) => {
    setLoading(true);
    try {
      const response = await api.post('/admin/managers', data);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { createManager, loading };
};

export const useUpdateManager = () => {
  const [loading, setLoading] = useState(false);

  const updateManager = async (id: string, data: { name?: string; email?: string; branchId?: string; isActive?: boolean }) => {
    setLoading(true);
    try {
      const response = await api.patch(`/admin/managers/${id}`, data);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { updateManager, loading };
};

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const resetPassword = async (id: string) => {
    setLoading(true);
    try {
      const response = await api.post(`/admin/managers/${id}/reset-password`);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading };
};

export type CreateBranchData = {
  name: string;
  address?: string;
  phone?: string;
  isActive?: boolean;
};

export type UpdateBranchData = {
  name?: string;
  address?: string;
  phone?: string;
  isActive?: boolean;
};

export const useBranchesQuery = () => {
  const [branches, setBranches] = useState<BranchWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/branches');
      setBranches(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch branches');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { branches, loading, error, refetch };
};

export const useCreateBranch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBranch = async (data: CreateBranchData, refetchBranches: () => void) => {
    // Client-side validation and trim
    const validatedData = {
      ...data,
      name: data.name.trim()
    };
    
    if (!validatedData.name) {
      setError('Branch name is required and cannot be empty');
      return;
    }
    
    if (validatedData.name.length > 100) {
      setError('Branch name too long (max 100 characters)');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/admin/branches', validatedData);
      refetchBranches();
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create branch');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createBranch, loading, error };
};

export const useUpdateBranch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateBranch = async (id: string, data: UpdateBranchData, refetchBranches: () => void) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.patch(`/admin/branches/${id}`, data);
      refetchBranches();
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update branch');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateBranch, loading, error };
};

export const useDeleteBranch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteBranch = async (id: string, refetchBranches: () => void) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/admin/branches/${id}`);
      refetchBranches();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete branch');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteBranch, loading, error };
};


