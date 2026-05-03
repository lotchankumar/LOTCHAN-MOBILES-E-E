import { useState } from 'react';
import { useOrganizationHierarchy } from '../../hooks/useOrganization';
import type { BranchWithHierarchy, ManagerWithStaff, StaffMember } from '../../hooks/useOrganization';
import { useAuthStore } from '../../store/auth.store';
import { UserRole } from '../../types';
import {
  Building2,
  UserCog,
  Users,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Shield,
  AlertCircle,
  RefreshCw,
  UserCheck,
  UserX,
  Network
} from 'lucide-react';
import { BackButton } from '../../components/BackButton';

const RoleBadge = ({ role }: { role: string }) => {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    ADMIN: { bg: 'bg-destructive/15', text: 'text-destructive', label: 'Admin' },
    MANAGER: { bg: 'bg-primary/15', text: 'text-primary', label: 'Manager' },
    STAFF: { bg: 'bg-success/15', text: 'text-success', label: 'Staff' },
  };
  const c = config[role] || { bg: 'bg-[#1a3654] text-[#aec8f0]', text: 'text-[#7892b7]', label: role };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <Shield className="w-3 h-3 mr-1" />
      {c.label}
    </span>
  );
};

const StatusBadge = ({ isActive }: { isActive: boolean }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
    isActive ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive'
  }`}>
    {isActive ? <UserCheck className="w-3 h-3 mr-1" /> : <UserX className="w-3 h-3 mr-1" />}
    {isActive ? 'Active' : 'Inactive'}
  </span>
);

const StaffRow = ({ staff, isLast }: { staff: StaffMember; isLast: boolean }) => (
  <div className="flex items-center group">
    {/* Tree connector */}
    <div className="relative w-10 flex-shrink-0 self-stretch">
      <div className={`absolute left-5 top-0 w-px bg-success/30 ${isLast ? 'h-1/2' : 'h-full'}`} />
      <div className="absolute left-5 top-1/2 w-5 h-px bg-success/30" />
    </div>
    <div className="flex-1 flex items-center py-3 px-4 my-1 rounded-lg bg-transparent border border-white/10 hover:border-success/40 hover:shadow-sm transition-all duration-200 group-hover:translate-x-1">
      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center mr-3 flex-shrink-0">
        <Users className="w-4 h-4 text-success" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#d2e4ff] truncate">{staff.name}</p>
        <p className="text-xs text-[#7892b7] flex items-center mt-0.5">
          <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
          <span className="truncate">{staff.email}</span>
        </p>
      </div>
      <div className="flex items-center gap-2 ml-2">
        <RoleBadge role="STAFF" />
        <StatusBadge isActive={staff.isActive} />
      </div>
    </div>
  </div>
);

const ManagerSection = ({ manager, isLast }: { manager: ManagerWithStaff; isLast: boolean }) => {
  const [expanded, setExpanded] = useState(true);
  const staffCount = manager.managedStaff?.length || 0;

  return (
    <div className="flex">
      {/* Tree connector from branch */}
      <div className="relative w-10 flex-shrink-0">
        <div className={`absolute left-5 top-0 w-px bg-primary/30 ${isLast ? 'h-7' : 'h-full'}`} />
        <div className="absolute left-5 top-7 w-5 h-px bg-primary/30" />
      </div>

      <div className="flex-1 mb-2">
        {/* Manager header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center py-3 px-4 rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center mr-3 flex-shrink-0">
            <UserCog className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-semibold text-[#d2e4ff]">{manager.name}</p>
            <p className="text-xs text-[#7892b7] flex items-center mt-0.5">
              <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate">{manager.email}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <RoleBadge role="MANAGER" />
            <StatusBadge isActive={manager.isActive} />
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#1a3654] text-[#aec8f0] text-[#7892b7] ml-1">
              <Users className="w-3 h-3 mr-1" />
              {staffCount} staff
            </span>
            {expanded ? <ChevronDown className="w-4 h-4 text-[#7892b7]" /> : <ChevronRight className="w-4 h-4 text-[#7892b7]" />}
          </div>
        </button>

        {/* Staff list */}
        {expanded && staffCount > 0 && (
          <div className="ml-4 mt-1">
            {manager.managedStaff.map((staff, idx) => (
              <StaffRow
                key={staff.id}
                staff={staff}
                isLast={idx === staffCount - 1}
              />
            ))}
          </div>
        )}

        {expanded && staffCount === 0 && (
          <div className="ml-14 mt-2 mb-2">
            <p className="text-xs text-[#7892b7] italic py-2 px-3 rounded-md bg-white/5 border border-white/10 inline-block">
              No staff assigned to this manager
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const BranchCard = ({ branch }: { branch: BranchWithHierarchy }) => {
  const [expanded, setExpanded] = useState(true);
  const managerCount = branch.users?.length || 0;
  const totalStaff = branch.users?.reduce((acc, m) => acc + (m.managedStaff?.length || 0), 0) || 0;

  return (
    <div className="admin-glass-panel rounded-xl overflow-hidden border-2 border-white/10 hover:border-primary/30 transition-all duration-300">
      {/* Branch header - gradient accent bar */}
      <div className="h-1.5" style={{ background: 'var(--gradient-primary)' }} />

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center p-5 hover:bg-white/5 transition-colors transition-colors cursor-pointer"
      >
        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mr-4 flex-shrink-0">
          <Building2 className="w-6 h-6 text-accent" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-lg font-bold text-[#d2e4ff]">{branch.name}</h3>
          <div className="flex items-center gap-4 mt-1 text-xs text-[#7892b7]">
            {branch.address && (
              <span className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {branch.address}
              </span>
            )}
            {branch.phone && (
              <span className="flex items-center">
                <Phone className="w-3 h-3 mr-1" />
                {branch.phone}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 ml-2">
          <div className="text-center px-3 py-1.5 rounded-lg bg-primary/10">
            <p className="text-lg font-bold text-primary">{managerCount}</p>
            <p className="text-[10px] text-[#7892b7] uppercase tracking-wider">Managers</p>
          </div>
          <div className="text-center px-3 py-1.5 rounded-lg bg-success/10">
            <p className="text-lg font-bold text-success">{totalStaff}</p>
            <p className="text-[10px] text-[#7892b7] uppercase tracking-wider">Staff</p>
          </div>
          {expanded ? <ChevronDown className="w-5 h-5 text-[#7892b7]" /> : <ChevronRight className="w-5 h-5 text-[#7892b7]" />}
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-white/10">
          {managerCount === 0 ? (
            <p className="text-sm text-[#7892b7] italic py-6 text-center">
              No managers assigned to this branch
            </p>
          ) : (
            <div className="mt-3">
              {branch.users.map((manager, idx) => (
                <ManagerSection
                  key={manager.id}
                  manager={manager}
                  isLast={idx === managerCount - 1}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const OrganizationPage = () => {
  const { user } = useAuthStore();
  const { data, loading, error, refetch } = useOrganizationHierarchy();

  if (!user || user.role !== UserRole.ADMIN) {
    return <div className="p-8 text-center text-[#d2e4ff]">Access Denied</div>;
  }

  // Compute summary stats
  const totalBranches = data?.branches.length || 0;
  const totalManagers = data?.branches.reduce((acc, b) => acc + (b.users?.length || 0), 0) || 0;
  const totalStaff = data?.branches.reduce(
    (acc, b) => acc + b.users.reduce((a2, m) => a2 + (m.managedStaff?.length || 0), 0), 0
  ) || 0;
  const unassignedCount = data?.unassignedStaff.length || 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Navbar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] md:text-[40px] leading-[1.2] tracking-tight font-bold text-[#d2e4ff] uppercase">Hierarchy</h1>
          <p className="text-[#7892b7] text-[14px] font-light">Modify reporting structures and organizational flow</p>
        </div>
        <div className="flex items-center">
          <button onClick={refetch} className="bg-[#aec8f0] text-[#153152] font-semibold px-4 py-2 rounded-lg text-sm hover:bg-white transition-colors flex items-center shadow-[0_4px_15px_rgba(174,200,240,0.2)]">
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </button>
        </div>
      </div>

      <main className="space-y-6">
        {/* Error state */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-destructive mr-3 flex-shrink-0" />
            <span className="text-sm text-destructive">{error}</span>
          </div>
        )}

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="admin-glass-panel p-6 rounded-xl flex items-center group hover:border-[#aec8f0]/50 transition-colors gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#d2e4ff]">{totalBranches}</p>
              <p className="text-xs text-[#7892b7] uppercase tracking-wider">Branches</p>
            </div>
          </div>
          <div className="admin-glass-panel p-6 rounded-xl flex items-center group hover:border-[#aec8f0]/50 transition-colors gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <UserCog className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#d2e4ff]">{totalManagers}</p>
              <p className="text-xs text-[#7892b7] uppercase tracking-wider">Managers</p>
            </div>
          </div>
          <div className="admin-glass-panel p-6 rounded-xl flex items-center group hover:border-[#aec8f0]/50 transition-colors gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#d2e4ff]">{totalStaff}</p>
              <p className="text-xs text-[#7892b7] uppercase tracking-wider">Staff</p>
            </div>
          </div>
          <div className="admin-glass-panel p-6 rounded-xl flex items-center group hover:border-[#aec8f0]/50 transition-colors gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#d2e4ff]">{unassignedCount}</p>
              <p className="text-xs text-[#7892b7] uppercase tracking-wider">Unassigned</p>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="h-8 w-8 text-primary animate-spin mb-4" />
            <p className="text-[#7892b7]">Loading organization structure...</p>
          </div>
        ) : (
          <>
            {/* Hierarchy Legend */}
            <div className="mb-6 flex items-center gap-6 text-xs text-[#7892b7]">
              <span className="font-semibold uppercase tracking-wider">Hierarchy:</span>
              <span className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-accent/20 border border-accent/40" />
                Branch
              </span>
              <span className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-primary/20 border border-primary/40" />
                Manager
              </span>
              <span className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-success/20 border border-success/40" />
                Staff
              </span>
            </div>

            {/* Branch cards */}
            <div className="space-y-6">
              {data?.branches.map((branch) => (
                <BranchCard key={branch.id} branch={branch} />
              ))}

              {totalBranches === 0 && (
                <div className="admin-glass-panel rounded-xl p-12 text-center">
                  <Building2 className="w-12 h-12 text-[#7892b7]/30 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[#d2e4ff] mb-1">No Branches Yet</h3>
                  <p className="text-sm text-[#7892b7]">
                    Create branches first, then assign managers and staff.
                  </p>
                </div>
              )}
            </div>

            {/* Unassigned Staff Section */}
            {unassignedCount > 0 && (
              <div className="mt-8">
                <div className="admin-glass-panel rounded-xl overflow-hidden border-2 border-warning/30">
                  <div className="h-1.5 bg-warning/60" />
                  <div className="p-5">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center mr-3">
                        <AlertCircle className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#d2e4ff]">Unassigned Staff</h3>
                        <p className="text-xs text-[#7892b7]">
                          Staff members not yet assigned to any manager
                        </p>
                      </div>
                      <span className="ml-auto inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-warning/10 text-warning">
                        {unassignedCount}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {data?.unassignedStaff.map((staff) => (
                        <div
                          key={staff.id}
                          className="flex items-center py-3 px-4 rounded-lg bg-transparent border border-white/10 hover:border-warning/40 transition-all"
                        >
                          <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center mr-3 flex-shrink-0">
                            <Users className="w-4 h-4 text-warning" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#d2e4ff] truncate">{staff.name}</p>
                            <p className="text-xs text-[#7892b7] flex items-center mt-0.5">
                              <Mail className="w-3 h-3 mr-1" />
                              <span className="truncate">{staff.email}</span>
                              {staff.branch && (
                                <>
                                  <span className="mx-2">•</span>
                                  <Building2 className="w-3 h-3 mr-1" />
                                  {staff.branch.name}
                                </>
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            <RoleBadge role="STAFF" />
                            <StatusBadge isActive={staff.isActive} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default OrganizationPage;
