import { Link } from 'react-router-dom';
import './AdminPage.css';

export const AdminNotificationsPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] md:text-[40px] leading-[1.2] tracking-tight font-bold text-[#d2e4ff] uppercase">System Alerts</h1>
          <p className="text-[#7892b7] text-[14px] font-light">Global notifications and security events</p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-[#aec8f0] text-sm hover:text-white transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="admin-glass-panel p-8 rounded-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-xl font-bold text-[#d2e4ff]">Recent Notifications</h3>
          <button className="text-[#aec8f0] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
            Mark All as Read
          </button>
        </div>

        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-lg bg-[#1a3654]/50 border border-blue-500/30 flex items-start gap-4">
            <span className="material-symbols-outlined text-blue-400 mt-0.5">info</span>
            <div>
              <p className="font-bold text-[#d2e4ff] text-sm">System Update Complete</p>
              <p className="text-xs text-[#7892b7] mt-1">The core POS backend was successfully updated to v2.4.1.</p>
              <p className="text-[10px] text-slate-300 mt-2">2 hours ago</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-amber-900/20 border border-amber-500/30 flex items-start gap-4">
            <span className="material-symbols-outlined text-amber-500 mt-0.5">warning</span>
            <div>
              <p className="font-bold text-amber-200 text-sm">Unusual Login Activity Detected</p>
              <p className="text-xs text-amber-200/70 mt-1">Multiple failed login attempts for a manager account in the Downtown branch.</p>
              <p className="text-[10px] text-slate-300 mt-2">5 hours ago</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-start gap-4 opacity-70">
            <span className="material-symbols-outlined text-slate-200 mt-0.5">check_circle</span>
            <div>
              <p className="font-bold text-[#d2e4ff] text-sm">Daily Backup Successful</p>
              <p className="text-xs text-[#7892b7] mt-1">All branch databases were backed up to secure cloud storage.</p>
              <p className="text-[10px] text-slate-300 mt-2">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
