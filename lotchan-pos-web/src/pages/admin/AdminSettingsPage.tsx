import { Save, FileText, Percent, ShieldCheck, MessageSquare } from 'lucide-react';
import './AdminPage.css';

export const AdminSettingsPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] md:text-[40px] leading-[1.2] tracking-tight font-bold text-[#d2e4ff] uppercase">System Settings</h1>
          <p className="text-[#7892b7] text-[14px] font-light">Configure global platform parameters and integrations</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tax Settings */}
        <div className="admin-glass-panel p-6 rounded-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Percent className="text-blue-400" size={24} />
            <h3 className="text-xl font-bold text-[#d2e4ff]">Tax Configuration</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#aec8f0] mb-1">Default GST Rate (%)</label>
              <input type="number" defaultValue="18" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#aec8f0] mb-1">Tax Registration Number</label>
              <input type="text" placeholder="e.g. 22AAAAA0000A1Z5" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="inclusiveTax" className="w-4 h-4 rounded border-white/10 bg-black/20 text-blue-500 focus:ring-blue-500" />
              <label htmlFor="inclusiveTax" className="text-sm text-slate-300">Prices are tax inclusive by default</label>
            </div>
          </div>
        </div>

        {/* Invoice Settings */}
        <div className="admin-glass-panel p-6 rounded-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <FileText className="text-blue-400" size={24} />
            <h3 className="text-xl font-bold text-[#d2e4ff]">Invoice Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#aec8f0] mb-1">Invoice Prefix</label>
              <input type="text" defaultValue="INV-" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#aec8f0] mb-1">Terms & Conditions</label>
              <textarea rows={3} defaultValue="Goods once sold will not be taken back." className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
            </div>
          </div>
        </div>

        {/* Warranty Settings */}
        <div className="admin-glass-panel p-6 rounded-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <ShieldCheck className="text-blue-400" size={24} />
            <h3 className="text-xl font-bold text-[#d2e4ff]">Warranty Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#aec8f0] mb-1">Default Repair Warranty (Days)</label>
              <input type="number" defaultValue="30" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#aec8f0] mb-1">Warranty Disclaimer</label>
              <textarea rows={2} defaultValue="Physical or liquid damage voids warranty." className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
            </div>
          </div>
        </div>

        {/* WhatsApp Integration */}
        <div className="admin-glass-panel p-6 rounded-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <MessageSquare className="text-green-400" size={24} />
            <h3 className="text-xl font-bold text-[#d2e4ff]">WhatsApp Integration</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#aec8f0] mb-1">API Endpoint</label>
              <input type="text" placeholder="https://api.whatsapp.com/..." className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#aec8f0] mb-1">Access Token</label>
              <input type="password" placeholder="••••••••••••••••" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="autoSendInvoice" defaultChecked className="w-4 h-4 rounded border-white/10 bg-black/20 text-blue-500 focus:ring-blue-500" />
              <label htmlFor="autoSendInvoice" className="text-sm text-slate-300">Auto-send invoices on purchase</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
