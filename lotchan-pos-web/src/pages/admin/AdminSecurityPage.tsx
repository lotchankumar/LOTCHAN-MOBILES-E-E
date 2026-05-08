import { useState, useEffect, useCallback } from 'react';
import {
  Activity, Clock, Download, Search, Filter, AlertTriangle, Shield,
  ShoppingCart, Wrench, Package, Users, Building2, Settings, ChevronDown,
  RefreshCw, TrendingUp,
} from 'lucide-react';
import { api } from '../../services/api';
import './AdminPage.css';

// ─── Action metadata for display ─────────────────────────────────────
const ACTION_CONFIG: Record<string, { label: string; color: string; icon: any; category: string }> = {
  LOGIN:                 { label: 'Login',                  color: '#22c55e', icon: Users,        category: 'Auth' },
  LOGOUT:                { label: 'Logout',                 color: '#64748b', icon: Users,        category: 'Auth' },
  LOGIN_FAILED:          { label: 'Login Failed',           color: '#ef4444', icon: AlertTriangle, category: 'Auth' },
  ORDER_CREATED:         { label: 'Order Created',          color: '#3b82f6', icon: ShoppingCart, category: 'Sales' },
  ORDER_STATUS_UPDATED:  { label: 'Order Status Updated',   color: '#6366f1', icon: ShoppingCart, category: 'Sales' },
  REPAIR_CREATED:        { label: 'Repair Created',         color: '#f59e0b', icon: Wrench,       category: 'Repairs' },
  REPAIR_STATUS_UPDATED: { label: 'Repair Status Updated',  color: '#d97706', icon: Wrench,       category: 'Repairs' },
  REPAIR_PARTS_ADDED:    { label: 'Repair Parts Added',     color: '#ea580c', icon: Wrench,       category: 'Repairs' },
  PURCHASE_CREATED:      { label: 'Purchase Created',       color: '#10b981', icon: Package,      category: 'Inventory' },
  EXPENSE_CREATED:       { label: 'Expense Created',        color: '#f43f5e', icon: TrendingUp,   category: 'Finance' },
  PRODUCT_CREATED:       { label: 'Product Created',        color: '#06b6d4', icon: Package,      category: 'Inventory' },
  PRODUCT_UPDATED:       { label: 'Product Updated',        color: '#0ea5e9', icon: Package,      category: 'Inventory' },
  PRODUCT_DELETED:       { label: 'Product Deleted',        color: '#dc2626', icon: Package,      category: 'Inventory' },
  BRANCH_CREATED:        { label: 'Branch Created',         color: '#8b5cf6', icon: Building2,    category: 'Admin' },
  BRANCH_UPDATED:        { label: 'Branch Updated',         color: '#7c3aed', icon: Building2,    category: 'Admin' },
  BRANCH_DELETED:        { label: 'Branch Deleted',         color: '#dc2626', icon: Building2,    category: 'Admin' },
  USER_CREATED:          { label: 'User Created',           color: '#14b8a6', icon: Users,        category: 'Admin' },
  USER_UPDATED:          { label: 'User Updated',           color: '#0d9488', icon: Users,        category: 'Admin' },
  PASSWORD_RESET:        { label: 'Password Reset',         color: '#f97316', icon: Shield,       category: 'Auth' },
  SUPPLIER_CREATED:      { label: 'Supplier Created',       color: '#84cc16', icon: Package,      category: 'Inventory' },
  SUPPLIER_UPDATED:      { label: 'Supplier Updated',       color: '#65a30d', icon: Package,      category: 'Inventory' },
  SETTINGS_UPDATED:      { label: 'Settings Updated',       color: '#a855f7', icon: Settings,     category: 'Admin' },
  SPARE_PRODUCT_CREATED: { label: 'Spare Part Created',     color: '#06b6d4', icon: Wrench,       category: 'Repairs' },
  SPARE_PURCHASE_CREATED:{ label: 'Spare Purchase Created', color: '#10b981', icon: Wrench,       category: 'Repairs' },
};

const ROLE_OPTIONS = ['MANAGER', 'STAFF', 'TECHNICIAN', 'ADMIN'];

interface AuditLog {
  id: string;
  userId: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  details: string | null;
  branchId: string | null;
  ipAddress: string | null;
  createdAt: string;
  user: { id: string; name: string; role: string; email: string } | null;
  branch: { id: string; name: string } | null;
}

interface Branch {
  id: string;
  name: string;
}

interface Stats {
  totalToday: number;
  failedLogins: number;
  byAction: { action: string; count: number }[];
  byBranch: { branchId: string; branchName: string; count: number }[];
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function parseDetails(details: string | null): Record<string, any> {
  if (!details) return {};
  try { return JSON.parse(details); } catch { return {}; }
}

function formatDetailValue(key: string, value: any): string {
  if (key === 'totalAmount' || key === 'amount' || key === 'estimatedCost') {
    return `₹${Number(value).toLocaleString('en-IN')}`;
  }
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

export const AdminSecurityPage = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalLogs, setTotalLogs] = useState(0);

  // Filters
  const [branchFilter, setBranchFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchLogs = useCallback(async (pageNum = 0) => {
    setLoading(true);
    try {
      const params: any = { page: pageNum, limit: 25 };
      if (branchFilter) params.branchId = branchFilter;
      if (roleFilter) params.role = roleFilter;
      if (actionFilter) params.action = actionFilter;
      if (searchQuery) params.search = searchQuery;
      if (dateFrom) params.dateFrom = dateFrom;
      if (dateTo) params.dateTo = dateTo;

      const res = await api.get('/admin/audit-logs', { params });
      setLogs(res.data.data);
      setTotalPages(res.data.pagination.pages);
      setTotalLogs(res.data.pagination.total);
      setPage(pageNum);
    } catch (err) {
      console.error('Failed to fetch audit logs:', err);
    } finally {
      setLoading(false);
    }
  }, [branchFilter, roleFilter, actionFilter, searchQuery, dateFrom, dateTo]);

  const fetchStats = async () => {
    try {
      const res = await api.get('/admin/audit-logs/stats');
      setStats(res.data);
    } catch (err) {
      console.error('Failed to fetch audit stats:', err);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await api.get('/admin/branches');
      setBranches(res.data);
    } catch (err) {
      console.error('Failed to fetch branches:', err);
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchStats();
  }, []);

  useEffect(() => {
    fetchLogs(0);
  }, [fetchLogs]);

  const handleExportCSV = async () => {
    try {
      const params: any = {};
      if (branchFilter) params.branchId = branchFilter;
      if (roleFilter) params.role = roleFilter;
      if (actionFilter) params.action = actionFilter;
      if (dateFrom) params.dateFrom = dateFrom;
      if (dateTo) params.dateTo = dateTo;
      if (searchQuery) params.search = searchQuery;

      const res = await api.get('/admin/audit-logs/export', { params, responseType: 'blob' });
      const blob = new Blob([res.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit_logs_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export CSV:', err);
    }
  };

  const clearFilters = () => {
    setBranchFilter('');
    setRoleFilter('');
    setActionFilter('');
    setSearchQuery('');
    setDateFrom('');
    setDateTo('');
  };

  const hasActiveFilters = branchFilter || roleFilter || actionFilter || searchQuery || dateFrom || dateTo;

  const activeActions = Object.keys(ACTION_CONFIG);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] md:text-[40px] leading-[1.2] tracking-tight font-bold text-[#d2e4ff] uppercase">
            Audit Logs
          </h1>
          <p className="text-[#7892b7] text-[14px] font-light">
            Track all activities across branches — sales, repairs, inventory & user actions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { fetchLogs(0); fetchStats(); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all text-sm"
          >
            <RefreshCw size={15} />
            Refresh
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 hover:text-blue-200 transition-all text-sm"
          >
            <Download size={15} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="admin-glass-panel p-4 rounded-xl border border-blue-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10">
                <Activity size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#d2e4ff]">{stats.totalToday}</p>
                <p className="text-xs text-slate-400">Actions Today</p>
              </div>
            </div>
          </div>
          <div className="admin-glass-panel p-4 rounded-xl border border-red-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-red-500/10">
                <AlertTriangle size={20} className="text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#d2e4ff]">{stats.failedLogins}</p>
                <p className="text-xs text-slate-400">Failed Logins</p>
              </div>
            </div>
          </div>
          <div className="admin-glass-panel p-4 rounded-xl border border-green-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-green-500/10">
                <Building2 size={20} className="text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#d2e4ff]">{stats.byBranch.length}</p>
                <p className="text-xs text-slate-400">Active Branches</p>
              </div>
            </div>
          </div>
          <div className="admin-glass-panel p-4 rounded-xl border border-purple-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-purple-500/10">
                <Shield size={20} className="text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#d2e4ff]">{totalLogs}</p>
                <p className="text-xs text-slate-400">Total Logs</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="admin-glass-panel p-4 rounded-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by user, entity, or details..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-[#d2e4ff] placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2">
            <select
              value={branchFilter}
              onChange={e => setBranchFilter(e.target.value)}
              className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer min-w-[140px]"
            >
              <option value="">All Branches</option>
              {branches.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>

            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer min-w-[130px]"
            >
              <option value="">All Roles</option>
              {ROLE_OPTIONS.map(r => (
                <option key={r} value={r}>{r.charAt(0) + r.slice(1).toLowerCase()}</option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-300'
              }`}
            >
              <Filter size={14} />
              <span className="hidden sm:inline">More</span>
              <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm hover:bg-red-500/20 transition-all"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-3 pt-2 border-t border-white/5">
            <select
              value={actionFilter}
              onChange={e => setActionFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
            >
              <option value="">All Actions</option>
              {activeActions.map(a => (
                <option key={a} value={a}>{ACTION_CONFIG[a]?.label || a}</option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">From:</span>
              <input
                type="date"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">To:</span>
              <input
                type="date"
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>
        )}
      </div>

      {/* Log Entries */}
      <div className="admin-glass-panel rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-white/5 text-xs text-slate-500 uppercase tracking-wider font-medium">
          <div className="col-span-3">User</div>
          <div className="col-span-3">Action</div>
          <div className="col-span-2">Branch</div>
          <div className="col-span-2">Details</div>
          <div className="col-span-2 text-right">Time</div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3 text-slate-400">
              <RefreshCw size={18} className="animate-spin" />
              <span className="text-sm">Loading audit logs...</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && logs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Activity size={40} className="mb-3 opacity-30" />
            <p className="text-sm">No audit logs found</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your filters</p>
          </div>
        )}

        {/* Log Rows */}
        {!loading && logs.map((log, i) => {
          const config = ACTION_CONFIG[log.action] || { label: log.action, color: '#64748b', icon: Activity, category: 'Other' };
          const IconComponent = config.icon;
          const details = parseDetails(log.details);
          const detailKeys = Object.keys(details).filter(k => !['email', 'reason'].includes(k));
          const primaryDetail = detailKeys.length > 0 ? detailKeys[0] : null;

          return (
            <div
              key={log.id}
              className={`grid grid-cols-12 gap-3 px-5 py-3.5 items-center transition-all hover:bg-white/[0.03] ${
                i < logs.length - 1 ? 'border-b border-white/[0.03]' : ''
              }`}
            >
              {/* User */}
              <div className="col-span-3 flex items-center gap-3 min-w-0">
                <div
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: `${config.color}15`, color: config.color }}
                >
                  {log.user ? log.user.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#d2e4ff] truncate">
                    {log.user?.name || 'System'}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {log.user?.role || '—'}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="col-span-3 flex items-center gap-2.5 min-w-0">
                <div
                  className="shrink-0 p-1.5 rounded-md"
                  style={{ backgroundColor: `${config.color}15` }}
                >
                  <IconComponent size={14} style={{ color: config.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-[#d2e4ff] truncate">{config.label}</p>
                  <p className="text-[11px] truncate" style={{ color: `${config.color}99` }}>
                    {config.category} • {log.entity}
                    {log.entityId && <span className="text-slate-600"> #{log.entityId.slice(-6)}</span>}
                  </p>
                </div>
              </div>

              {/* Branch */}
              <div className="col-span-2 min-w-0">
                {log.branch ? (
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 text-xs text-slate-300 truncate max-w-full">
                    <Building2 size={11} className="shrink-0 text-slate-500" />
                    <span className="truncate">{log.branch.name}</span>
                  </span>
                ) : (
                  <span className="text-xs text-slate-600">—</span>
                )}
              </div>

              {/* Details */}
              <div className="col-span-2 min-w-0">
                {primaryDetail ? (
                  <p className="text-xs text-slate-400 truncate" title={JSON.stringify(details, null, 2)}>
                    <span className="text-slate-500">{primaryDetail}:</span>{' '}
                    {formatDetailValue(primaryDetail, details[primaryDetail])}
                  </p>
                ) : (
                  <span className="text-xs text-slate-600">—</span>
                )}
              </div>

              {/* Time */}
              <div className="col-span-2 text-right">
                <p className="text-xs text-slate-400">{timeAgo(log.createdAt)}</p>
                <p className="text-[10px] text-slate-600">
                  {new Date(log.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Showing {page * 25 + 1}–{Math.min((page + 1) * 25, totalLogs)} of {totalLogs} logs
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchLogs(page - 1)}
              disabled={page === 0}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <span className="text-xs text-slate-500 px-2">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => fetchLogs(page + 1)}
              disabled={page >= totalPages - 1}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
