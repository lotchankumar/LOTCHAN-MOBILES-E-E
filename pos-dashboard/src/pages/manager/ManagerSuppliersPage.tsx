import React, { useState, useEffect } from 'react';
import { managerService, type Supplier } from '../../services/manager.service';
import { Plus, Edit2, CreditCard, Search } from 'lucide-react';

export const ManagerSuppliersPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedSupplierForPayment, setSelectedSupplierForPayment] = useState<Supplier | null>(null);

  // Form states
  const [supplierForm, setSupplierForm] = useState({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    paymentType: 'DEBIT' as 'CREDIT' | 'DEBIT',
    reference: '',
    description: '',
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);

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

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSupplierForPayment) return;
    try {
      setSubmitting(true);
      await managerService.recordSupplierPayment({
        supplierId: selectedSupplierForPayment.id,
        amount: Number(paymentForm.amount),
        paymentType: paymentForm.paymentType,
        reference: paymentForm.reference,
        description: paymentForm.description,
      });
      await fetchSuppliers();
      setIsPaymentModalOpen(false);
      resetPaymentForm();
    } catch (err: any) {
      alert(err.message || 'Failed to record payment');
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

  const openPaymentModal = (supplier: Supplier) => {
    setSelectedSupplierForPayment(supplier);
    setIsPaymentModalOpen(true);
  };

  const resetSupplierForm = () => {
    setSupplierForm({ name: '', contactName: '', email: '', phone: '', address: '' });
    setEditingSupplier(null);
  };

  const resetPaymentForm = () => {
    setPaymentForm({ amount: '', paymentType: 'DEBIT', reference: '', description: '' });
    setSelectedSupplierForPayment(null);
  };

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (s.email && s.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <div className="p-6 text-center text-muted-foreground animate-pulse">Loading suppliers...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Supplier Management</h2>
          <p className="text-muted-foreground mt-1">Manage suppliers, view balances, and record payments.</p>
        </div>
        <button
          onClick={() => {
            resetSupplierForm();
            setIsSupplierModalOpen(true);
          }}
          className="btn-primary flex items-center shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Supplier
        </button>
      </div>

      {error && (
        <div className="bg-destructive/10 border-l-4 border-destructive text-destructive p-4 rounded-md">
          <p>{error}</p>
        </div>
      )}

      {/* Filters and Search */}
      <div className="card p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search suppliers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 text-muted-foreground border-b border-border">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold">Credit Balance (Owed)</th>
                <th className="p-4 font-semibold">Total Paid</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSuppliers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No suppliers found.
                  </td>
                </tr>
              ) : (
                filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-foreground">{supplier.name}</div>
                      <div className="text-xs text-muted-foreground">{supplier.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-foreground">{supplier.contactName || '-'}</div>
                      <div className="text-xs text-muted-foreground">{supplier.phone}</div>
                    </td>
                    <td className="p-4">
                      <span className={`font-semibold ${supplier.creditBalance > 0 ? 'text-destructive' : 'text-success'}`}>
                        ₹{supplier.creditBalance.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-success">
                      ₹{(supplier.totalPaid || 0).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openPaymentModal(supplier)}
                          className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors tooltip-trigger"
                          title="Record Payment"
                        >
                          <CreditCard className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => openEditModal(supplier)}
                          className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors tooltip-trigger"
                          title="Edit Supplier"
                        >
                          <Edit2 className="w-5 h-5" />
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

      {/* Supplier Modal */}
      {isSupplierModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">
                {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
              </h3>
            </div>
            <form onSubmit={handleSupplierSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={supplierForm.name}
                  onChange={(e) => setSupplierForm({ ...supplierForm, name: e.target.value })}
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Contact Name</label>
                  <input
                    type="text"
                    value={supplierForm.contactName}
                    onChange={(e) => setSupplierForm({ ...supplierForm, contactName: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                  <input
                    type="text"
                    value={supplierForm.phone}
                    onChange={(e) => setSupplierForm({ ...supplierForm, phone: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <input
                  type="email"
                  value={supplierForm.email}
                  onChange={(e) => setSupplierForm({ ...supplierForm, email: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Address</label>
                <textarea
                  value={supplierForm.address}
                  onChange={(e) => setSupplierForm({ ...supplierForm, address: e.target.value })}
                  className="input-field min-h-[80px]"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSupplierModalOpen(false);
                    resetSupplierForm();
                  }}
                  className="btn-secondary"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : editingSupplier ? 'Update Supplier' : 'Add Supplier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && selectedSupplierForPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-border bg-primary/5">
              <h3 className="text-xl font-bold text-foreground">Record Payment</h3>
              <p className="text-sm text-muted-foreground mt-1">
                To {selectedSupplierForPayment.name}
              </p>
              <div className="mt-2 p-3 bg-card rounded-md border border-border flex justify-between items-center">
                <span className="text-sm font-medium">Current Credit Balance:</span>
                <span className={`font-bold ${selectedSupplierForPayment.creditBalance > 0 ? 'text-destructive' : 'text-success'}`}>
                  ₹{selectedSupplierForPayment.creditBalance.toFixed(2)}
                </span>
              </div>
            </div>
            <form onSubmit={handlePaymentSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Payment Type *</label>
                <select
                  value={paymentForm.paymentType}
                  onChange={(e) => setPaymentForm({ ...paymentForm, paymentType: e.target.value as 'CREDIT' | 'DEBIT' })}
                  className="input-field"
                >
                  <option value="DEBIT">Debit (We pay supplier)</option>
                  <option value="CREDIT">Credit (Supplier gives us goods/refund)</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  {paymentForm.paymentType === 'DEBIT' 
                    ? 'Records a payment made TO the supplier, decreasing the credit balance.'
                    : 'Records goods received or a refund FROM the supplier, increasing the credit balance.'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Amount (₹) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                  className="input-field font-mono text-lg"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Reference (Optional)</label>
                <input
                  type="text"
                  value={paymentForm.reference}
                  onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })}
                  className="input-field"
                  placeholder="e.g. Transaction ID, Cheque No."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Notes (Optional)</label>
                <textarea
                  value={paymentForm.description}
                  onChange={(e) => setPaymentForm({ ...paymentForm, description: e.target.value })}
                  className="input-field"
                  placeholder="Any additional details..."
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsPaymentModalOpen(false);
                    resetPaymentForm();
                  }}
                  className="btn-secondary"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting || !paymentForm.amount || Number(paymentForm.amount) <= 0}
                >
                  {submitting ? 'Processing...' : 'Record Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
