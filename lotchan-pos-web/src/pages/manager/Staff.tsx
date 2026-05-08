import { useState } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { UserRole } from '../../types';
import type { StaffUser } from '../../hooks/useStaff';
import { useStaff, useCreateStaff, useUpdateStaff, useResetStaffPassword } from '../../hooks/useStaff';
import {
  Plus, Edit3, KeyRound, ToggleLeft, ToggleRight,
  XCircle, AlertTriangle, Users, Wrench, Building2
} from 'lucide-react';

type ActiveTab = 'STAFF' | 'TECHNICIAN';

const StaffPage = () => {
  const { user } = useAuthStore();
  const { staff, loading, error, refetch: refetchStaff } = useStaff();
  const { createStaff } = useCreateStaff();
  const { updateStaff } = useUpdateStaff();
  const { resetStaffPassword } = useResetStaffPassword();

  const [activeTab, setActiveTab] = useState<ActiveTab>('STAFF');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffUser | null>(null);
  const [formData, setFormData] = useState<{
    name: string; email: string; password: string; role: 'STAFF' | 'TECHNICIAN';
  }>({ name: '', email: '', password: '', role: 'STAFF' });
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState('');
  const [confirmId, setConfirmId] = useState('');

  // Filter staff by the active tab
  const staffList = staff.filter(s => s.role === 'STAFF');
  const technicianList = staff.filter(s => s.role === 'TECHNICIAN');
  const displayList = activeTab === 'STAFF' ? staffList : technicianList;

  const openAddModal = () => {
    setFormData({ name: '', email: '', password: '', role: activeTab });
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
    try {
      if (editMode && editingStaff) {
        await updateStaff(editingStaff.id, { name: formData.name, email: formData.email, role: formData.role });
      } else {
        await createStaff(dataToSend);
      }
      setShowModal(false);
      refetchStaff();
    } catch (err) {
      alert('Failed to save member');
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
        const member = staff.find(s => s.id === confirmId);
        if (member) await updateStaff(confirmId, { isActive: !member.isActive });
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
      {/* ── Branch Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-400 uppercase tracking-widest">
              {user?.branchName || 'All Branches'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#d2e4ff]">Team Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            {staffList.length} staff · {technicianList.length} technicians
          </p>
        </div>
        <button onClick={openAddModal} className="pos-btn-primary flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          Add {activeTab === 'STAFF' ? 'Staff' : 'Technician'}
        </button>
      </div>

      {/* ── Tab Switcher ── */}
      <div className="flex gap-1 p-1 bg-[#071828] rounded-xl border border-white/5 w-fit">
        <button
          onClick={() => setActiveTab('STAFF')}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'STAFF'
              ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30 shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          Staff
          <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${activeTab === 'STAFF' ? 'bg-blue-500/30 text-blue-200' : 'bg-white/10 text-slate-400'}`}>
            {staffList.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('TECHNICIAN')}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'TECHNICIAN'
              ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30 shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wrench className="w-4 h-4" />
          Technicians
          <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${activeTab === 'TECHNICIAN' ? 'bg-purple-500/30 text-purple-200' : 'bg-white/10 text-slate-400'}`}>
            {technicianList.length}
          </span>
        </button>
      </div>

      {error && (
        <div className="pos-error-banner">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Table ── */}
      <div className="pos-glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="pos-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Branch</th>
                <th>Manager</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-12 text-slate-500 pos-pulse">Loading...</td></tr>
              ) : displayList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500">
                    No {activeTab === 'STAFF' ? 'staff members' : 'technicians'} found.{' '}
                    <button onClick={openAddModal} className="text-blue-400 hover:underline">Add one.</button>
                  </td>
                </tr>
              ) : (
                displayList.map(member => (
                  <tr key={member.id}>
                    <td className="font-medium text-[#d2e4ff]">{member.name}</td>
                    <td className="text-[#d2e4ff]">{member.email}</td>
                    <td className="text-[#d2e4ff]">
                      {member.branch
                        ? <span className="pos-badge pos-badge-blue">{member.branch.name}</span>
                        : <span className="text-slate-500 italic text-xs">No branch</span>}
                    </td>
                    <td>
                      {member.manager
                        ? <span className="pos-badge pos-badge-blue">{member.manager.name}</span>
                        : <span className="text-slate-500 italic text-xs">Unassigned</span>}
                    </td>
                    <td>
                      <span className={`pos-badge ${member.isActive ? 'pos-badge-green' : 'pos-badge-red'}`}>
                        {member.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => openEditModal(member)} className="text-blue-400 hover:text-blue-300 transition-colors" title="Edit">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleResetPassword(member.id)} className="text-yellow-400 hover:text-yellow-300 transition-colors" title="Reset Password">
                          <KeyRound className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleToggleActive(member.id)}
                          className={`${member.isActive ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'} transition-colors`}
                          title={member.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {member.isActive ? <ToggleLeft className="h-4 w-4" /> : <ToggleRight className="h-4 w-4" />}
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

      {/* ── Add/Edit Modal ── */}
      {showModal && (
        <div className="pos-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="pos-modal max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#d2e4ff]">
                  {editMode ? `Edit ${formData.role === 'TECHNICIAN' ? 'Technician' : 'Staff Member'}` : `Add New ${formData.role === 'TECHNICIAN' ? 'Technician' : 'Staff Member'}`}
                </h2>
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
                {user?.branchName && (
                  <div className="flex items-center gap-2 p-3 bg-cyan-900/20 border border-cyan-800/30 rounded-lg">
                    <Building2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="text-sm text-cyan-300">
                      Will be assigned to <strong>{user.branchName}</strong>
                    </span>
                  </div>
                )}
                <div className="flex gap-3 pt-4 border-t border-white/5">
                  <button type="button" onClick={() => setShowModal(false)} className="pos-btn-secondary flex-1">Cancel</button>
                  <button type="submit" className="pos-btn-primary flex-1">{editMode ? 'Update' : 'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm Dialog ── */}
      {showConfirm && (
        <div className="pos-modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="pos-modal max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start mb-6">
                <AlertTriangle className="h-6 w-6 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-[#d2e4ff]">Confirm Action</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {confirmAction === 'reset'
                      ? 'Reset password? A temporary password will be emailed.'
                      : 'Toggle active status for this member?'}
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