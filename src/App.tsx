import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider } from './context/I18nContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AccountSettings from './pages/AccountSettings';
import BuyerDashboard from './pages/BuyerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import { detectCountryCode } from './lib/geo';
import { setLanguageByCountry } from './i18n';

export default function App() {
  useEffect(() => {
    let active = true;
    const detectCountry = async () => {
      try {
        const storedCountry = localStorage.getItem('directem_country');
        if (storedCountry) {
          setLanguageByCountry(storedCountry);
          return;
        }
      } catch {
        // ignore storage errors
      }

      const code = await detectCountryCode();
      if (!active || !code) return;
      setLanguageByCountry(code);
    };

    detectCountry();
    return () => {
      active = false;
    };
  }, []);

  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/kali" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/kali/register" element={<Register />} />
            <Route path="/kali/owner" element={<Register />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute allowedRoles={['buyer', 'admin', 'owner']}>
                  <AccountSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/buyer"
              element={
                <ProtectedRoute allowedRoles={['buyer']}>
                  <BuyerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin', 'owner']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/owner"
              element={
                <ProtectedRoute allowedRoles={['owner']}>
                  <OwnerDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}
