import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/public/Home';


import Portfolio from './pages/public/projects/Portfolio'
import ProjectDetails from './pages/public/projects/ProjectDetails';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Contact } from './pages/public/Contact';

import "./localization/i18n";
import AuthPage from './pages/sign/AuthPage';


export default function App() {
  return (
    <Router>
      <Routes>
        {/* الصفحات العامة */}
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/contact" element={<Contact />} />

        {/* الحسابات */}
        <Route path="/authpage" element={<AuthPage />} />


        {/* لوحة تحكم المدير (الأدمن) */}
        <Route
          path="/dashboard/admin/*"
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardLayout role="admin" />
            </ProtectedRoute>
          }
        />

        {/* لوحة تحكم العميل */}
        <Route
          path="/dashboard/client/*"
          element={
            <ProtectedRoute allowedRole="client">
              <DashboardLayout role="client" />
            </ProtectedRoute>
          }
        />

        {/* التوجيه الافتراضي */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}