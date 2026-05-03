import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import './AdminPage.css';

export const AdminLayout = () => {
  const { logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#001429] text-[#d2e4ff] font-sans selection:bg-[#aec8f0]/30 overflow-x-hidden">
      {/* TopAppBar Component */}
      <header className="fixed top-0 z-50 w-full bg-[#071A2F]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)] px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-xl font-black tracking-tighter text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">LOTCHAN MOBILES</span>
          <div className="hidden md:flex items-center gap-6 ml-8">
            <Link to="/admin" className="text-blue-400 font-bold font-sans text-sm tracking-wide">Overview</Link>
            <Link to="/admin/branches" className="text-slate-200 hover:bg-white/5 hover:text-blue-300 transition-all duration-200 font-sans text-sm tracking-wide px-3 py-1 rounded-lg">Inventory</Link>
            <Link to="/admin/reports" className="text-slate-200 hover:bg-white/5 hover:text-blue-300 transition-all duration-200 font-sans text-sm tracking-wide px-3 py-1 rounded-lg">Reports</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input className="bg-black/20 border border-white/10 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-[#aec8f0] focus:ring-1 focus:ring-[#aec8f0] w-64 text-white" placeholder="Search resources..." type="text"/>
            <span className="material-symbols-outlined absolute right-3 top-1.5 text-slate-300 text-lg">search</span>
          </div>
          <Link to="/admin/notifications" className="material-symbols-outlined text-slate-200 hover:text-[#aec8f0] transition-colors">notifications</Link>
          <Link to="/admin/settings" className="material-symbols-outlined text-slate-200 hover:text-[#aec8f0] transition-colors">settings</Link>
          <Link to="/admin/settings" className="w-8 h-8 rounded-full overflow-hidden border border-[#aec8f0]/30 bg-blue-900/50 flex items-center justify-center">
            <span className="material-symbols-outlined text-blue-200 text-sm">admin_panel_settings</span>
          </Link>
        </div>
      </header>

      <div className="pt-16 min-h-screen">
        {/* SideNavBar Component */}
        <aside className="fixed left-0 h-[calc(100vh-4rem)] w-64 bg-[#071A2F]/90 backdrop-blur-2xl border-r border-white/10 shadow-[10px_0_30px_rgba(0,0,0,0.3)] flex-col py-6 hidden lg:flex">
          <div className="px-6 mb-8">
            <h2 className="text-lg font-bold text-white font-sans">Admin Portal</h2>
            <p className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold">High-Performance Control</p>
          </div>
          <nav className="flex-1 space-y-1">
            <Link to="/admin" className="flex items-center gap-3 px-6 py-3 text-slate-300 hover:bg-white/5 hover:text-slate-200 hover:translate-x-1 transition-all">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-sans text-xs font-semibold uppercase tracking-widest">Dashboard</span>
            </Link>
            <Link to="/admin/branches" className="flex items-center gap-3 px-6 py-3 text-slate-300 hover:bg-white/5 hover:text-slate-200 hover:translate-x-1 transition-all">
              <span className="material-symbols-outlined">storefront</span>
              <span className="font-sans text-xs font-semibold uppercase tracking-widest">Branches</span>
            </Link>
            <Link to="/admin/managers" className="flex items-center gap-3 px-6 py-3 text-slate-300 hover:bg-white/5 hover:text-slate-200 hover:translate-x-1 transition-all">
              <span className="material-symbols-outlined">badge</span>
              <span className="font-sans text-xs font-semibold uppercase tracking-widest">Managers</span>
            </Link>
            <Link to="/admin/organization" className="flex items-center gap-3 px-6 py-3 text-slate-300 hover:bg-white/5 hover:text-slate-200 hover:translate-x-1 transition-all">
              <span className="material-symbols-outlined">account_tree</span>
              <span className="font-sans text-xs font-semibold uppercase tracking-widest">Hierarchy</span>
            </Link>
            <Link to="/admin/analytics" className="flex items-center gap-3 px-6 py-3 text-slate-300 hover:bg-white/5 hover:text-slate-200 hover:translate-x-1 transition-all">
              <span className="material-symbols-outlined">monitoring</span>
              <span className="font-sans text-xs font-semibold uppercase tracking-widest">Analytics</span>
            </Link>
          </nav>
          <div className="px-6 mt-auto space-y-4">
            <Link to="/admin/reports" className="block w-full text-center admin-signature-gradient text-[#153152] font-medium py-3 rounded-lg text-sm shadow-[0_4px_15px_rgba(59,130,246,0.4)] hover:translate-y-[-2px] transition-all">
              Generate Report
            </Link>
            <div className="pt-4 border-t border-white/10">
              <Link to="/admin/support" className="flex items-center gap-3 py-2 text-slate-300 hover:text-slate-200 transition-colors">
                <span className="material-symbols-outlined text-sm">help</span>
                <span className="font-sans text-xs font-semibold uppercase tracking-widest">Support</span>
              </Link>
              <button onClick={logout} className="flex items-center gap-3 py-2 text-slate-300 hover:text-[#ffb4ab] transition-colors w-full text-left">
                <span className="material-symbols-outlined text-sm">logout</span>
                <span className="font-sans text-xs font-semibold uppercase tracking-widest">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:ml-64 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
