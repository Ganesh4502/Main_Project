import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDefaultDashboardForRole } from '../utils/rbac';
import { Flame } from 'lucide-react';

interface PublicOnlyRouteProps {
  children?: React.ReactNode;
}

export const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ children }) => {
  const { role, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center text-slate-100">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 animate-pulse mb-4">
          <Flame className="w-6 h-6" />
        </div>
        <div className="text-xs font-semibold text-slate-400">Loading Spotix...</div>
      </div>
    );
  }

  // Already logged in -> redirect away from /login or /register to authorized dashboard
  if (isAuthenticated && role) {
    return <Navigate to={getDefaultDashboardForRole(role)} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
