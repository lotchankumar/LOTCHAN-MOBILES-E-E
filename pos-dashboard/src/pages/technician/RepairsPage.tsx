import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { staffService, type Repair, type Product } from '../../services/staff.service';
import { MessageCircle, Wrench, X } from 'lucide-react';

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
  
  // New repair form state
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
    { value: 'ALL', label: 'All Repairs', color: 'gray' },
    { value: 'PENDING', label: 'Pending', color: 'yellow' },
    { value: 'IN_PROGRESS', label: 'In Progress', color: 'blue' },
    { value: 'COMPLETED', label: 'Completed', color: 'green' },
    { value: 'DELIVERED', label: 'Delivered', color: 'purple' },
  ];

  const deviceTypes = ['Mobile', 'Tablet', 'Laptop', 'Smart Watch', 'Other'];

  useEffect(() => {
    fetchRepairs();
  }, [selectedStatus]);

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
      fetchRepairs(); // Refresh list
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

      const repairData = {
        customerName: newRepair.customerName.trim(),
        customerPhone: newRepair.customerPhone.trim(),
        deviceType: newRepair.deviceType || 'Mobile',
        deviceModel: newRepair.deviceModel.trim(),
        complaint: newRepair.complaint.trim(),
        estimatedCost,
        estimatedDelivery: newRepair.estimatedDelivery || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        staffId: user.id,
      };

      await staffService.createRepair(repairData);
      
      // Reset form and close modal
      setNewRepair({
        customerName: '',
        customerPhone: '',
        deviceType: '',
        deviceModel: '',
        complaint: '',
        estimatedCost: '',
        estimatedDelivery: '',
      });
      setShowModal(false);
      fetchRepairs(); // Refresh list
    } catch (err: any) {
      setError(err.message || 'Failed to create repair');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusInfo = statuses.find(s => s.value === status);
    if (!statusInfo) return null;
    
    const colorClasses = {
      yellow: 'bg-warning/20 text-warning-foreground',
      blue: 'bg-primary/20 text-primary-dark',
      green: 'bg-success/20 text-success',
      purple: 'bg-accent/20 text-accent-dark',
      gray: 'bg-secondary text-foreground/90',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClasses[statusInfo.color as keyof typeof colorClasses]}`}>
        {statusInfo.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Repairs Management</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary py-2 px-4 text-sm font-medium"
          >
            + New Repair
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="rounded-md bg-destructive/10 p-4 border border-destructive/30">
          <div className="text-sm text-destructive">{error}</div>
        </div>
      )}

      {/* Status Filter */}
      <div className="flex space-x-2">
        {statuses.map(status => (
          <button
            key={status.value}
            onClick={() => setSelectedStatus(status.value)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              selectedStatus === status.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-muted-foreground hover:bg-secondary'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Repairs List */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-muted-foreground">Loading repairs...</div>
          </div>
        ) : repairs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No repairs found</p>
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary mt-4 py-2 px-4 text-sm font-medium"
            >
              Create Your First Repair
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-secondary">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Device
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Complaint
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Cost
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Delivery Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {repairs.map(repair => (
                  <tr key={repair.id} className="hover:bg-secondary">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-foreground">{repair.customerName}</div>
                        <div className="text-sm text-muted-foreground">{repair.customerPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-foreground">{repair.deviceType}</div>
                        <div className="text-sm text-muted-foreground">{repair.deviceModel}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-foreground max-w-xs truncate">{repair.complaint}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          ₹{repair.estimatedCost.toFixed(2)}
                        </div>
                        {repair.actualCost && (
                          <div className="text-xs text-muted-foreground">
                            Actual: ₹{repair.actualCost.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(repair.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {repair.estimatedDelivery ? formatDate(repair.estimatedDelivery) : '-'}
                      {repair.actualDelivery && (
                        <div className="text-xs">
                          Delivered: {formatDate(repair.actualDelivery)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {repair.status !== 'DELIVERED' && (
                          <>
                            {repair.status === 'PENDING' && (
                              <button
                                onClick={() => handleStatusUpdate(repair.id, 'IN_PROGRESS')}
                                className="text-primary hover:text-primary-dark"
                              >
                                Start Repair
                              </button>
                            )}
                            {repair.status === 'IN_PROGRESS' && (
                              <button
                                onClick={() => handleStatusUpdate(repair.id, 'COMPLETED')}
                                className="text-success hover:text-success"
                              >
                                Mark Completed
                              </button>
                            )}
                            {repair.status === 'COMPLETED' && (
                              <button
                                onClick={() => handleMarkDelivered(repair.id)}
                                className="text-accent hover:text-accent-dark"
                              >
                                Mark Delivered
                              </button>
                            )}
                            <button
                              onClick={() => handleOpenSparesModal(repair.id)}
                              className="text-primary hover:text-primary-dark ml-2 flex items-center"
                              title="Add Spares"
                            >
                              <Wrench className="w-4 h-4 mr-1" /> Spares
                            </button>
                            <button
                              onClick={() => handleShareWhatsApp(repair)}
                              className="text-success hover:text-success ml-2 flex items-center"
                              title="Share on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
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
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">New Repair Job</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmitNewRepair} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Name */}
                  <div>
                    <label htmlFor="customerName" className="block text-sm font-medium text-muted-foreground mb-2">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      value={newRepair.customerName}
                      onChange={(e) => setNewRepair({...newRepair, customerName: e.target.value})}
                      className="input-field sm:text-sm"
                      required
                    />
                  </div>

                  {/* Customer Phone */}
                  <div>
                    <label htmlFor="customerPhone" className="block text-sm font-medium text-muted-foreground mb-2">
                      Customer Phone *
                    </label>
                    <input
                      type="tel"
                      id="customerPhone"
                      value={newRepair.customerPhone}
                      onChange={(e) => setNewRepair({...newRepair, customerPhone: e.target.value})}
                      className="input-field sm:text-sm"
                      required
                      pattern="[6-9]\d{9}"
                      maxLength={10}
                    />
                  </div>

                  {/* Device Type */}
                  <div>
                    <label htmlFor="deviceType" className="block text-sm font-medium text-muted-foreground mb-2">
                      Device Type
                    </label>
                    <select
                      id="deviceType"
                      value={newRepair.deviceType}
                      onChange={(e) => setNewRepair({...newRepair, deviceType: e.target.value})}
                      className="input-field sm:text-sm"
                    >
                      <option value="">Select Device Type</option>
                      {deviceTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Device Model */}
                  <div>
                    <label htmlFor="deviceModel" className="block text-sm font-medium text-muted-foreground mb-2">
                      Device Model
                    </label>
                    <input
                      type="text"
                      id="deviceModel"
                      value={newRepair.deviceModel}
                      onChange={(e) => setNewRepair({...newRepair, deviceModel: e.target.value})}
                      placeholder="e.g., iPhone 13, Samsung Galaxy S21"
                      className="input-field sm:text-sm"
                    />
                  </div>
                </div>

                {/* Complaint */}
                <div>
                  <label htmlFor="complaint" className="block text-sm font-medium text-muted-foreground mb-2">
                    Complaint/Issue *
                  </label>
                  <textarea
                    id="complaint"
                    value={newRepair.complaint}
                    onChange={(e) => setNewRepair({...newRepair, complaint: e.target.value})}
                    rows={3}
                    className="input-field sm:text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Estimated Cost */}
                  <div>
                    <label htmlFor="estimatedCost" className="block text-sm font-medium text-muted-foreground mb-2">
                      Estimated Cost (₹) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-muted-foreground sm:text-sm">₹</span>
                      </div>
                      <input
                        type="number"
                        id="estimatedCost"
                        value={newRepair.estimatedCost}
                        onChange={(e) => setNewRepair({...newRepair, estimatedCost: e.target.value})}
                        step="0.01"
                        min="1"
                        className="input-field pl-7 sm:text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Estimated Delivery */}
                  <div>
                    <label htmlFor="estimatedDelivery" className="block text-sm font-medium text-muted-foreground mb-2">
                      Estimated Delivery Date
                    </label>
                    <input
                      type="date"
                      id="estimatedDelivery"
                      value={newRepair.estimatedDelivery}
                      onChange={(e) => setNewRepair({...newRepair, estimatedDelivery: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      className="input-field sm:text-sm"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary py-2 px-4 text-sm font-medium disabled:opacity-50"
                  >
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
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">Add Spares to Repair</h2>
                <button
                  onClick={() => setShowSparesModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddSpares} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Select Spare Part
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="input-field sm:text-sm"
                    required
                  >
                    <option value="">-- Select Part --</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} - ₹{p.price} (Stock: {p.stockQty})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={partQuantity}
                    onChange={(e) => setPartQuantity(parseInt(e.target.value) || 1)}
                    min="1"
                    className="input-field sm:text-sm"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowSparesModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !selectedProductId}
                    className="btn-primary py-2 px-4 text-sm font-medium disabled:opacity-50"
                  >
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