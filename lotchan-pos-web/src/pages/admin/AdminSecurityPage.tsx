import { ShieldAlert, UserX, Activity, Clock } from 'lucide-react';
import './AdminPage.css';

export const AdminSecurityPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] md:text-[40px] leading-[1.2] tracking-tight font-bold text-[#d2e4ff] uppercase">Security & Audit</h1>
          <p className="text-[#7892b7] text-[14px] font-light">Monitor system activity and manage active sessions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Sessions & Force Logout */}
        <div className="lg:col-span-1 space-y-6">
          <div className="admin-glass-panel p-6 rounded-xl border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
            <div className="flex items-center gap-3 border-b border-red-500/20 pb-4 mb-4">
              <ShieldAlert className="text-red-400" size={24} />
              <h3 className="text-xl font-bold text-[#d2e4ff]">Active Sessions</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-slate-300">
                You can forcefully terminate sessions for specific roles or all users across the platform. This requires users to log in again.
              </p>
              
              <div className="space-y-3 pt-2">
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all text-red-200">
                  <span className="font-semibold text-sm">Force Logout Staff</span>
                  <UserX size={18} />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all text-red-200">
                  <span className="font-semibold text-sm">Force Logout Managers</span>
                  <UserX size={18} />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-red-600 border border-red-500 hover:bg-red-500 transition-all text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] mt-4">
                  <span className="font-bold">Terminate All Sessions</span>
                  <ShieldAlert size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Logs */}
        <div className="lg:col-span-2">
          <div className="admin-glass-panel p-6 rounded-xl min-h-[500px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <Activity className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold text-[#d2e4ff]">System Audit Logs</h3>
              </div>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">Export CSV</button>
            </div>

            <div className="space-y-4">
              {/* Mock Log Entries */}
              {[
                { id: 1, user: 'John Manager', action: 'Created Purchase Order #PO-1029', time: '10 mins ago', type: 'info' },
                { id: 2, user: 'System', action: 'Automated Backup Completed', time: '1 hour ago', type: 'success' },
                { id: 3, user: 'Sarah Staff', action: 'Failed login attempt (3x)', time: '2 hours ago', type: 'warning' },
                { id: 4, user: 'Admin User', action: 'Updated Tax Settings', time: '5 hours ago', type: 'info' },
                { id: 5, user: 'Mike Tech', action: 'Deleted Repair Job #REP-9921', time: '1 day ago', type: 'danger' },
              ].map(log => (
                <div key={log.id} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5">
                  <div className={`mt-1 rounded-full p-1.5 ${
                    log.type === 'danger' ? 'bg-red-500/20 text-red-400' :
                    log.type === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                    log.type === 'success' ? 'bg-green-500/20 text-green-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    <Clock size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#d2e4ff]"><span className="font-semibold text-blue-300">{log.user}</span> {log.action}</p>
                    <p className="text-xs text-slate-400 mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <button className="text-sm text-slate-400 hover:text-white transition-colors">Load Older Logs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
