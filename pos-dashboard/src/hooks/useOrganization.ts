import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  branch: {
    id: string;
    name: string;
  } | null;
}

export interface ManagerWithStaff {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  managedStaff: StaffMember[];
}

export interface BranchWithHierarchy {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  createdAt: string;
  users: ManagerWithStaff[]; // managers under this branch
}

export interface OrganizationHierarchy {
  branches: BranchWithHierarchy[];
  unassignedStaff: StaffMember[];
}

export const useOrganizationHierarchy = () => {
  const [data, setData] = useState<OrganizationHierarchy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/admin/organization-hierarchy');
      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch organization hierarchy');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
};
