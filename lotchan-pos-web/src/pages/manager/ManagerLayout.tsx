import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import {
  LayoutDashboard, ShoppingCart, Package, Receipt, Users, ArrowRightLeft,
  Menu, X, Wrench, Truck, LogOut
} from 'lucide-react';
import '../shared/pos-theme.css';

export const ManagerLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/manager/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Purchases', path: '/manager/purchases', icon: <ShoppingCart className="w-5 h-5" /> },
    { name: 'Product Inventory', path: '/manager/inventory', icon: <Package className="w-5 h-5" /> },
    { name: 'Repair Inventory', path: '/manager/repair-inventory', icon: <Wrench className="w-5 h-5" /> },
    { name: 'Suppliers', path: '/manager/suppliers', icon: <Truck className="w-5 h-5" /> },
    { name: 'Expenses', path: '/manager/expenses', icon: <Receipt className="w-5 h-5" /> },
    { name: 'Staff Management', path: '/manager/staff', icon: <Users className="w-5 h-5" /> },
  ];

  const switchItem = { name: 'Staff Panel', path: '/staff', icon: <ArrowRightLeft className="w-5 h-5" /> };

  return (
    <div className="pos-theme">
      {/* ===== TOP NAV ===== */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 pos-topnav">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-slate-400 hover:text-blue-300 transition-colors"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Lotchan Mobiles
          </span>
          <span className="hidden md:inline text-xs font-medium text-slate-500 uppercase tracking-widest">
            Manager Dashboard
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-slate-400">Welcome,</span>
            <span className="text-sm font-medium text-blue-300">{user?.name || user?.email}</span>
            {user?.branchName && (
              <span className="text-xs font-medium text-cyan-400 bg-cyan-900/30 px-2 py-0.5 rounded border border-cyan-800/50 ml-2">
                {user.branchName}
              </span>
            )}
          </div>
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="h-8 w-8 rounded-full border border-blue-500/30 overflow-hidden bg-[#0c2b49] flex items-center justify-center hover:border-blue-400 transition-colors cursor-pointer"
            >
              <span className="text-xs font-bold text-blue-400">
                {(user?.name || user?.email || 'M').charAt(0).toUpperCase()}
              </span>
            </button>
            {showProfileMenu && (
              <div className="pos-profile-dropdown pos-fade-in">
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="text-sm font-medium text-blue-300 truncate mt-0.5">{user?.name || user?.email}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">
                    {user?.role} {user?.branchName ? ` • ${user.branchName}` : ''}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ===== SIDE NAV ===== */}
      <aside className={`fixed left-0 top-16 h-[calc(100vh-64px)] w-64 flex flex-col z-40 pos-sidenav transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-[#d2e4ff]">Operations</h2>
          <p className="text-[10px] uppercase tracking-widest text-slate-500">Manager</p>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                location.pathname === item.path ? 'pos-nav-active' : 'pos-nav-link'
              }`}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
          {/* Divider + Switch */}
          <div className="my-3 border-t border-white/5" />
          <Link
            to={switchItem.path}
            onClick={() => setIsSidebarOpen(false)}
            className="w-full flex items-center gap-3 p-3 rounded-lg pos-nav-link text-cyan-400 hover:text-cyan-300"
          >
            {switchItem.icon}
            <span className="text-xs font-medium">{switchItem.name}</span>
          </Link>
        </nav>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="md:ml-64 mt-16 p-6 min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>

      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};