import React, { useState, useEffect } from 'react';
import { managerService, type Supplier } from '../../services/manager.service';
import { Plus, Edit2, Search, X, AlertTriangle } from 'lucide-react';

export const ManagerSuppliersPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [supplierForm, setSupplierForm] = useState({
    name: '', contactName: '', email: '', phone: '', address: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchSuppliers(); }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const data = await managerService.getSuppliers();
      setSuppliers(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch suppliers');
    } finally {
      setLoading(false);
    }
  };

  const handleSupplierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingSupplier) {
        await managerService.updateSupplier(editingSupplier.id, supplierForm);
      } else {
        await managerService.createSupplier(supplierForm);
      }
      await fetchSuppliers();
      setIsSupplierModalOpen(false);
      resetSupplierForm();
    } catch (err: any) {
      alert(err.message || 'Failed to save supplier');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setSupplierForm({
      name: supplier.name,
      contactName: supplier.contactName || '',
      email: supplier.email || '',
      phone: supplier.phone || '',
      address: supplier.address || '',
    });
    setIsSupplierModalOpen(true);
  };

  const resetSupplierForm = () => {
    setSupplierForm({ name: '', contactName: '', email: '', phone: '', address: '' });
    setEditingSupplier(null);
  };

  const filteredSuppliers = suppliers.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.email && s.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="text-slate-500 pos-pulse">Loading suppliers...</div></div>;
  }

  return (
    <div className="space-y-6 pos-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#d2e4ff]">Supplier Management</h2>
          <p className="text-xs text-slate-500 mt-1">Manage suppliers and view balances</p>
        </div>
        <button onClick={() => { resetSupplierForm(); setIsSupplierModalOpen(true); }} className="pos-btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Supplier
        </button>
      </div>

      {error && (
        <div className="pos-error-banner">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-200"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Search */}
      <div className="pos-glass rounded-xl p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input type="text" placeholder="Search suppliers..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pos-input pl-10" />
        </div>
      </div>

      {/* Table */}
      <div className="pos-glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="pos-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Credit Balance (Owed)</th>
                <th>Total Paid</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-slate-500">No suppliers found.</td></tr>
              ) : (
                filteredSuppliers.map(supplier => (
                  <tr key={supplier.id}>
                    <td>
                      <div className="font-medium text-[#d2e4ff]">{supplier.name}</div>
                      <div className="pos-td-muted">{supplier.email}</div>
                    </td>
                    <td>
                      <div className="text-[#d2e4ff]">{supplier.contactName || '-'}</div>
                      <div className="pos-td-muted">{supplier.phone}</div>
                    </td>
                    <td>
                      <span className={`font-semibold ${supplier.creditBalance > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        ₹{supplier.creditBalance.toFixed(2)}
                      </span>
                    </td>
                    <td className="font-medium text-green-400">₹{(supplier.totalPaid || 0).toFixed(2)}</td>
                    <td>
                      <div className="flex justify-end">
                        <button onClick={() => openEditModal(supplier)} className="p-2 text-slate-400 hover:text-blue-400 transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
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

      {/* Modal */}
      {isSupplierModalOpen && (
        <div className="pos-modal-overlay" onClick={() => { setIsSupplierModalOpen(false); resetSupplierForm(); }}>
          <div className="pos-modal max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-white/5">
              <h3 className="text-xl font-bold text-[#d2e4ff]">{editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}</h3>
            </div>
            <form onSubmit={handleSupplierSubmit} className="p-6 space-y-4">
              <div>
                <label className="pos-label">Company Name *</label>
                <input type="text" required value={supplierForm.name} onChange={e => setSupplierForm({...supplierForm, name: e.target.value})} className="pos-input" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="pos-label">Contact Name</label>
                  <input type="text" value={supplierForm.contactName} onChange={e => setSupplierForm({...supplierForm, contactName: e.target.value})} className="pos-input" />
                </div>
                <div>
                  <label className="pos-label">Phone</label>
                  <input type="text" value={supplierForm.phone} onChange={e => setSupplierForm({...supplierForm, phone: e.target.value})} className="pos-input" />
                </div>
              </div>
              <div>
                <label className="pos-label">Email</label>
                <input type="email" value={supplierForm.email} onChange={e => setSupplierForm({...supplierForm, email: e.target.value})} className="pos-input" />
              </div>
              <div>
                <label className="pos-label">Address</label>
                <textarea value={supplierForm.address} onChange={e => setSupplierForm({...supplierForm, address: e.target.value})} className="pos-input min-h-[80px]" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button type="button" onClick={() => { setIsSupplierModalOpen(false); resetSupplierForm(); }} className="pos-btn-secondary" disabled={submitting}>Cancel</button>
                <button type="submit" className="pos-btn-primary" disabled={submitting}>
                  {submitting ? 'Saving...' : editingSupplier ? 'Update Supplier' : 'Add Supplier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
