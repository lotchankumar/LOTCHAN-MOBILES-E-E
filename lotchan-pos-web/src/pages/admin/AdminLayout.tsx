import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import './AdminPage.css';

export const AdminLayout = () => {
  const { logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#040d1a] text-[#cbd5e1] font-sans selection:bg-[#3b82f6]/30 flex">
      {/* SideNavBar Component */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#040d1a] border-r border-white/5 flex flex-col hidden lg:flex z-50">
        <div className="px-6 py-6 border-b border-white/5 h-16 flex items-center">
          <Link to="/admin" className="text-xl font-black tracking-tighter text-[#3b82f6] drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">
            LOTCHAN MOBILES
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 flex flex-col gap-6">
          {/* Core Console */}
          <div>
            <div className="px-6 mb-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Core Console</h3>
            </div>
            <Link to="/admin" className="flex items-center gap-3 px-6 py-2.5 bg-[#112236] border-l-2 border-[#3b82f6] text-white">
              <span className="material-symbols-outlined text-[20px] text-[#3b82f6]">dashboard</span>
              <span className="font-sans text-sm font-medium">Dashboard</span>
            </Link>
          </div>

          {/* Operations */}
          <div>
            <div className="px-6 mb-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Operations</h3>
            </div>
            <Link to="/admin/branches" className="flex items-center gap-3 px-6 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-[20px]">storefront</span>
              <span className="font-sans text-sm font-medium">Branches</span>
            </Link>
            <Link to="/admin/managers" className="flex items-center gap-3 px-6 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
              <span className="font-sans text-sm font-medium">User Management</span>
            </Link>
            <Link to="/admin/inventory" className="flex items-center gap-3 px-6 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              <span className="font-sans text-sm font-medium">Global Inventory</span>
            </Link>
            <Link to="/admin/purchases" className="flex items-center gap-3 px-6 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-[20px]">payments</span>
              <span className="font-sans text-sm font-medium">Financials</span>
            </Link>
            <Link to="/admin/analytics" className="flex items-center gap-3 px-6 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-[20px]">monitoring</span>
              <span className="font-sans text-sm font-medium">Reports & Analytics</span>
            </Link>
          </div>

          {/* Security */}
          <div>
            <div className="px-6 mb-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Security</h3>
            </div>
            <Link to="/admin/security" className="flex items-center gap-3 px-6 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-[20px]">security</span>
              <span className="font-sans text-sm font-medium">Audit Logs</span>
            </Link>
            <Link to="/admin/settings" className="flex items-center gap-3 px-6 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span className="font-sans text-sm font-medium">System Settings</span>
            </Link>
          </div>
        </nav>

        <div className="px-6 py-6 mt-auto">
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#ef4444]/30 text-[#ef4444] rounded hover:bg-[#ef4444]/10 transition-colors font-semibold text-xs tracking-wider uppercase">
            <span className="material-symbols-outlined text-[16px]">power_settings_new</span>
            Force Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen overflow-x-hidden">
        {/* TopAppBar Component */}
        <header className="sticky top-0 z-40 w-full h-16 bg-[#040d1a]/80 backdrop-blur-xl border-b border-white/5 px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase">HEAD OFFICE COMMAND CENTER</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-2 text-slate-500 text-[18px]">search</span>
              <input 
                className="bg-[#0b1727] border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-xs focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] w-[350px] text-white placeholder-slate-500 transition-all" 
                placeholder="Global search (IMEI, Branch, User)..." 
                type="text"
              />
            </div>
            
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              <Link to="/admin/notifications" className="relative text-slate-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ef4444] rounded-full"></span>
              </Link>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#3b82f6]/30 bg-[#0b1727] flex items-center justify-center cursor-pointer">
                <img src={`https://ui-avatars.com/api/?name=Admin&background=0b1727&color=3b82f6&size=32`} alt="Admin Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
