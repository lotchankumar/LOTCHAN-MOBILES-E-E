import { Link } from 'react-router-dom';
import './AdminPage.css';

export const AdminSettingsPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] md:text-[40px] leading-[1.2] tracking-tight font-bold text-[#d2e4ff] uppercase">System Settings</h1>
          <p className="text-[#7892b7] text-[14px] font-light">Global configurations and security parameters</p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-[#aec8f0] text-sm hover:text-white transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="admin-glass-panel p-8 rounded-xl space-y-6">
        <h3 className="text-xl font-bold text-[#d2e4ff] border-b border-white/10 pb-4">Configuration Categories</h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-[#aec8f0]">security</span>
              <div>
                <p className="font-bold text-[#d2e4ff]">Security Protocols</p>
                <p className="text-xs text-[#7892b7]">Manage session timeouts and 2FA requirements</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-[#aec8f0]">palette</span>
              <div>
                <p className="font-bold text-[#d2e4ff]">Interface Preferences</p>
                <p className="text-xs text-[#7892b7]">Theme customization and layout settings</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-[#aec8f0]">database</span>
              <div>
                <p className="font-bold text-[#d2e4ff]">Data Management</p>
                <p className="text-xs text-[#7892b7]">Backup schedules and retention policies</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </div>
        </div>
      </div>
    </div>
  );
};
