import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { staffService, type Repair, type Product } from '../../services/staff.service';
import { MessageCircle, Wrench, X, Plus, AlertTriangle } from 'lucide-react';

export const RepairsPage = () => {
  const { user } = useAuthStore();
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSparesModal, setShowSparesModal] = useState(false);
  const [selectedRepairId, setSelectedRepairId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [partQuantity, setPartQuantity] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  
  const [newRepair, setNewRepair] = useState({
    customerName: '',
    customerPhone: '',
    deviceType: '',
    deviceModel: '',
    complaint: '',
    estimatedCost: '',
    estimatedDelivery: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const statuses = [
    { value: 'ALL', label: 'All Repairs' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'DELIVERED', label: 'Delivered' },
  ];

  const deviceTypes = ['Mobile', 'Tablet', 'Laptop', 'Smart Watch', 'Other'];

  useEffect(() => { fetchRepairs(); }, [selectedStatus]);

  const fetchRepairs = async () => {
    try {
      setLoading(true);
      setError(null);
      const status = selectedStatus === 'ALL' ? undefined : selectedStatus;
      const data = await staffService.getRepairs(status);
      setRepairs(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load repairs');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (repairId: string, status: string) => {
    try {
      await staffService.updateRepairStatus(repairId, status);
      fetchRepairs();
    } catch (err: any) {
      setError(err.message || 'Failed to update repair status');
    }
  };

  const handleOpenSparesModal = async (repairId: string) => {
    setSelectedRepairId(repairId);
    setShowSparesModal(true);
    if (products.length === 0) {
      try {
        const data = await staffService.getProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load products');
      }
    }
  };

  const handleAddSpares = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRepairId || !selectedProductId) return;
    try {
      setSubmitting(true);
      await staffService.addPartsToRepair(selectedRepairId, [{ productId: selectedProductId, quantity: partQuantity }]);
      setShowSparesModal(false);
      setSelectedProductId('');
      setPartQuantity(1);
      alert('Parts added successfully');
      fetchRepairs();
    } catch (err: any) {
      setError(err.message || 'Failed to add spares');
    } finally {
      setSubmitting(false);
    }
  };

  const handleShareWhatsApp = (repair: Repair) => {
    const text = `Hi ${repair.customerName},\n\nYour repair ticket (Device: ${repair.deviceModel}) is currently: ${repair.status}.\nEstimated Cost: ₹${repair.estimatedCost.toFixed(2)}.\n\nThank you for choosing LOTCHAN MOBILES!`;
    const url = `https://wa.me/${repair.customerPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleMarkDelivered = async (repairId: string) => {
    const actualCost = prompt('Enter actual repair cost:');
    if (actualCost && !isNaN(parseFloat(actualCost))) {
      try {
        await staffService.updateRepairStatus(repairId, 'DELIVERED', parseFloat(actualCost));
        fetchRepairs();
      } catch (err: any) {
        setError(err.message || 'Failed to mark as delivered');
      }
    }
  };

  const handleSubmitNewRepair = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const estimatedCost = parseFloat(newRepair.estimatedCost);
    if (isNaN(estimatedCost) || estimatedCost <= 0) {
      setError('Please enter a valid estimated cost');
      return;
    }
    if (!newRepair.customerName.trim() || !newRepair.customerPhone.trim()) {
      setError('Please fill in customer details');
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      await staffService.createRepair({
        customerName: newRepair.customerName.trim(),
        customerPhone: newRepair.customerPhone.trim(),
        deviceType: newRepair.deviceType || 'Mobile',
        deviceModel: newRepair.deviceModel.trim(),
        complaint: newRepair.complaint.trim(),
        estimatedCost,
        estimatedDelivery: newRepair.estimatedDelivery || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        staffId: user.id,
      });
      setNewRepair({ customerName: '', customerPhone: '', deviceType: '', deviceModel: '', complaint: '', estimatedCost: '', estimatedDelivery: '' });
      setShowModal(false);
      fetchRepairs();
    } catch (err: any) {
      setError(err.message || 'Failed to create repair');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, { cls: string; label: string }> = {
      PENDING: { cls: 'pos-badge-yellow', label: 'Pending' },
      IN_PROGRESS: { cls: 'pos-badge-blue', label: 'In Progress' },
      COMPLETED: { cls: 'pos-badge-green', label: 'Completed' },
      DELIVERED: { cls: 'pos-badge-purple', label: 'Delivered' },
    };
    const info = map[status];
    if (!info) return null;
    return <span className={`pos-badge ${info.cls}`}>{info.label}</span>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6 pos-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#d2e4ff]">Repairs Management</h1>
          <p className="text-xs text-slate-500 mt-1">{repairs.length} total repair tickets</p>
        </div>
        <button onClick={() => setShowModal(true)} className="pos-btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Repair
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="pos-error-banner">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {statuses.map(status => (
          <button
            key={status.value}
            onClick={() => setSelectedStatus(status.value)}
            className={`pos-chip ${selectedStatus === status.value ? 'pos-chip-active' : 'pos-chip-inactive'}`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Repairs Table */}
      <div className="pos-glass rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-slate-500 pos-pulse">Loading repairs...</div>
          </div>
        ) : repairs.length === 0 ? (
          <div className="text-center py-16">
            <Wrench className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">No repairs found</p>
            <button onClick={() => setShowModal(true)} className="pos-btn-primary mt-4">
              Create Your First Repair
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="pos-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Device</th>
                  <th>Complaint</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th>Delivery</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {repairs.map(repair => (
                  <tr key={repair.id}>
                    <td>
                      <div className="font-medium text-[#d2e4ff]">{repair.customerName}</div>
                      <div className="pos-td-muted">{repair.customerPhone}</div>
                    </td>
                    <td>
                      <div className="text-[#d2e4ff]">{repair.deviceType}</div>
                      <div className="pos-td-muted">{repair.deviceModel}</div>
                    </td>
                    <td>
                      <div className="text-[#d2e4ff] max-w-xs truncate">{repair.complaint}</div>
                    </td>
                    <td>
                      <div className="font-medium text-blue-400">₹{repair.estimatedCost.toFixed(2)}</div>
                      {repair.actualCost && (
                        <div className="pos-td-muted">Actual: ₹{repair.actualCost.toFixed(2)}</div>
                      )}
                    </td>
                    <td>{getStatusBadge(repair.status)}</td>
                    <td>
                      <div className="pos-td-muted">
                        {repair.estimatedDelivery ? formatDate(repair.estimatedDelivery) : '-'}
                      </div>
                      {repair.actualDelivery && (
                        <div className="text-xs text-green-400">Done: {formatDate(repair.actualDelivery)}</div>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        {repair.status !== 'DELIVERED' && (
                          <>
                            {repair.status === 'PENDING' && (
                              <button onClick={() => handleStatusUpdate(repair.id, 'IN_PROGRESS')} className="pos-action-link">
                                Start
                              </button>
                            )}
                            {repair.status === 'IN_PROGRESS' && (
                              <button onClick={() => handleStatusUpdate(repair.id, 'COMPLETED')} className="pos-action-link pos-action-link-green">
                                Complete
                              </button>
                            )}
                            {repair.status === 'COMPLETED' && (
                              <button onClick={() => handleMarkDelivered(repair.id)} className="pos-action-link pos-action-link-purple">
                                Deliver
                              </button>
                            )}
                            <button onClick={() => handleOpenSparesModal(repair.id)} className="pos-action-link flex items-center gap-1" title="Add Spares">
                              <Wrench className="w-3 h-3" /> Spares
                            </button>
                            <button onClick={() => handleShareWhatsApp(repair)} className="pos-action-link pos-action-link-green flex items-center gap-1" title="WhatsApp">
                              <MessageCircle className="w-3 h-3" /> WA
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Repair Modal */}
      {showModal && (
        <div className="pos-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="pos-modal max-w-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#d2e4ff]">New Repair Job</h2>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmitNewRepair} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="pos-label">Customer Name *</label>
                    <input type="text" value={newRepair.customerName} onChange={e => setNewRepair({...newRepair, customerName: e.target.value})} className="pos-input" required />
                  </div>
                  <div>
                    <label className="pos-label">Customer Phone *</label>
                    <input type="tel" value={newRepair.customerPhone} onChange={e => setNewRepair({...newRepair, customerPhone: e.target.value})} className="pos-input" required pattern="[6-9]\d{9}" maxLength={10} />
                  </div>
                  <div>
                    <label className="pos-label">Device Type</label>
                    <select value={newRepair.deviceType} onChange={e => setNewRepair({...newRepair, deviceType: e.target.value})} className="pos-select">
                      <option value="">Select Device Type</option>
                      {deviceTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="pos-label">Device Model</label>
                    <input type="text" value={newRepair.deviceModel} onChange={e => setNewRepair({...newRepair, deviceModel: e.target.value})} placeholder="e.g., iPhone 13" className="pos-input" />
                  </div>
                </div>
                <div>
                  <label className="pos-label">Complaint/Issue *</label>
                  <textarea value={newRepair.complaint} onChange={e => setNewRepair({...newRepair, complaint: e.target.value})} rows={3} className="pos-input" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="pos-label">Estimated Cost (₹) *</label>
                    <input type="number" value={newRepair.estimatedCost} onChange={e => setNewRepair({...newRepair, estimatedCost: e.target.value})} step="0.01" min="1" className="pos-input" required />
                  </div>
                  <div>
                    <label className="pos-label">Estimated Delivery</label>
                    <input type="date" value={newRepair.estimatedDelivery} onChange={e => setNewRepair({...newRepair, estimatedDelivery: e.target.value})} min={new Date().toISOString().split('T')[0]} className="pos-input [color-scheme:dark]" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button type="button" onClick={() => setShowModal(false)} className="pos-btn-secondary">Cancel</button>
                  <button type="submit" disabled={submitting} className="pos-btn-primary">
                    {submitting ? 'Creating...' : 'Create Repair'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Spares Modal */}
      {showSparesModal && (
        <div className="pos-modal-overlay" onClick={() => setShowSparesModal(false)}>
          <div className="pos-modal max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#d2e4ff]">Add Spares to Repair</h2>
                <button onClick={() => setShowSparesModal(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddSpares} className="space-y-4">
                <div>
                  <label className="pos-label">Select Spare Part</label>
                  <select value={selectedProductId} onChange={e => setSelectedProductId(e.target.value)} className="pos-select" required>
                    <option value="">-- Select Part --</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name} - ₹{p.price} (Stock: {p.stockQty})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="pos-label">Quantity</label>
                  <input type="number" value={partQuantity} onChange={e => setPartQuantity(parseInt(e.target.value) || 1)} min="1" className="pos-input" required />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button type="button" onClick={() => setShowSparesModal(false)} className="pos-btn-secondary">Cancel</button>
                  <button type="submit" disabled={submitting || !selectedProductId} className="pos-btn-primary">
                    {submitting ? 'Adding...' : 'Add Part'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};