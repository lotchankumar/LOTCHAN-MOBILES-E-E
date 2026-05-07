import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { UserRole } from '../../types';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useBranchesQuery } from '../../hooks/useManagers';
import { managerService } from '../../services/manager.service';
import './AdminPage.css';

export const AdminPage = () => {
  const { user } = useAuthStore();
  const { branches } = useBranchesQuery();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === UserRole.ADMIN) {
      managerService.getDashboardStats().then(data => {
        setStats(data);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    }
  }, [user]);

  if (user?.role !== UserRole.ADMIN) {
    return <div className="p-8 text-center text-white">Access Denied</div>;
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const techData = stats?.technicianPerformance || [
    { name: 'REPAIRS', value: 0, fill: '#3b82f6' },
  ];

  // Colors for tech chart
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#94a3b8'];
  techData.forEach((d: any, i: number) => d.fill = colors[i % colors.length]);

  const smartphones = stats?.stockValuation?.byCategory?.find((c: any) => c.name.toUpperCase() === 'MOBILE')?.units || 0;
  const accessories = stats?.stockValuation?.byCategory?.find((c: any) => c.name.toUpperCase() === 'ACCESSORY')?.units || 0;
  const totalUnits = Math.max(stats?.stockValuation?.totalUnits || 1, 1);
  const smartPhonesPct = Math.round((smartphones / totalUnits) * 100);
  const accessoriesPct = Math.round((accessories / totalUnits) * 100);

  const profitMargin = stats?.salesMtd ? ((stats.profitMtd / stats.salesMtd) * 100).toFixed(1) : '0.0';

  if (loading) {
    return <div className="p-8 text-center text-white font-bold animate-pulse">Initializing Command Center...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-wide">SYSTEM OVERVIEW</h1>
          <p className="text-slate-400 text-sm mt-1">Global monitoring of Lotchan Mobiles Ecosystem</p>
        </div>
        <div>
          <Link to="/admin/branches" className="bg-[#93c5fd] text-[#0f172a] font-bold px-4 py-2 rounded flex items-center gap-2 hover:bg-[#bfdbfe] transition-colors text-xs tracking-wider uppercase">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            New Branch
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sales */}
        <div className="admin-glass-panel rounded-lg p-5 border-t-2 border-t-[#3b82f6]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Total Sales (MTD)</p>
          <h3 className="text-2xl font-bold text-white mb-2">{formatCurrency(stats?.salesMtd || 0)}</h3>
          <p className="text-[#10b981] text-xs font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> Real-time
          </p>
        </div>

        {/* Profit */}
        <div className="admin-glass-panel rounded-lg p-5 border-t-2 border-t-[#10b981]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Gross Profit</p>
          <h3 className="text-2xl font-bold text-white mb-2">{formatCurrency(stats?.profitMtd || 0)}</h3>
          <p className="text-slate-500 text-xs font-medium">MARGIN: {profitMargin}%</p>
        </div>

        {/* Liabilities */}
        <div className="admin-glass-panel rounded-lg p-5 border-t-2 border-t-[#f59e0b]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Unpaid Payables</p>
          <h3 className="text-2xl font-bold text-white mb-2">{formatCurrency(stats?.liabilities || 0)}</h3>
          <p className="text-slate-500 text-xs font-medium uppercase">Current Quarter</p>
        </div>

        {/* Stock Valuation */}
        <div className="admin-glass-panel rounded-lg p-5 border-t-2 border-t-[#94a3b8]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Stock Valuation</p>
          <h3 className="text-2xl font-bold text-white mb-2">{formatCurrency(stats?.stockValuation?.totalValue || 0)}</h3>
          <p className="text-slate-500 text-xs font-medium uppercase">Cross-Branch Total</p>
        </div>
      </div>

      {/* Row 1: Branch Management & User Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Branch Management */}
        <div className="lg:col-span-3 admin-glass-panel rounded-xl overflow-hidden">
          <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#0d1b2a]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3b82f6] text-[20px]">hub</span>
              <h3 className="font-bold text-white text-sm">Branch Management</h3>
            </div>
            <Link to="/admin/branches" className="text-[#3b82f6] text-[10px] font-bold uppercase tracking-widest hover:text-[#60a5fa] transition-colors">View All Branches</Link>
          </div>
          {/* Scrollable table with sticky header */}
          <div className="overflow-x-auto">
            <div className="overflow-y-auto max-h-[260px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-[#3b82f6]/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#3b82f6]">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-[#0b1727]">
                    <th className="px-5 py-3">Branch Name</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Manager</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                  {branches?.map((branch) => (
                    <tr key={branch.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-4 font-bold text-white">{branch.name}</td>
                      <td className="px-5 py-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30">ACTIVE</span>
                      </td>
                      <td className="px-5 py-4 text-slate-400">System</td>
                      <td className="px-5 py-4 text-right">
                        <Link to="/admin/branches" className="text-slate-500 hover:text-white transition-colors">
                          <span className="material-symbols-outlined text-[18px]">settings</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {(!branches || branches.length === 0) && (
                    <tr>
                      <td colSpan={4} className="px-5 py-8 text-center text-slate-500">No branches configured.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Performing Branches */}
        <div className="lg:col-span-2 admin-glass-panel rounded-xl overflow-hidden flex flex-col h-[380px]">
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/5 flex justify-between items-center bg-[#0d1b2a] shrink-0">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f59e0b] text-[20px]">workspace_premium</span>
              <div>
                <h3 className="font-bold text-white text-sm">Top Performing Branches</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Ranked by order volume</p>
              </div>
            </div>
            <Link to="/admin/branches" className="text-[#3b82f6] text-[10px] font-bold uppercase tracking-widest hover:text-[#60a5fa] transition-colors">
              View All
            </Link>
          </div>

          {/* Branch list */}
          <div className="overflow-y-auto flex-1 p-4 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-[#3b82f6]/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#3b82f6]">
            {(() => {
              const sorted = [...(branches || [])].sort((a, b) => (b._count?.orders || 0) - (a._count?.orders || 0));
              const maxOrders = sorted[0]?._count?.orders || 1;
              const medals = ['🥇', '🥈', '🥉'];
              const medalColors = [
                { bg: 'bg-[#f59e0b]/10', border: 'border-[#f59e0b]/30', bar: '#f59e0b', rank: 'text-[#f59e0b]' },
                { bg: 'bg-[#94a3b8]/10', border: 'border-[#94a3b8]/30', bar: '#94a3b8', rank: 'text-[#94a3b8]' },
                { bg: 'bg-[#cd7f32]/10', border: 'border-[#cd7f32]/30', bar: '#cd7f32', rank: 'text-[#cd7f32]' },
              ];

              if (sorted.length === 0) {
                return (
                  <div className="flex flex-col items-center justify-center py-10 text-slate-500">
                    <span className="material-symbols-outlined text-[40px] mb-2 opacity-30">storefront</span>
                    <p className="text-sm">No branch data available.</p>
                  </div>
                );
              }

              return sorted.map((branch, i) => {
                const orders = branch._count?.orders || 0;
                const staff = branch._count?.users || 0;
                const pct = Math.round((orders / maxOrders) * 100);
                const style = medalColors[i] || { bg: 'bg-white/5', border: 'border-white/5', bar: '#3b82f6', rank: 'text-slate-500' };

                return (
                  <div key={branch.id} className={`rounded-xl p-3.5 border ${style.bg} ${style.border} transition-all hover:brightness-110`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-lg shrink-0">{medals[i] ?? `#${i + 1}`}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white truncate">{branch.name}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider">{staff} staff</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <p className={`text-base font-black ${style.rank}`}>{orders}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">orders</p>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, backgroundColor: style.bar }}
                      />
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>

      {/* Section Divider - Global Inventory */}
      <div className="flex items-center gap-4 pt-4">
        <div className="w-1 h-6 bg-[#3b82f6] rounded"></div>
        <h2 className="text-xl font-bold text-white">Global Inventory Module</h2>
        <div className="ml-auto flex gap-3">
          <Link to="/admin/inventory" className="bg-[#1e293b] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded flex items-center gap-2 hover:bg-[#334155] transition-colors border border-white/10">
            <span className="material-symbols-outlined text-[14px]">swap_horiz</span> Stock Transfer
          </Link>
          <button className="bg-[#1e293b] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded flex items-center gap-2 hover:bg-[#334155] transition-colors border border-white/10">
            <span className="material-symbols-outlined text-[14px]">qr_code_scanner</span> IMEI Lookup
          </button>
        </div>
      </div>

      {/* Row 2: Inventory Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Breakdown */}
        <div className="admin-glass-panel p-5 rounded-xl">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6">Stock Breakdown</h4>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Smartphones</span>
                <span className="text-white font-bold">{smartphones} units</span>
              </div>
              <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#3b82f6] h-full rounded-full" style={{ width: `${smartPhonesPct}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Accessories</span>
                <span className="text-white font-bold">{accessories} units</span>
              </div>
              <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#3b82f6] h-full rounded-full opacity-50" style={{ width: `${accessoriesPct}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Low Stock */}
        <div className="admin-glass-panel p-5 rounded-xl border border-[#ef4444]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ef4444]/5 blur-[50px] rounded-full"></div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#ef4444] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px]">error</span> Critical Low Stock
          </h4>
          <div className="space-y-3 z-10 relative">
            {stats?.lowStock?.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center p-2 rounded bg-[#0d1b2a] border border-[#ef4444]/30">
                <span className="text-xs text-slate-300 truncate w-2/3">{item.name}</span>
                <span className="text-xs font-bold text-[#ef4444]">{item.stockQty} left</span>
              </div>
            ))}
            {(!stats?.lowStock || stats.lowStock.length === 0) && (
              <div className="text-xs text-[#10b981] font-bold text-center py-4">Stock levels are healthy!</div>
            )}
          </div>
        </div>

        {/* Supplier Orders */}
        <div className="admin-glass-panel p-5 rounded-xl">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6">Recent Supplier Orders</h4>
          <div className="space-y-4 text-xs">
            {stats?.supplierOrders?.map((po: any) => (
              <div key={po.id} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <span className="text-slate-300 truncate w-1/2">{po.supplierName}</span>
                <span className={`font-bold uppercase tracking-wider text-[9px] ${po.status === 'SENT' ? 'text-[#3b82f6]' : 'text-[#f59e0b]'}`}>{po.status.replace('_', ' ')}</span>
              </div>
            ))}
            {(!stats?.supplierOrders || stats.supplierOrders.length === 0) && (
              <div className="text-slate-500 text-center py-4">No active orders.</div>
            )}
          </div>
        </div>
      </div>

      {/* Section Divider - Reports */}
      <div className="flex items-center gap-4 pt-4">
        <div className="w-1 h-6 bg-[#3b82f6] rounded"></div>
        <h2 className="text-xl font-bold text-white">Reports & Performance Analytics</h2>
      </div>

      {/* Row 3: Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <div className="lg:col-span-2 admin-glass-panel p-5 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Technician Performance Metrics</h4>
            <div className="bg-[#1e293b] px-3 py-1 rounded text-[10px] text-slate-300 border border-white/10">MTD Completed</div>
          </div>
          <div className="h-48 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={techData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 9 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} allowDecimals={false} />
                <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0b1727', border: '1px solid #1e293b', borderRadius: '8px' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {techData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Health */}
        <div className="admin-glass-panel p-5 rounded-xl flex flex-col justify-between">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6">Inventory Health</h4>

            <div className="mb-4">
              <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-2">System Status</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Total Branches</span>
                  <span className="text-white font-bold">{branches?.length || 0}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Active Mangers</span>
                  <span className="text-white font-bold">{stats?.users?.length || 0}</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#ef4444] mb-2 mt-6">Attention Required</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Critical Low Stock</span>
                  <span className="text-[#ef4444] font-bold">{stats?.lowStock?.length || 0} items</span>
                </div>
              </div>
            </div>
          </div>

          <Link to="/admin/inventory" className="text-center block w-full mt-6 bg-[#1e293b] text-white text-[10px] font-bold uppercase tracking-widest py-3 rounded hover:bg-[#334155] transition-colors border border-white/10">
            View Full Report
          </Link>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="mt-8 relative overflow-hidden rounded-xl border border-white/10 bg-[#0b1727] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/10 to-transparent"></div>
        <div className="relative flex items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6]/30 flex items-center justify-center text-[#3b82f6]">
            <span className="material-symbols-outlined text-2xl">shield</span>
          </div>
          <div>
            <h3 className="text-white font-bold mb-1">SECURITY & TAX PROTOCOL</h3>
            <p className="text-slate-400 text-xs">Centralized control for GST slabs, regional tax overrides, and real-time audit logging for every head office session activity.</p>
          </div>
        </div>
        <div className="relative flex gap-3 shrink-0">
          <Link to="/admin/security" className="bg-[#040d1a] border border-[#3b82f6]/30 text-white text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded hover:bg-[#3b82f6]/10 transition-colors text-center w-32">
            Audit Trail
          </Link>
          <Link to="/admin/settings" className="bg-[#1e3a8a] border border-[#3b82f6] text-white text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded hover:bg-[#1d4ed8] transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] text-center w-32">
            Tax Config
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-6 pb-4">
        <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">Master Server Online <span className="mx-2 font-normal">|</span> V4.2.1-SECURE</span>
      </div>

    </div>
  );
};

export default AdminPage;
