import { useState } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { UserRole } from '../../types';
import type { StaffUser } from '../../hooks/useStaff';
import { useStaff, useCreateStaff, useUpdateStaff, useResetStaffPassword } from '../../hooks/useStaff';
import { Plus, Edit3, KeyRound, ToggleLeft, ToggleRight, ChevronDown, XCircle, AlertCircle } from 'lucide-react';

const StaffPage = () => {
  const { user } = useAuthStore();
  const { staff, loading, error, refetch: refetchStaff } = useStaff();
  const { createStaff } = useCreateStaff();
  const { updateStaff } = useUpdateStaff();
  const { resetStaffPassword } = useResetStaffPassword();

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffUser | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: 'STAFF' | 'TECHNICIAN';
  }>({
    name: '',
    email: '',
    password: '',
    role: 'STAFF'
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState('');
  const [confirmId, setConfirmId] = useState('');

  const openAddModal = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'STAFF'
    });
    setEditMode(false);
    setShowModal(true);
  };

  const openEditModal = (staffMember: StaffUser) => {
    setFormData({
      name: staffMember.name,
      email: staffMember.email,
      password: '',
      role: (staffMember.role as 'STAFF' | 'TECHNICIAN') || 'STAFF'
    });
    setEditMode(true);
    setEditingStaff(staffMember);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };
    console.log('Form data being submitted:', JSON.stringify(dataToSend, null, 2));
    try {
      if (editMode && editingStaff) {
        await updateStaff(editingStaff.id, {
          name: formData.name,
          email: formData.email,
          role: formData.role
        });
      } else {
        await createStaff(dataToSend);
      }
      setShowModal(false);
      refetchStaff();
    } catch (err) {
      alert('Failed to save staff member');
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
        await resetStaffPassword(confirmId);
        alert('Password reset email sent');
      } else if (confirmAction === 'toggle') {
        const staffMember = staff.find(s => s.id === confirmId);
        if (staffMember) {
          await updateStaff(confirmId, { isActive: !staffMember.isActive });
        }
      }
      setShowConfirm(false);
      refetchStaff();
    } catch (err) {
      alert('Action failed');
    }
  };

  if (!user || (user.role !== UserRole.ADMIN && user.role !== UserRole.MANAGER)) {
    return <div className="p-8 text-center">Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-foreground">Staff Management</h1>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-medium"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Staff
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Branch</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Manager</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                      Loading staff...
                    </td>
                  </tr>
                ) : staff.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                      No staff found. Create one to get started.
                    </td>
                  </tr>
                ) : (
                  staff.map((staffMember) => (
                    <tr key={staffMember.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{staffMember.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{staffMember.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          staffMember.role === 'TECHNICIAN' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary-dark'
                        }`}>
                          {staffMember.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        {staffMember.branch ? staffMember.branch.name : 'No branch'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        {staffMember.manager ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {staffMember.manager.name}
                          </span>
                        ) : (
                          <span className="text-muted-foreground italic text-xs">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          staffMember.isActive
                            ? 'bg-success/20 text-success'
                            : 'bg-destructive/20 text-destructive'
                        }`}>
                          {staffMember.isActive ? 'Active' : 'Inactive'}
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
                                onClick={() => openEditModal(staffMember)}
                                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-muted flex items-center"
                              >
                                <Edit3 className="h-4 w-4 mr-2" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleResetPassword(staffMember.id)}
                                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-muted flex items-center"
                              >
                                <KeyRound className="h-4 w-4 mr-2" />
                                Reset Password
                              </button>
                              <button
                                onClick={() => handleToggleActive(staffMember.id)}
                                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-muted flex items-center"
                              >
                                {staffMember.isActive ? <ToggleLeft className="h-4 w-4 mr-2" /> : <ToggleRight className="h-4 w-4 mr-2" />}
                                {staffMember.isActive ? 'Deactivate' : 'Activate'}
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

      {/* Add/Edit Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {editMode ? 'Edit Staff Member' : 'Add New Staff Member'}
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
                <label htmlFor="role" className="block text-sm font-medium text-muted-foreground mb-2">
                  Role
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value as 'STAFF' | 'TECHNICIAN'})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="STAFF">Staff</option>
                  <option value="TECHNICIAN">Technician</option>
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
                  {editMode ? 'Update Staff' : 'Create Staff'}
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
                  {confirmAction === 'reset' ? 'Reset password for this staff member? A temporary password will be emailed.' :
                   'Toggle active status for this staff member?'}
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

export default StaffPage;