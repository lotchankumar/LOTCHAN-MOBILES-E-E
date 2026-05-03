import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { UserRole } from '../../types';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { managerService, type ProfitData } from '../../services/manager.service';
import { useBranchesQuery } from '../../hooks/useManagers';
import './AdminPage.css';

export const AdminPage = () => {
  const { user, logout } = useAuthStore();
  const { branches } = useBranchesQuery();

  const [profitBranchId, setProfitBranchId] = useState<string>('all');
  const [profitData, setProfitData] = useState<ProfitData | null>(null);
  const [profitLoading, setProfitLoading] = useState(false);
  const [profitError, setProfitError] = useState<string | null>(null);
  const [profitDateRange, setProfitDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const COLORS = ['#2593f2', '#002a4d', '#aec8f0', '#1a3654', '#7892b7'];

  const fetchProfitData = async () => {
    if (!profitBranchId || !profitDateRange.startDate || !profitDateRange.endDate) return;
    setProfitLoading(true);
    setProfitError(null);
    try {
      const data = await managerService.getProfit(profitDateRange.startDate, profitDateRange.endDate, profitBranchId);
      setProfitData(data);
    } catch (err: any) {
      setProfitError(err.message || 'Failed to load profit data');
    } finally {
      setProfitLoading(false);
    }
  };

  useEffect(() => {
    if (profitBranchId && user?.role === UserRole.ADMIN) {
      fetchProfitData();
    }
  }, [profitBranchId]);

  if (user?.role !== UserRole.ADMIN) {
    return <div className="p-8 text-center text-white">Access Denied</div>;
  }

  // Calculate percentages
  const categoryData = profitData?.categoryProfit 
    ? Object.entries(profitData.categoryProfit).filter(([_, v]) => v > 0).map(([name, value]) => ({ name, value }))
    : [];
  const totalProfit = profitData?.totalProfit || 0;

  return (
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Page Title */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-[32px] md:text-[40px] leading-[1.2] tracking-tight font-bold text-[#d2e4ff] uppercase">LOTCHAN MOBILES ADMINISTRATION</h1>
                <p className="text-[#7892b7] text-[14px] font-light">Operational control center and performance metrics</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#a1c9ff] text-sm font-medium">System Status: Optimal</span>
                <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] animate-pulse"></div>
              </div>
            </div>

            {/* Warning Banner */}
            <div className="admin-glass-panel admin-glow-amber px-6 py-4 rounded-xl flex items-center gap-4 border-l-4 border-amber-500/50">
              <span className="material-symbols-outlined text-amber-500">warning</span>
              <div>
                <p className="font-sans text-amber-200/90 text-xs uppercase tracking-[0.2em] font-medium">Security Protocol Active</p>
                <p className="text-[#d2e4ff] text-sm font-medium mt-1">Administrator Access Only: All session activities are being logged for security compliance.</p>
              </div>
            </div>

            {/* Overall Analytics Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-[#aec8f0] rounded-full"></div>
                <h2 className="text-[24px] font-semibold text-[#d2e4ff]">Overall Analytics</h2>
              </div>
              
              {/* Dynamic Filter Controls (subtle) */}
              <div className="flex flex-wrap items-center gap-4 bg-[#1a3654]/30 p-3 rounded-lg border border-white/5">
                <select
                  value={profitBranchId}
                  onChange={(e) => setProfitBranchId(e.target.value)}
                  className="bg-[#0b2a4a] text-[#d2e4ff] border border-white/10 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#aec8f0]"
                >
                  <option value="all">Overall (All Branches)</option>
                  {branches?.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={profitDateRange.startDate}
                  onChange={(e) => setProfitDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                  className="bg-[#0b2a4a] text-[#d2e4ff] border border-white/10 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#aec8f0] [color-scheme:dark]"
                />
                <input
                  type="date"
                  value={profitDateRange.endDate}
                  onChange={(e) => setProfitDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                  className="bg-[#0b2a4a] text-[#d2e4ff] border border-white/10 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#aec8f0] [color-scheme:dark]"
                />
                <button
                  onClick={fetchProfitData}
                  disabled={profitLoading}
                  className="bg-[#aec8f0] text-[#153152] font-semibold px-4 py-1.5 rounded text-sm hover:bg-white transition-colors"
                >
                  Apply Filter
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Metric Card 1 */}
                <div className="admin-glass-panel p-6 rounded-xl relative overflow-hidden group hover:border-[#aec8f0]/50 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-6xl">corporate_fare</span>
                  </div>
                  <p className="text-[#c4c6cf] font-sans text-xs uppercase tracking-widest mb-2 font-medium">Total Branches</p>
                  <h3 className="text-4xl font-bold text-[#d2e4ff]">{branches?.length || 0}</h3>
                  <div className="mt-4 flex items-center gap-2 text-blue-400 text-sm">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    <span>System Active</span>
                  </div>
                </div>

                {/* Metric Card 2 */}
                <div className="admin-glass-panel p-6 rounded-xl relative overflow-hidden group hover:border-[#aec8f0]/50 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-6xl">payments</span>
                  </div>
                  <p className="text-[#c4c6cf] font-sans text-xs uppercase tracking-widest mb-2 font-medium">Total Profit</p>
                  <h3 className="text-4xl font-bold text-[#d2e4ff]">
                    {profitLoading ? '...' : `₹${totalProfit.toLocaleString('en-IN')}`}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-blue-400 text-sm">
                    <span className="material-symbols-outlined text-sm">show_chart</span>
                    <span>Current Selection</span>
                  </div>
                </div>

                {/* Metric Card 3 */}
                <div className="admin-glass-panel p-6 rounded-xl relative overflow-hidden group hover:border-[#aec8f0]/50 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-6xl">check_circle</span>
                  </div>
                  <p className="text-[#c4c6cf] font-sans text-xs uppercase tracking-widest mb-2 font-medium">Active Branches</p>
                  <h3 className="text-4xl font-bold text-[#d2e4ff]">{branches?.length || 0}</h3>
                  <div className="mt-4 flex items-center gap-2 text-slate-300 text-sm">
                    <span className="material-symbols-outlined text-sm">info</span>
                    <span>Operational</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Profit Breakdown Bento Grid */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-[#aec8f0] rounded-full"></div>
                <h2 className="text-[24px] font-semibold text-[#d2e4ff]">Overall & Branchwise Profit Analytics</h2>
              </div>

              {profitError && (
                <div className="mb-4 p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-red-200">
                  <span className="material-symbols-outlined text-sm mr-2 align-middle">error</span>
                  {profitError}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Pie Chart Component */}
                <div className="lg:col-span-2 admin-glass-panel p-6 rounded-xl flex flex-col md:flex-row items-center gap-8">
                  <div className="relative w-64 h-64 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData.length > 0 ? categoryData : [{name: 'No Data', value: 1}]}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={100}
                          stroke="none"
                          dataKey="value"
                        >
                          {categoryData.length > 0 ? categoryData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          )) : <Cell fill="#1a3654" />}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Profit']}
                          contentStyle={{ backgroundColor: '#001429', borderColor: '#1a3654', color: '#d2e4ff' }}
                          itemStyle={{ color: '#aec8f0' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span className="text-xl font-bold text-white">Profit</span>
                      <span className="text-[10px] uppercase text-slate-200">Distribution</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 w-full">
                    <h4 className="text-[18px] text-[#d2e4ff] font-semibold">Category-wise Profit Distribution</h4>
                    <div className="space-y-4">
                      {categoryData.slice(0, 4).map((category, index) => {
                        const percentage = totalProfit > 0 ? (category.value / totalProfit) * 100 : 0;
                        return (
                          <div key={category.name}>
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <span className="text-sm">{category.name.replace('_', ' ')}</span>
                              </div>
                              <span className="text-sm font-bold">₹{category.value.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full shadow-[0_0_8px_rgba(37,147,242,0.4)]" 
                                style={{ 
                                  width: `${percentage}%`,
                                  backgroundColor: COLORS[index % COLORS.length] 
                                }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                      {categoryData.length === 0 && (
                        <div className="text-sm text-slate-200 italic">No profit data available for the selected period.</div>
                      )}
                    </div>
                    <Link to="/admin/analytics" className="mt-4 text-[#aec8f0] text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all w-fit">
                      View Full Report <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>

                {/* Top Branches List - Dynamic */}
                <div className="admin-glass-panel p-6 rounded-xl overflow-hidden">
                  <h4 className="text-[18px] text-[#d2e4ff] font-semibold mb-6">Top Performing Branches</h4>
                  <div className="space-y-4">
                    {/* Assuming we don't have branch-specific breakdown in the total, we'll just list active branches as a placeholder since original code didn't have top branches ranking directly accessible from overall profit endpoint */}
                    {branches?.slice(0, 3).map((branch, idx) => (
                      <div key={branch.id} className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${idx === 0 ? 'bg-white/5 border border-white/5' : 'hover:bg-white/5'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded flex items-center justify-center font-bold ${idx === 0 ? 'bg-[#0b2a4a] text-[#aec8f0]' : 'bg-[#1a3654] text-[#c4c6cf]'}`}>
                            0{idx + 1}
                          </div>
                          <div>
                            <p className="text-sm font-bold">{branch.name}</p>
                            <p className="text-xs text-slate-300">Active</p>
                          </div>
                        </div>
                        <p className={`text-sm font-bold ${idx === 0 ? 'text-blue-400' : 'text-[#d2e4ff]'}`}>
                          <span className="material-symbols-outlined text-[16px] align-middle mr-1">monitoring</span>
                        </p>
                      </div>
                    ))}
                    {(!branches || branches.length === 0) && (
                      <div className="text-sm text-slate-200 italic">No branches available.</div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Admin Controls Section */}
            <section className="space-y-4 pb-10">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-[#aec8f0] rounded-full"></div>
                <h2 className="text-[24px] font-semibold text-[#d2e4ff]">Admin Controls</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card 1: Branches */}
                <Link to="/admin/branches" className="admin-glass-panel p-6 rounded-xl border-t-2 border-[#aec8f0] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all group block cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-[#aec8f0]/10 flex items-center justify-center mb-4 text-[#aec8f0] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">corporate_fare</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#d2e4ff] mb-2">Branches Management</h3>
                  <p className="text-[#c4c6cf] text-sm font-light leading-relaxed mb-6">Coordinate location data, inventory allocation, and branch-specific performance overrides across the network.</p>
                  <div className="flex items-center text-[#aec8f0] text-xs font-bold uppercase tracking-[0.1em]">
                    Configure Access <span className="material-symbols-outlined text-sm ml-2">settings_input_component</span>
                  </div>
                </Link>

                {/* Card 2: Managers */}
                <Link to="/admin/managers" className="admin-glass-panel p-6 rounded-xl border-t-2 border-[#aec8f0] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all group block cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-[#aec8f0]/10 flex items-center justify-center mb-4 text-[#aec8f0] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">manage_accounts</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#d2e4ff] mb-2">Managers</h3>
                  <p className="text-[#c4c6cf] text-sm font-light leading-relaxed mb-6">Oversee regional leadership, assign permissions, and track individual management performance scorecards.</p>
                  <div className="flex items-center text-[#aec8f0] text-xs font-bold uppercase tracking-[0.1em]">
                    View Personnel <span className="material-symbols-outlined text-sm ml-2">groups</span>
                  </div>
                </Link>

                {/* Card 3: Hierarchy */}
                <Link to="/admin/organization" className="admin-glass-panel p-6 rounded-xl border-t-2 border-[#aec8f0] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all group block cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-[#aec8f0]/10 flex items-center justify-center mb-4 text-[#aec8f0] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">account_tree</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#d2e4ff] mb-2">Organization Hierarchy</h3>
                  <p className="text-[#c4c6cf] text-sm font-light leading-relaxed mb-6">Modify reporting structures, structural dependencies, and organizational flow for the entire Lotchan Mobiles ecosystem.</p>
                  <div className="flex items-center text-[#aec8f0] text-xs font-bold uppercase tracking-[0.1em]">
                    Edit Map <span className="material-symbols-outlined text-sm ml-2">hub</span>
                  </div>
                </Link>
              </div>
            </section>

            {/* Footer Image Banner */}
            <div className="w-full h-48 rounded-2xl overflow-hidden admin-glass-panel relative mb-12">
              <img alt="Cybersecurity Visualization" className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKOHU8VcCJDBO3JcD0H1JyUWqToQO81-Wlk8qX8U0eeRHC_nMamW2MpQUrWS2cscUpzDocmUii-vfsoCozwTTOzZtwAlsLF7X9xGrevzI0dIg8SBt1LznK0WtsGkmjBOU8yY8_8CFYjkf2c8nkHXcMdzN6vc4mJgR72gHYeKwXqkhgZkDfoAsbDrt__uJE6OegB6_zOKEH4OtrTG25JAA7E6XEpngxQnXedZysV6yyR4BscmKi2uoUMxfRHDkbTyEA2dd1WJNOPfc" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001429] to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <p className="text-[#aec8f0] font-sans text-xs uppercase tracking-[0.3em] font-medium">Corporate Security</p>
                <h4 className="text-xl font-bold text-white mt-1">Advanced Cryptographic Monitoring Enabled</h4>
              </div>
            </div>
          </div>
  );
};
