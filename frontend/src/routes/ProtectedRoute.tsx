import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Flame } from 'lucide-react';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user, role, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Prevent flash of unauthorized content while checking session/token
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center text-slate-100">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 animate-pulse mb-4">
          <Flame className="w-6 h-6" />
        </div>
        <div className="text-xs font-semibold text-slate-400">Verifying Spotix Security Credentials...</div>
      </div>
    );
  }

  // Not authenticated -> redirect to login with saved location state
  if (!isAuthenticated || !user || !role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check: if specific roles are required and user role is not authorized -> redirect to 403
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/403" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
