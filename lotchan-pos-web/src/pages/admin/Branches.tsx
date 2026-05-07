import { useState } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { UserRole } from '../../types';
import type { BranchWithCount } from '../../hooks/useManagers';
import { useBranchesQuery, useCreateBranch, useUpdateBranch, useDeleteBranch } from '../../hooks/useManagers';
import { Plus, Edit3, Trash2, ChevronDown, XCircle, AlertCircle } from 'lucide-react';
import { BackButton } from '../../components/BackButton';

const BranchesPage = () => {
  const { user } = useAuthStore();
  const { branches, loading, error, refetch: refetchBranches } = useBranchesQuery();
  const { createBranch: createBranchMutation } = useCreateBranch();
  const { updateBranch: updateBranchMutation } = useUpdateBranch();
  const { deleteBranch: deleteBranchMutation } = useDeleteBranch();

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingBranch, setEditingBranch] = useState<BranchWithCount | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmActionId, setConfirmActionId] = useState('');

  const openAddModal = () => {
    setFormData({ name: '', address: '', phone: '' });
    setEditMode(false);
    setEditingBranch(null);
    setShowModal(true);
  };

  const openEditModal = (branch: BranchWithCount) => {
    setFormData({
      name: branch.name,
      address: branch.address || '',
      phone: branch.phone || ''
    });
    setEditMode(true);
    setEditingBranch(branch);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && editingBranch) {
        await updateBranchMutation(editingBranch.id, formData, refetchBranches);
      } else {
        await createBranchMutation(formData, refetchBranches);
      }
      setShowModal(false);
    } catch (err) {
      // Error handled in mutation
    }
  };

  const handleDeleteConfirm = (id: string) => {
    setConfirmActionId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBranchMutation(confirmActionId, refetchBranches);
      setShowConfirm(false);
    } catch (err) {
      // Error handled in mutation
    }
  };

  if (!user || user.role !== UserRole.ADMIN) {
    return <div className="p-8 text-center">Access Denied</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] md:text-[40px] leading-[1.2] tracking-tight font-bold text-[#d2e4ff] uppercase">Branches</h1>
          <p className="text-[#7892b7] text-[14px] font-light">Manage branch locations and inventory allocation</p>
        </div>
        <button onClick={openAddModal} className="bg-[#aec8f0] text-[#153152] font-semibold px-4 py-2 rounded-lg text-sm hover:bg-white transition-colors flex items-center shadow-[0_4px_15px_rgba(174,200,240,0.2)]">
          <Plus className="mr-2 h-4 w-4" /> Add Branch
        </button>
      </div>

      <main className="admin-glass-panel p-6 rounded-xl">
        <div className="w-full">
          {error && (
            <div className="mb-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <AlertCircle className="h-5 w-5 text-destructive mr-2 inline" />
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full min-w-[700px] divide-y divide-white/10">
              <thead className="bg-[#1a3654]/50 text-[#aec8f0]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#7892b7] uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#7892b7] uppercase tracking-wider">Address</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#7892b7] uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#7892b7] uppercase tracking-wider">Staff</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#7892b7] uppercase tracking-wider">Orders</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#7892b7] uppercase tracking-wider">Created</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-[#7892b7] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-transparent divide-y divide-white/10">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-[#7892b7]">
                      Loading branches...
                    </td>
                  </tr>
                ) : branches.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-[#7892b7]">
                      No branches found. Create one to get started.
                    </td>
                  </tr>
                ) : (
                  branches.map((branch) => (
                    <tr key={branch.id} className="hover:bg-[#1a3654]/50 text-[#aec8f0]">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-[#d2e4ff]">{branch.name}</td>
                      <td className="px-4 py-4 text-sm text-[#d2e4ff] max-w-[160px] truncate">{branch.address || '-'}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-[#d2e4ff]">{branch.phone || '-'}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-[#d2e4ff]">{branch._count?.users || 0}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-[#d2e4ff]">{branch._count?.orders || 0}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-[#7892b7]">
                        {new Date(branch.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => openEditModal(branch)}
                            className="text-[#aec8f0] hover:text-white transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteConfirm(branch.id)}
                            className="text-destructive hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add/Edit Branch Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-transparent rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#d2e4ff]">
                {editMode ? 'Edit Branch' : 'Add New Branch'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#7892b7] hover:text-[#d2e4ff]"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#7892b7] mb-2">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-white/10 rounded-md bg-[#0b2a4a] text-[#d2e4ff] focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-[#7892b7] mb-2">
                  Address
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-white/10 rounded-md bg-[#0b2a4a] text-[#d2e4ff] focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#7892b7] mb-2">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-white/10 rounded-md bg-[#0b2a4a] text-[#d2e4ff] focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-white/10 text-[#7892b7] rounded-md hover:bg-white/5 text-[#d2e4ff] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-[#aec8f0] text-[#153152] rounded-md hover:bg-white font-medium flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editMode ? 'Update Branch' : 'Create Branch')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-transparent rounded-lg p-6 w-full max-w-md">
            <div className="flex items-start mb-6">
              <div className="flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-warning mt-0.5" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-lg font-medium text-[#d2e4ff]">
                  Confirm Delete
                </h3>
                <p className="mt-2 text-sm text-[#7892b7]">
                  This branch cannot be deleted if it has associated staff or orders. This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 border border-white/10 text-[#7892b7] rounded-md hover:bg-white/5 text-[#d2e4ff] font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 font-medium flex items-center justify-center disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete Branch'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchesPage;

