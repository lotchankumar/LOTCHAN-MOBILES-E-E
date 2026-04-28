import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { managerService, type CashflowData } from '../../services/manager.service';
import { AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { useBranchesQuery } from '../../hooks/useManagers';
import { UserRole } from '../../types';

export const ManagerDashboardPage = () => {
  const { user } = useAuthStore();
  const { branches } = useBranchesQuery();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cashflowData, setCashflowData] = useState<CashflowData | null>(null);
  const [cashflowBranchId, setCashflowBranchId] = useState<string>('');
  
  // Date for cashflow
  const [cashflowDate, setCashflowDate] = useState(
    new Date().toISOString().split('T')[0]
  );



  const fetchCashflowData = async () => {
    if (!cashflowDate) return;
    if (user?.role === UserRole.ADMIN && !cashflowBranchId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await managerService.getDailyCashflow(cashflowDate, cashflowBranchId);
      setCashflowData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load cashflow data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === UserRole.ADMIN && !cashflowBranchId) return;
    fetchCashflowData();
  }, [cashflowBranchId]);

  const handleCashflowDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCashflowDate(e.target.value);
  };

  const handleRefresh = () => {
    fetchCashflowData();
  };

  // Prepare cashflow data for bar chart (with defensive null checks)
  const cashflowChartData = cashflowData?.cashInflows
    ? [
        { name: 'Sales', inflows: cashflowData.cashInflows.sales ?? 0, outflows: 0 },
        { name: 'Purchases', inflows: 0, outflows: cashflowData.cashOutflows?.purchases ?? 0 },
        { name: 'Expenses', inflows: 0, outflows: cashflowData.cashOutflows?.expenses ?? 0 },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Manager Dashboard</h2>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="btn-primary py-2 px-4 text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Cashflow Section */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-foreground">Daily Cash Reconciliation</h3>
          <div className="flex flex-wrap items-end gap-4 mt-4 md:mt-0">
            {user?.role === UserRole.ADMIN && (
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Select Branch</label>
                <select
                  value={cashflowBranchId}
                  onChange={(e) => setCashflowBranchId(e.target.value)}
                  className="input-field sm:text-sm min-w-[200px]"
                >
                  <option value="">-- Select a Branch --</option>
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Date</label>
              <input
                type="date"
                value={cashflowDate}
                onChange={handleCashflowDateChange}
                className="input-field sm:text-sm"
              />
            </div>
            <div className="self-end">
              <button
                onClick={fetchCashflowData}
                disabled={loading}
                className="btn-primary py-2 px-4 text-sm font-medium disabled:opacity-50"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {user?.role === UserRole.ADMIN && !cashflowBranchId ? (
          <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-lg mt-6">
            Please select a branch to view cashflow data.
          </div>
        ) : cashflowData && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="text-sm text-primary">Opening Balance</div>
                <div className="text-2xl font-bold text-primary-dark">₹{cashflowData.openingBalance.toFixed(2)}</div>
              </div>
              <div className="bg-success/10 p-4 rounded-lg">
                <div className="text-sm text-success">Total Inflows</div>
                <div className="text-2xl font-bold text-success">₹{cashflowData.cashInflows.total.toFixed(2)}</div>
              </div>
              <div className="bg-destructive/10 p-4 rounded-lg">
                <div className="text-sm text-destructive">Total Outflows</div>
                <div className="text-2xl font-bold text-destructive">₹{cashflowData.cashOutflows.total.toFixed(2)}</div>
              </div>
              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="text-sm text-accent">Expected Closing</div>
                <div className="text-2xl font-bold text-accent-dark">₹{cashflowData.expectedClosingBalance.toFixed(2)}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-muted-foreground mb-3">Cash Inflows Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sales</span>
                    <span className="font-medium">₹{cashflowData.cashInflows.sales.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-muted-foreground mb-3">Cash Outflows Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Purchases</span>
                    <span className="font-medium">₹{cashflowData.cashOutflows.purchases.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expenses</span>
                    <span className="font-medium">₹{cashflowData.cashOutflows.expenses.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-80 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={cashflowChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${Number(value).toFixed(2)}`, 'Amount']} />
                  <Legend />
                  <Bar dataKey="inflows" name="Cash Inflows" fill="#4ade80" />
                  <Bar dataKey="outflows" name="Cash Outflows" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${
                cashflowData.variance >= 0 ? 'bg-success/10' : 'bg-destructive/10'
              }`}>
                <div className="text-sm font-medium">
                  {cashflowData.variance >= 0 ? 'Surplus' : 'Shortage'}
                </div>
                <div className={`text-2xl font-bold ${
                  cashflowData.variance >= 0 ? 'text-success' : 'text-destructive'
                }`}>
                  ₹{Math.abs(cashflowData.variance).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Actual: ₹{cashflowData.actualClosingBalance.toFixed(2)} • Expected: ₹{cashflowData.expectedClosingBalance.toFixed(2)}
                </div>
              </div>
              
              <div className="bg-secondary p-4 rounded-lg">
                <div className="text-sm font-medium text-muted-foreground">Cash Sessions</div>
                <div className="text-2xl font-bold text-foreground">{cashflowData.cashSessions.length}</div>
                <div className="text-sm text-muted-foreground mt-1">Active staff sessions for the day</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};