import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: 'admin' | 'client';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const userRole = localStorage.getItem('user_role');
  const isAuthenticated = localStorage.getItem('is_authenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== allowedRole) {
    return <Navigate to={userRole === 'admin' ? '/dashboard/admin' : '/dashboard/client'} replace />;
  }

  return <>{children}</>;
};
export default ProtectedRoute;