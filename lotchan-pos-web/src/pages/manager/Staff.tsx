import { useState } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { UserRole } from '../../types';
import type { StaffUser } from '../../hooks/useStaff';
import { useStaff, useCreateStaff, useUpdateStaff, useResetStaffPassword } from '../../hooks/useStaff';
import { Plus, Edit3, KeyRound, ToggleLeft, ToggleRight, XCircle, AlertTriangle, X } from 'lucide-react';

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
    name: string; email: string; password: string; role: 'STAFF' | 'TECHNICIAN';
  }>({ name: '', email: '', password: '', role: 'STAFF' });
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState('');
  const [confirmId, setConfirmId] = useState('');

  const openAddModal = () => {
    setFormData({ name: '', email: '', password: '', role: 'STAFF' });
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
    const dataToSend = { name: formData.name, email: formData.email, password: formData.password, role: formData.role };
    console.log('Form data being submitted:', JSON.stringify(dataToSend, null, 2));
    try {
      if (editMode && editingStaff) {
        await updateStaff(editingStaff.id, { name: formData.name, email: formData.email, role: formData.role });
      } else {
        await createStaff(dataToSend);
      }
      setShowModal(false);
      refetchStaff();
    } catch (err) {
      alert('Failed to save staff member');
    }
  };

  const handleResetPassword = (id: string) => { setConfirmAction('reset'); setConfirmId(id); setShowConfirm(true); };
  const handleToggleActive = (id: string) => { setConfirmAction('toggle'); setConfirmId(id); setShowConfirm(true); };

  const confirmActionHandler = async () => {
    try {
      if (confirmAction === 'reset') {
        await resetStaffPassword(confirmId);
        alert('Password reset email sent');
      } else if (confirmAction === 'toggle') {
        const staffMember = staff.find(s => s.id === confirmId);
        if (staffMember) await updateStaff(confirmId, { isActive: !staffMember.isActive });
      }
      setShowConfirm(false);
      refetchStaff();
    } catch (err) {
      alert('Action failed');
    }
  };

  if (!user || (user.role !== UserRole.ADMIN && user.role !== UserRole.MANAGER)) {
    return <div className="p-8 text-center text-slate-500">Access Denied</div>;
  }

  return (
    <div className="space-y-6 pos-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#d2e4ff]">Staff Management</h1>
          <p className="text-xs text-slate-500 mt-1">{staff.length} team members</p>
        </div>
        <button onClick={openAddModal} className="pos-btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Staff
        </button>
      </div>

      {error && (
        <div className="pos-error-banner">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Table */}
      <div className="pos-glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="pos-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Branch</th>
                <th>Manager</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-12 text-slate-500 pos-pulse">Loading staff...</td></tr>
              ) : staff.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-slate-500">No staff found. Create one to get started.</td></tr>
              ) : (
                staff.map(staffMember => (
                  <tr key={staffMember.id}>
                    <td className="font-medium text-[#d2e4ff]">{staffMember.name}</td>
                    <td className="text-[#d2e4ff]">{staffMember.email}</td>
                    <td>
                      <span className={`pos-badge ${staffMember.role === 'TECHNICIAN' ? 'pos-badge-purple' : 'pos-badge-blue'}`}>
                        {staffMember.role}
                      </span>
                    </td>
                    <td className="text-[#d2e4ff]">{staffMember.branch ? staffMember.branch.name : <span className="text-slate-500 italic">No branch</span>}</td>
                    <td>
                      {staffMember.manager ? (
                        <span className="pos-badge pos-badge-blue">{staffMember.manager.name}</span>
                      ) : (
                        <span className="text-slate-500 italic text-xs">Unassigned</span>
                      )}
                    </td>
                    <td>
                      <span className={`pos-badge ${staffMember.isActive ? 'pos-badge-green' : 'pos-badge-red'}`}>
                        {staffMember.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => openEditModal(staffMember)} className="text-blue-400 hover:text-blue-300 transition-colors" title="Edit">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleResetPassword(staffMember.id)} className="text-yellow-400 hover:text-yellow-300 transition-colors" title="Reset Password">
                          <KeyRound className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleToggleActive(staffMember.id)} className={`${staffMember.isActive ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'} transition-colors`} title={staffMember.isActive ? 'Deactivate' : 'Activate'}>
                          {staffMember.isActive ? <ToggleLeft className="h-4 w-4" /> : <ToggleRight className="h-4 w-4" />}
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="pos-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="pos-modal max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#d2e4ff]">{editMode ? 'Edit Staff Member' : 'Add New Staff Member'}</h2>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors">
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="pos-label">Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="pos-input" required />
                </div>
                <div>
                  <label className="pos-label">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="pos-input" required />
                </div>
                <div>
                  <label className="pos-label">Role</label>
                  <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as 'STAFF' | 'TECHNICIAN'})} className="pos-select">
                    <option value="STAFF">Staff</option>
                    <option value="TECHNICIAN">Technician</option>
                  </select>
                </div>
                {!editMode && (
                  <div>
                    <label className="pos-label">Password Option</label>
                    <div className="space-y-2 mt-1">
                      <label className="flex items-center text-sm text-slate-400 cursor-pointer">
                        <input type="radio" name="passwordOption" className="mr-2 accent-blue-500" checked={!formData.password} onChange={() => setFormData({...formData, password: ''})} />
                        Auto-generate (recommended)
                      </label>
                      <label className="flex items-center text-sm text-slate-400 cursor-pointer">
                        <input type="radio" name="passwordOption" className="mr-2 accent-blue-500" checked={!!formData.password} onChange={() => setFormData({...formData, password: 'temp123'})} />
                        Set manually
                        {formData.password && (
                          <input type="text" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="pos-input ml-2 w-40" placeholder="Enter password" />
                        )}
                      </label>
                    </div>
                  </div>
                )}
                <div className="flex gap-3 pt-4 border-t border-white/5">
                  <button type="button" onClick={() => setShowModal(false)} className="pos-btn-secondary flex-1">Cancel</button>
                  <button type="submit" className="pos-btn-primary flex-1">{editMode ? 'Update Staff' : 'Create Staff'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      {showConfirm && (
        <div className="pos-modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="pos-modal max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start mb-6">
                <AlertTriangle className="h-6 w-6 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-[#d2e4ff]">Confirm Action</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {confirmAction === 'reset' ? 'Reset password for this staff member? A temporary password will be emailed.' : 'Toggle active status for this staff member?'}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowConfirm(false)} className="pos-btn-secondary flex-1">Cancel</button>
                <button onClick={confirmActionHandler} className="pos-btn-danger flex-1">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffPage;