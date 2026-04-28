import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { UserRole } from '../../types';
import { Users, CheckCircle, Shield, AlertTriangle, Building2, UserCog, Network, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { managerService, type ProfitData } from '../../services/manager.service';
import { useBranchesQuery } from '../../hooks/useManagers';

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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

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

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-destructive/20 text-destructive';
      case UserRole.MANAGER:
        return 'bg-primary/20 text-primary-dark';
      case UserRole.STAFF:
        return 'bg-success/20 text-success';
      default:
        return 'bg-secondary text-foreground/90';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-foreground">
                {user?.role === UserRole.ADMIN ? 'LOTCHAN MOBILES ADMINISTRATION' : 'Mobile Shop Management'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="mr-2 text-sm text-muted-foreground">Welcome,</span>
                <span className="font-medium text-foreground">{user?.email}</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(user?.role || UserRole.STAFF)}`}>
                  {user?.role}
                </span>
              </div>
              <button
                onClick={logout}
                className="btn-primary py-2 px-4 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card p-0 overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary rounded-md p-3">
                      <Users className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-muted-foreground truncate">Total Users</dt>
                        <dd className="text-lg font-medium text-foreground">1</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-0 overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-success rounded-md p-3">
                      <CheckCircle className="h-6 w-6 text-success-foreground" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-muted-foreground truncate">Active Status</dt>
                        <dd className="text-lg font-medium text-foreground">Online</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-0 overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-accent rounded-md p-3">
                      <Shield className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-muted-foreground truncate">Role Permissions</dt>
                        <dd className="text-lg font-medium text-foreground">
                          {user?.role === UserRole.ADMIN ? 'Full Access' : 
                           user?.role === UserRole.MANAGER ? 'Manager Access' : 'Staff Access'}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-0 overflow-hidden">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-foreground">User Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">Personal details and role information.</p>
              </div>
              <div className="border-t border-border">
                <dl>
                  <div className="bg-secondary px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-muted-foreground">Full name</dt>
                    <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2">
                      {user?.firstName && user?.lastName 
                        ? `${user.firstName} ${user.lastName}`
                        : 'Not provided'}
                    </dd>
                  </div>
                  <div className="bg-card px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-muted-foreground">Email address</dt>
                    <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2">{user?.email}</dd>
                  </div>
                  <div className="bg-secondary px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-muted-foreground">Role</dt>
                    <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user?.role || UserRole.STAFF)}`}>
                        {user?.role}
                      </span>
                    </dd>
                  </div>
                  <div className="bg-card px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-muted-foreground">Account status</dt>
                    <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success/20 text-success">
                        Active
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {user?.role === UserRole.ADMIN && (
              <>
                <div className="mt-8 bg-warning/10 border border-warning/30 rounded-lg p-4 mb-8">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-warning-foreground">Administrator Access</h3>
                      <div className="mt-2 text-sm text-warning-foreground/80">
                        <p>As an administrator, you have full access to all system features including user management, inventory control, and system settings.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profit Breakdown Section */}
                <div className="card p-6 mb-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-foreground">Overall & Branchwise Profit Analytics</h3>
                    <div className="flex flex-wrap items-end gap-4 mt-4 md:mt-0">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Select Branch</label>
                        <select
                          value={profitBranchId}
                          onChange={(e) => setProfitBranchId(e.target.value)}
                          className="input-field sm:text-sm min-w-[200px]"
                        >
                          <option value="all">Overall (All Branches)</option>
                          {branches.map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Start Date</label>
                        <input
                          type="date"
                          value={profitDateRange.startDate}
                          onChange={(e) => setProfitDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                          className="input-field sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">End Date</label>
                        <input
                          type="date"
                          value={profitDateRange.endDate}
                          onChange={(e) => setProfitDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                          className="input-field sm:text-sm"
                        />
                      </div>
                      <div>
                        <button
                          onClick={fetchProfitData}
                          disabled={profitLoading || !profitBranchId}
                          className="btn-primary py-2 px-4 text-sm font-medium disabled:opacity-50"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>

                  {profitError && (
                    <div className="mb-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-destructive mr-2 inline" />
                      {profitError}
                    </div>
                  )}

                  {!profitBranchId ? (
                    <div className="text-center py-8 text-muted-foreground">Select a branch to view profit data.</div>
                  ) : profitLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading profit data...</div>
                  ) : profitData ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={profitData.categoryProfit ? Object.entries(profitData.categoryProfit).filter(([_, v]) => v > 0).map(([name, value]) => ({ name, value })) : []}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(1)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {(profitData.categoryProfit ? Object.entries(profitData.categoryProfit).filter(([_, v]) => v > 0) : []).map((_, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => [`₹${Number(value).toFixed(2)}`, 'Profit']} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div>
                        <div className="mb-4">
                          <div className="text-sm text-muted-foreground">Total Profit</div>
                          <div className="text-3xl font-bold text-success">₹{profitData.totalProfit.toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {profitData.dateRange.startDate} to {profitData.dateRange.endDate}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {Object.entries(profitData.categoryProfit).map(([category, profit], index) => (
                            <div key={category} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                              <div className="flex items-center">
                                <div 
                                  className="w-3 h-3 rounded-full mr-3" 
                                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                <span className="font-medium text-foreground">{category.replace('_', ' ')}</span>
                              </div>
                              <div className={`font-medium ${profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                                ₹{profit.toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4">Admin Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link to="/admin/branches" className="card hover:border-primary transition-colors group cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Branches Management</h4>
                    <p className="text-sm text-muted-foreground">Manage shop branches, locations, and view branch-specific profit breakdowns.</p>
                  </Link>

                  <Link to="/admin/managers" className="card hover:border-secondary transition-colors group cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-secondary p-3 rounded-lg">
                        <UserCog className="h-6 w-6 text-foreground" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Managers</h4>
                    <p className="text-sm text-muted-foreground">Assign managers to branches and control their access levels.</p>
                  </Link>

                  <Link to="/admin/organization" className="card hover:border-accent transition-colors group cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-accent/10 p-3 rounded-lg">
                        <Network className="h-6 w-6 text-accent" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Organization Hierarchy</h4>
                    <p className="text-sm text-muted-foreground">View the complete structure of branches, managers, and staff members.</p>
                  </Link>
                </div>
              </>
            )}
        </div>
      </div>
    </main>
  </div>
);
};
