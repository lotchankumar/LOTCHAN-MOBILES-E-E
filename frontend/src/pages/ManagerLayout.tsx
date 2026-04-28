import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/manager', label: 'Dashboard', icon: '🏠' },
  { path: '/manager/purchases', label: 'Purchases', icon: '🛒' },
  { path: '/manager/inventory', label: 'Inventory', icon: '📦' },
  { path: '/manager/expenses', label: 'Expenses', icon: '💰' },
  { path: '/manager/mt-deposits', label: 'MT Deposits', icon: '💳' },
  { path: '/manager/repair-spares', label: 'Spare Products', icon: '🔧' },
  { path: '/manager/repair-spare-purchases', label: 'Spare Purchases', icon: '📥' },
];

const ManagerLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Manager Dashboard</h2>
          </div>
          <nav className="mt-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-4 text-lg font-medium border-l-4 ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-700 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50 border-transparent hover:border-gray-300'
                }`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ManagerLayout;
