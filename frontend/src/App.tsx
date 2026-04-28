import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import ManagerLayout from './pages/ManagerLayout';
import ManagerDashboardPage from './pages/ManagerDashboardPage';
import ManagerPurchasesPage from './pages/ManagerPurchasesPage';
import ManagerInventoryPage from './pages/ManagerInventoryPage';
import ManagerExpensesPage from './pages/ManagerExpensesPage';
import ManagerRepairSparesPage from './pages/ManagerRepairSparesPage';
import ManagerRepairSparePurchasesPage from './pages/ManagerRepairSparePurchasesPage';
import { SalesPage } from './pages/SalesPage';
import { AdminResetPasswordPage } from './pages/AdminResetPasswordPage';
import { AdminVerifyOtpPage } from './pages/AdminVerifyOtpPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/reset-password" element={<AdminResetPasswordPage />} />
        <Route path="/admin/verify-otp" element={<AdminVerifyOtpPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<ManagerDashboardPage />} />
          <Route path="purchases" element={<ManagerPurchasesPage />} />
          <Route path="inventory" element={<ManagerInventoryPage />} />
          <Route path="expenses" element={<ManagerExpensesPage />} />
          <Route path="repair-spares" element={<ManagerRepairSparesPage />} />
          <Route path="repair-spare-purchases" element={<ManagerRepairSparePurchasesPage />} />
        </Route>
        <Route path="/sales" element={<SalesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
