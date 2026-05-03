import { useState, useEffect } from 'react';
import { staffService, type Repair } from '../../services/staff.service';
import { MessageCircle, CheckCircle } from 'lucide-react';

export const StaffRepairsPage = () => {
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const statuses = [
    { value: 'ALL', label: 'All Repairs', color: 'gray' },
    { value: 'PENDING', label: 'Pending', color: 'yellow' },
    { value: 'IN_PROGRESS', label: 'In Progress', color: 'blue' },
    { value: 'COMPLETED', label: 'Completed', color: 'green' },
    { value: 'DELIVERED', label: 'Delivered', color: 'purple' },
  ];

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

  const handleShareWhatsApp = (repair: Repair) => {
    const text = `Hi ${repair.customerName},\n\nYour repair ticket (Device: ${repair.deviceModel}) is currently: ${repair.status}.\nEstimated Cost: ₹${repair.estimatedCost.toFixed(2)}.\n\nThank you for choosing LOTCHAN MOBILES!`;
    const url = `https://wa.me/${repair.customerPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleFinalBilling = async (repairId: string, estimatedCost: number) => {
    const actualCostStr = prompt(`Enter final billing amount (Estimated: ₹${estimatedCost}):`, estimatedCost.toString());
    if (actualCostStr && !isNaN(parseFloat(actualCostStr))) {
      try {
        await staffService.updateRepairStatus(repairId, 'DELIVERED', parseFloat(actualCostStr));
        fetchRepairs();
        alert('Repair marked as DELIVERED and final billing recorded successfully.');
      } catch (err: any) {
        setError(err.message || 'Failed to complete final billing');
      }
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
        <h1 className="text-2xl font-bold text-foreground">Repair Tracking & Billing</h1>
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
            <p className="text-muted-foreground">No repairs found for the selected status.</p>
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
                    Cost Info
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Dates
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
                          Est: ₹{repair.estimatedCost.toFixed(2)}
                        </div>
                        {repair.actualCost && (
                          <div className="text-xs font-bold text-success">
                            Paid: ₹{repair.actualCost.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(repair.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      <div className="text-xs">
                        Est: {repair.estimatedDelivery ? formatDate(repair.estimatedDelivery) : '-'}
                      </div>
                      {repair.actualDelivery && (
                        <div className="text-xs text-success">
                          Done: {formatDate(repair.actualDelivery)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleShareWhatsApp(repair)}
                          className="text-success hover:text-success flex items-center"
                          title="Share Status on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" /> Notify
                        </button>
                        
                        {repair.status === 'COMPLETED' && (
                          <button
                            onClick={() => handleFinalBilling(repair.id, repair.estimatedCost)}
                            className="text-primary hover:text-primary-dark ml-3 flex items-center font-bold"
                            title="Perform Final Billing and Mark Delivered"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" /> Final Billing
                          </button>
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
    </div>
  );
};
