import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
// Admin pages
import { AdminPage } from './pages/admin/AdminPage';
import ManagersPage from './pages/admin/Managers';
import BranchesPage from './pages/admin/Branches';
import OrganizationPage from './pages/admin/OrganizationPage';
// Manager pages
import { ManagerLayout } from './pages/manager/ManagerLayout';
import { ManagerDashboardPage } from './pages/manager/ManagerDashboardPage';
import { ManagerPurchasesPage } from './pages/manager/ManagerPurchasesPage';
import { ManagerInventoryPage } from './pages/manager/ManagerInventoryPage';
import { ManagerRepairInventoryPage } from './pages/manager/ManagerRepairInventoryPage';

import { ManagerExpensesPage } from './pages/manager/ManagerExpensesPage';
import { ManagerSuppliersPage } from './pages/manager/ManagerSuppliersPage';
import StaffPage from './pages/manager/Staff';
// Staff pages
import { StaffLayout } from './pages/staff/StaffLayout';
import { SalesPage } from './pages/staff/SalesPage';
import { ShiftPage } from './pages/staff/ShiftPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuthStore } from './store/auth.store';
import { UserRole } from './types';
// Technician pages
import { TechnicianLayout } from './pages/technician/TechnicianLayout';
import { RepairsPage } from './pages/technician/RepairsPage';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Navigate to="/login" replace />
          } 
        />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <AdminPage />
            </ProtectedRoute>
          } 
        />
          <Route 
            path="/admin/managers" 
            element={
              <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                <ManagersPage />
              </ProtectedRoute>
            } 
          /> 
          <Route 
            path="/admin/branches" 
            element={
              <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                <BranchesPage />
              </ProtectedRoute>
            } 
          /> 
          <Route 
            path="/admin/organization" 
            element={
              <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                <OrganizationPage />
              </ProtectedRoute>
            } 
          />
        <Route 
          path="/manager" 
          element={
            <ProtectedRoute allowedRoles={[UserRole.MANAGER, UserRole.ADMIN]}>
              <ManagerLayout />
            </ProtectedRoute>
          } 
        >
          <Route path="dashboard" element={<ManagerDashboardPage />} />
          <Route path="purchases" element={<ManagerPurchasesPage />} />
          <Route path="inventory" element={<ManagerInventoryPage />} />
          <Route path="repair-inventory" element={<ManagerRepairInventoryPage />} />
          <Route path="suppliers" element={<ManagerSuppliersPage />} />
          <Route path="expenses" element={<ManagerExpensesPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
        <Route 
          path="/staff" 
          element={
            <ProtectedRoute allowedRoles={[UserRole.STAFF, UserRole.MANAGER, UserRole.ADMIN]}>
              <StaffLayout />
            </ProtectedRoute>
          } 
        >
          <Route path="sales" element={<SalesPage />} />
          <Route path="shift" element={<ShiftPage />} />
          <Route index element={<SalesPage />} />
        </Route>
        <Route 
          path="/technician" 
          element={
            <ProtectedRoute allowedRoles={[UserRole.TECHNICIAN, UserRole.MANAGER, UserRole.ADMIN]}>
              <TechnicianLayout />
            </ProtectedRoute>
          } 
        >
          <Route path="repairs" element={<RepairsPage />} />
          <Route index element={<Navigate to="repairs" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;