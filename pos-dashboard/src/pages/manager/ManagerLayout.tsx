import { type ReactNode, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { UserRole } from '../../types';
import { LayoutDashboard, ShoppingCart, Package, Receipt, Users, ArrowRightLeft, Menu, Wrench, Truck } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: ReactNode;
}

export const ManagerLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      path: '/manager/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: 'Purchases',
      path: '/manager/purchases',
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      name: 'Inventory',
      path: '/manager/inventory',
      icon: <Package className="w-5 h-5" />,
    },
    {
      name: 'Repair Inventory',
      path: '/manager/repair-inventory',
      icon: <Wrench className="w-5 h-5" />,
    },

    {
      name: 'Suppliers',
      path: '/manager/suppliers',
      icon: <Truck className="w-5 h-5" />,
    },
    {
      name: 'Expenses',
      path: '/manager/expenses',
      icon: <Receipt className="w-5 h-5" />,
    },
    {
      name: 'Staff Management',
      path: '/manager/staff',
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: 'Staff Panel (Switch)',
      path: '/staff',
      icon: <ArrowRightLeft className="w-5 h-5" />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <nav className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden mr-3 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-foreground">LOTCHAN Mobiles Manager Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="mr-2 text-sm text-muted-foreground">Welcome,</span>
                <span className="font-medium text-foreground">{user?.email}</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                  user?.role === UserRole.MANAGER ? 'bg-primary/20 text-primary-dark' :
                  user?.role === UserRole.ADMIN ? 'bg-destructive/20 text-destructive' :
                  'bg-success/20 text-success'
                }`}>
                  {user?.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="btn-primary py-2 px-4 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex">
          {/* Sidebar Navigation */}
          <div className={`${
            isSidebarOpen ? 'block' : 'hidden'
          } md:block md:w-64 flex-shrink-0`}>
            <div className="card p-4">
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.name === 'Staff Panel (Switch)' && (
                      <div className="my-4 border-t border-border" />
                    )}
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                        location.pathname === item.path
                          ? 'bg-primary/10 text-primary border-l-4 border-primary'
                          : item.name === 'Staff Panel (Switch)'
                          ? 'text-primary hover:bg-primary/10 font-semibold'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </Link>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 md:ml-6">
            <div className="card p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};