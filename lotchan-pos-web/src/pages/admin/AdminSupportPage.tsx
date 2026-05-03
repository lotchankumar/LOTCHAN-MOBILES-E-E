import { Link } from 'react-router-dom';
import './AdminPage.css';

export const AdminSupportPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] md:text-[40px] leading-[1.2] tracking-tight font-bold text-[#d2e4ff] uppercase">IT Support</h1>
          <p className="text-[#7892b7] text-[14px] font-light">System help and technical assistance</p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-[#aec8f0] text-sm hover:text-white transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="admin-glass-panel p-8 rounded-xl space-y-4">
          <div className="w-12 h-12 rounded-lg bg-[#aec8f0]/10 flex items-center justify-center text-[#aec8f0]">
            <span className="material-symbols-outlined text-3xl">contact_support</span>
          </div>
          <h3 className="text-xl font-bold text-[#d2e4ff]">Technical Assistance</h3>
          <p className="text-[#c4c6cf] text-sm">For immediate system outages or database issues, contact the central IT team.</p>
          <div className="pt-4 space-y-2">
            <p className="text-[#aec8f0] font-mono text-sm">Email: support@lotchan-mobiles.local</p>
            <p className="text-[#aec8f0] font-mono text-sm">Hotline: Ext. 9901</p>
          </div>
        </div>

        <div className="admin-glass-panel p-8 rounded-xl space-y-4">
          <div className="w-12 h-12 rounded-lg bg-[#aec8f0]/10 flex items-center justify-center text-[#aec8f0]">
            <span className="material-symbols-outlined text-3xl">menu_book</span>
          </div>
          <h3 className="text-xl font-bold text-[#d2e4ff]">Documentation</h3>
          <p className="text-[#c4c6cf] text-sm">Access the administrative user manuals and system deployment guides.</p>
          <button className="text-[#aec8f0] text-sm font-bold uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all mt-4">
            View Docs <span className="material-symbols-outlined text-sm">open_in_new</span>
          </button>
        </div>
      </div>
    </div>
  );
};
