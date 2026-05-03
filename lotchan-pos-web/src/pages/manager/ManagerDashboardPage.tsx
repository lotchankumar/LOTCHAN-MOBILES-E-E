import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { managerService, type CashflowData } from '../../services/manager.service';
import { AlertTriangle, X, RefreshCw } from 'lucide-react';
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

  const cashflowChartData = cashflowData?.cashInflows
    ? [
        { name: 'Sales', inflows: cashflowData.cashInflows.sales ?? 0, outflows: 0 },
        { name: 'Purchases', inflows: 0, outflows: cashflowData.cashOutflows?.purchases ?? 0 },
        { name: 'Expenses', inflows: 0, outflows: cashflowData.cashOutflows?.expenses ?? 0 },
      ]
    : [];

  return (
    <div className="space-y-6 pos-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#d2e4ff]">Manager Dashboard</h2>
          <p className="text-xs text-slate-500 mt-1">Daily cash reconciliation & analytics</p>
        </div>
        <button onClick={fetchCashflowData} disabled={loading} className="pos-btn-primary flex items-center gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Loading...' : 'Refresh'}
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

      {/* Cashflow Section */}
      <div className="pos-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="pos-section-header mb-0">
            <div className="pos-section-bar" />
            <h3 className="pos-section-title">Daily Cash Reconciliation</h3>
          </div>
          <div className="flex flex-wrap items-end gap-3 mt-4 md:mt-0">
            {user?.role === UserRole.ADMIN && (
              <div>
                <label className="pos-label">Branch</label>
                <select value={cashflowBranchId} onChange={e => setCashflowBranchId(e.target.value)} className="pos-select min-w-[200px]">
                  <option value="">-- Select a Branch --</option>
                  {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="pos-label">Date</label>
              <input type="date" value={cashflowDate} onChange={e => setCashflowDate(e.target.value)} className="pos-input [color-scheme:dark]" />
            </div>
            <button onClick={fetchCashflowData} disabled={loading} className="pos-btn-primary">Apply</button>
          </div>
        </div>

        {user?.role === UserRole.ADMIN && !cashflowBranchId ? (
          <div className="text-center py-16 text-slate-500 border-2 border-dashed border-white/5 rounded-lg mt-6">
            Please select a branch to view cashflow data.
          </div>
        ) : cashflowData && (
          <div className="space-y-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="pos-metric-card">
                <div className="pos-metric-label">Opening Balance</div>
                <div className="pos-metric-value pos-metric-value-blue">₹{cashflowData.openingBalance.toFixed(2)}</div>
              </div>
              <div className="pos-metric-card">
                <div className="pos-metric-label">Total Inflows</div>
                <div className="pos-metric-value pos-metric-value-green">₹{cashflowData.cashInflows.total.toFixed(2)}</div>
              </div>
              <div className="pos-metric-card">
                <div className="pos-metric-label">Total Outflows</div>
                <div className="pos-metric-value pos-metric-value-red">₹{cashflowData.cashOutflows.total.toFixed(2)}</div>
              </div>
              <div className="pos-metric-card">
                <div className="pos-metric-label">Expected Closing</div>
                <div className="pos-metric-value pos-metric-value-cyan">₹{cashflowData.expectedClosingBalance.toFixed(2)}</div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="pos-glass rounded-xl p-5">
                <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Cash Inflows</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Sales</span>
                  <span className="font-medium text-green-400">₹{cashflowData.cashInflows.sales.toFixed(2)}</span>
                </div>
              </div>
              <div className="pos-glass rounded-xl p-5">
                <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Cash Outflows</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Purchases</span>
                    <span className="font-medium text-red-400">₹{cashflowData.cashOutflows.purchases.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Expenses</span>
                    <span className="font-medium text-red-400">₹{cashflowData.cashOutflows.expenses.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="pos-glass rounded-xl p-5">
              <div className="h-80 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <BarChart data={cashflowChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      formatter={(value) => [`₹${Number(value).toFixed(2)}`, 'Amount']}
                      contentStyle={{ backgroundColor: '#00213d', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#d2e4ff' }}
                      itemStyle={{ color: '#aec8f0' }}
                    />
                    <Legend />
                    <Bar dataKey="inflows" name="Cash Inflows" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="outflows" name="Cash Outflows" fill="#f87171" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="pos-metric-card">
                <div className="pos-metric-label">{cashflowData.variance >= 0 ? 'Surplus' : 'Shortage'}</div>
                <div className={`pos-metric-value ${cashflowData.variance >= 0 ? 'pos-metric-value-green' : 'pos-metric-value-red'}`}>
                  ₹{Math.abs(cashflowData.variance).toFixed(2)}
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  Actual: ₹{cashflowData.actualClosingBalance.toFixed(2)} • Expected: ₹{cashflowData.expectedClosingBalance.toFixed(2)}
                </div>
              </div>
              <div className="pos-metric-card">
                <div className="pos-metric-label">Cash Sessions</div>
                <div className="pos-metric-value">{cashflowData.cashSessions.length}</div>
                <div className="text-xs text-slate-500 mt-2">Active staff sessions for the day</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};