import { useState } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { UserRole } from '../../types';
import type { ManagerUser } from '../../hooks/useManagers';
import { useManagers, useBranchesQuery, useCreateManager, useUpdateManager, useResetPassword } from '../../hooks/useManagers';
import { Plus, Edit3, KeyRound, ToggleLeft, ToggleRight, ChevronDown, XCircle, AlertCircle } from 'lucide-react';

const ManagersPage = () => {
  const { user } = useAuthStore();
  const { managers, loading, error, refetch: refetchManagers } = useManagers();
  const { branches } = useBranchesQuery();
  const { createManager } = useCreateManager();
  const { updateManager } = useUpdateManager();
  const { resetPassword } = useResetPassword();

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingManager, setEditingManager] = useState<ManagerUser | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branchId: '',
    password: ''
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState('');
  const [confirmId, setConfirmId] = useState('');

  const openAddModal = () => {
    setFormData({ name: '', email: '', branchId: '', password: '' });
    setEditMode(false);
    setShowModal(true);
  };

  const openEditModal = (manager: ManagerUser) => {
    setFormData({
      name: manager.name,
      email: manager.email,
      branchId: manager.branch?.id || '',
      password: ''
    });
    setEditMode(true);
    setEditingManager(manager);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && editingManager) {
        await updateManager(editingManager.id, {
          name: formData.name,
          email: formData.email,
          branchId: formData.branchId || undefined,
        });
      } else {
        await createManager(formData);
      }
      setShowModal(false);
      refetchManagers();
    } catch (err) {
      alert('Failed to save manager');
    }
  };

  const handleResetPassword = (id: string) => {
    setConfirmAction('reset');
    setConfirmId(id);
    setShowConfirm(true);
  };

  const handleToggleActive = (id: string) => {
    setConfirmAction('toggle');
    setConfirmId(id);
    setShowConfirm(true);
  };

  const confirmActionHandler = async () => {
    try {
      if (confirmAction === 'reset') {
        await resetPassword(confirmId);
        alert('Password reset email sent');
      } else if (confirmAction === 'toggle') {
        const manager = managers.find(m => m.id === confirmId);
        if (manager) {
          await updateManager(confirmId, { isActive: !manager.isActive });
        }
      }
      setShowConfirm(false);
      refetchManagers();
    } catch (err) {
      alert('Action failed');
    }
  };

  if (!user || user.role !== UserRole.ADMIN) {
    return <div className="p-8 text-center">Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-foreground">Manager Management</h1>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-medium"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Manager
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="card p-6">
          {error && (
            <div className="mb-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <AlertCircle className="h-5 w-5 text-destructive mr-2 inline" />
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Branch</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      Loading managers...
                    </td>
                  </tr>
                ) : managers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      No managers found. Create one to get started.
                    </td>
                  </tr>
                ) : (
                  managers.map((manager) => (
                    <tr key={manager.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{manager.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{manager.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        {manager.branch ? manager.branch.name : 'No branch'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          manager.isActive 
                            ? 'bg-success/20 text-success' 
                            : 'bg-destructive/20 text-destructive'
                        }`}>
                          {manager.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative inline-block text-left">
                          <div>
                            <button className="flex items-center text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted">
                              <ChevronDown className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card border divide-y divide-border ring-1 ring-border ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <button
                                onClick={() => openEditModal(manager)}
                                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-muted flex items-center"
                              >
                                <Edit3 className="h-4 w-4 mr-2" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleResetPassword(manager.id)}
                                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-muted flex items-center"
                              >
                                <KeyRound className="h-4 w-4 mr-2" />
                                Reset Password
                              </button>
                              <button
                                onClick={() => handleToggleActive(manager.id)}
                                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-muted flex items-center"
                              >
                                {manager.isActive ? <ToggleLeft className="h-4 w-4 mr-2" /> : <ToggleRight className="h-4 w-4 mr-2" />}

                                {manager.isActive ? 'Deactivate' : 'Activate'}
                              </button>
                            </div>
                          </div>
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

      {/* Add/Edit Manager Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {editMode ? 'Edit Manager' : 'Add New Manager'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="branchId" className="block text-sm font-medium text-muted-foreground mb-2">
                  Branch
                </label>
                <select
                  id="branchId"
                  value={formData.branchId}
                  onChange={(e) => setFormData({...formData, branchId: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                >
                  <option value="">Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
              {!editMode && (
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center">
                    Password Option
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="passwordOption"
                        className="mr-2"
                        checked={!formData.password}
                        onChange={() => setFormData({...formData, password: ''})}
                      />
                      Auto-generate (recommended)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="passwordOption"
                        className="mr-2"
                        checked={!!formData.password}
                        onChange={() => setFormData({...formData, password: 'temp123'})}
                      />
                      Set manually
                      {formData.password && (
                        <input
                          type="text"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="ml-2 px-3 py-1 border border-border rounded-md bg-background text-sm"
                          placeholder="Enter password"
                        />
                      )}
                    </label>
                  </div>
                </div>
              )}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-border text-muted-foreground rounded-md hover:bg-secondary font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-medium flex items-center justify-center"
                >
                  {editMode ? 'Update Manager' : 'Create Manager'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <div className="flex items-start mb-6">
              <div className="flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-warning mt-0.5" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-lg font-medium text-foreground">
                  Confirm Action
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {confirmAction === 'reset' ? 'Reset password for this manager? A temporary password will be emailed.' : 
                   'Toggle active status for this manager?'}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 border border-border text-muted-foreground rounded-md hover:bg-secondary font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmActionHandler}
                className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 font-medium"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagersPage;

