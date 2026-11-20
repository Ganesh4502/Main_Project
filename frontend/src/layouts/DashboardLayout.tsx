import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Flame,
  LayoutDashboard,
  Users,
  Shield,
  Activity,
  Trophy,
  MapPin,
  Calendar,
  Sparkles,
  BarChart3,
  Bell,
  Search,
  Settings,
  LogOut,
  UserCheck,
  Menu,
  X,
  Play,
  CheckCircle2,
  ChevronDown,
  Layers,
  HelpCircle,
  Clock,
  Sliders
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { CommandPalette } from '../components/ui/CommandPalette';
import { Badge } from '../components/ui/Badge';
import { UserRole } from '../types';

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { user, role, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation Items by Role
  const getNavLinks = (userRole: UserRole | null) => {
    switch (userRole) {
      case 'SUPER_ADMIN':
        return [
          { name: 'Dashboard Overview', href: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { name: 'User Management', href: '/admin/users', icon: <Users className="w-4 h-4" /> },
          { name: 'Role Management', href: '/admin/roles', icon: <Shield className="w-4 h-4" /> },
          { name: 'Sports Management', href: '/admin/sports', icon: <Activity className="w-4 h-4" /> },
          { name: 'Officials Management', href: '/admin/officials', icon: <UserCheck className="w-4 h-4" /> },
          { name: 'Analytics', href: '/analytics', icon: <BarChart3 className="w-4 h-4" /> },
          { name: 'Settings', href: '/settings', icon: <Settings className="w-4 h-4" /> },
        ];
      case 'SPONSOR':
        return [
          { name: 'Dashboard', href: '/sponsor/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { name: 'Sponsored Tournaments', href: '/tournaments', icon: <Trophy className="w-4 h-4" /> },
          { name: 'Officials', href: '/sponsor/officials', icon: <UserCheck className="w-4 h-4" /> },
          { name: 'Participation Analytics', href: '/analytics', icon: <BarChart3 className="w-4 h-4" /> },
          { name: 'Settings', href: '/settings', icon: <Settings className="w-4 h-4" /> },
        ];
      case 'ORGANIZER':
        return [
          { name: 'Dashboard', href: '/organizer/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { name: 'My Tournaments', href: '/organizer/tournaments', icon: <Trophy className="w-4 h-4" /> },
          { name: 'Create Tournament', href: '/organizer/tournaments/create', icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
          { name: 'Team Registrations', href: '/organizer/tournaments/tour-1', icon: <Sliders className="w-4 h-4" /> },
          { name: 'AI Fixture Generator', href: '/organizer/tournaments/tour-1/ai-fixture', icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
          { name: 'Fixture Management', href: '/organizer/tournaments/tour-1/fixtures', icon: <Calendar className="w-4 h-4" /> },
          { name: 'Match Management', href: '/organizer/matches', icon: <Play className="w-4 h-4" /> },
          { name: 'Official Assignment', href: '/organizer/matches/m-live-1/ai-official', icon: <UserCheck className="w-4 h-4 text-blue-400" /> },
          { name: 'Analytics', href: '/analytics', icon: <BarChart3 className="w-4 h-4" /> },
        ];
      case 'ARENA_MANAGER':
        return [
          { name: 'Dashboard', href: '/arena/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { name: 'My Arenas', href: '/arena/my-arenas', icon: <MapPin className="w-4 h-4" /> },
          { name: 'Arena Slots', href: '/arena/arena-1/slots', icon: <Calendar className="w-4 h-4" /> },
          { name: 'Bookings', href: '/arena/bookings', icon: <Clock className="w-4 h-4" /> },
          { name: 'Availability', href: '/arena/my-arenas', icon: <Sliders className="w-4 h-4" /> },
          { name: 'Settings', href: '/settings', icon: <Settings className="w-4 h-4" /> },
        ];
      case 'TEAM_MANAGER':
        return [
          { name: 'Dashboard', href: '/team/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { name: 'My Team', href: '/team', icon: <Shield className="w-4 h-4" /> },
          { name: 'Players', href: '/team/players', icon: <Users className="w-4 h-4" /> },
          { name: 'Tournament Registrations', href: '/tournaments', icon: <Trophy className="w-4 h-4" /> },
          { name: 'Upcoming Matches', href: '/matches/m-live-1/live', icon: <Play className="w-4 h-4 text-rose-400" /> },
        ];
      case 'PLAYER':
        return [
          { name: 'Dashboard', href: '/player/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { name: 'Profile', href: '/profile', icon: <UserCheck className="w-4 h-4" /> },
          { name: 'My Team', href: '/team', icon: <Users className="w-4 h-4" /> },
          { name: 'Matches', href: '/matches/m-live-1/live', icon: <Play className="w-4 h-4 text-rose-400" /> },
          { name: 'Performance', href: '/analytics', icon: <BarChart3 className="w-4 h-4" /> },
        ];
      case 'OFFICIAL':
        return [
          { name: 'Dashboard', href: '/official/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { name: 'Assigned Matches', href: '/official/dashboard', icon: <Play className="w-4 h-4 text-emerald-400 font-bold" /> },
          { name: 'Availability', href: '/official/availability', icon: <Calendar className="w-4 h-4" /> },
          { name: 'Live Scoring', href: '/official/matches/m-live-1/control', icon: <Activity className="w-4 h-4 text-emerald-400 font-bold" /> },
          { name: 'Match Reports', href: '/profile', icon: <UserCheck className="w-4 h-4" /> },
        ];
      case 'SPECTATOR':
      default:
        return [
          { name: 'Discover Tournaments', href: '/tournaments', icon: <Trophy className="w-4 h-4" /> },
          { name: 'Live Matches', href: '/matches/m-live-1/live', icon: <Play className="w-4 h-4 text-rose-400" /> },
          { name: 'Teams', href: '/spectator', icon: <Shield className="w-4 h-4" /> },
          { name: 'Standings', href: '/tournaments/tour-1', icon: <BarChart3 className="w-4 h-4" /> },
          { name: 'Results', href: '/spectator', icon: <CheckCircle2 className="w-4 h-4" /> },
        ];
    }
  };

  const navLinks = getNavLinks(role);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col antialiased">
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />

      {/* Topbar */}
      <header className="sticky top-0 z-30 h-16 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Hamburger & Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-emerald-500/20">
              <Flame className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-black text-white font-display">SPOTIX</span>
              {role && (
                <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                  {role.replace('_', ' ')}
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Center: Command Palette Trigger */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <button
            onClick={() => setIsCommandOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Search fixtures, teams, players, arenas...</span>
            </div>
            <kbd className="text-[10px] bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-slate-400 font-mono">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right: Actions, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Role Indicator */}
          {role && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>{role.replace('_', ' ')}</span>
            </div>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                    Notifications ({unreadCount} unread)
                  </h4>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[11px] text-emerald-400 hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60 my-2">
                  {notifications.length === 0 ? (
                    <p className="text-center py-6 text-xs text-slate-400">No new notifications</p>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markAsRead(n.id);
                          if (n.link) navigate(n.link);
                          setNotifDropdownOpen(false);
                        }}
                        className={`py-2.5 px-2 rounded-xl text-xs transition-colors cursor-pointer ${
                          !n.isRead ? 'bg-slate-800/40 text-slate-100' : 'text-slate-400 hover:bg-slate-800/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-200">{n.title}</span>
                          <span className="text-[10px] text-slate-500">{n.createdAt}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="pt-2 border-t border-slate-800 text-center">
                  <Link
                    to="/notifications"
                    onClick={() => setNotifDropdownOpen(false)}
                    className="text-xs text-emerald-400 font-semibold hover:underline"
                  >
                    View All Notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
            >
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name}
                className="w-8 h-8 rounded-xl object-cover border border-slate-700"
              />
              <span className="hidden lg:block text-xs font-semibold text-slate-200 text-left">
                {user?.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-xs font-bold text-slate-100">{user?.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                </div>
                <div className="py-1 space-y-0.5 text-xs">
                  <Link
                    to="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    <Settings className="w-4 h-4 text-blue-400" />
                    <span>Account Settings</span>
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Public Website</span>
                  </Link>
                </div>
                <div className="pt-1 border-t border-slate-800">
                  <button
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout Body: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-slate-950/95 backdrop-blur-2xl border-r border-slate-800/80 transform transition-transform duration-300 lg:static lg:translate-x-0 pt-16 lg:pt-0 flex flex-col justify-between ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Navigation Items */}
          <div className="p-4 space-y-1 overflow-y-auto">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {role.replace('_', ' ')} Navigation
            </div>

            {navLinks.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/90 to-emerald-600/90 text-white shadow-lg shadow-emerald-500/10 border border-emerald-400/30 font-bold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Quick Support & Match Short link */}
          <div className="p-4 border-t border-slate-800/80 space-y-3">
            <Link
              to="/matches/m-live-1/live"
              className="flex items-center justify-between p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 transition-all text-xs text-rose-300 font-bold"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>Live Match Arena</span>
              </div>
              <Play className="w-3.5 h-3.5 fill-current" />
            </Link>

            <div className="p-3 bg-slate-900/60 rounded-2xl border border-slate-800/80 text-[11px] text-slate-400">
              <p className="font-semibold text-slate-200">Spotix Enterprise Suite</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Connected to Spring Boot API</p>
            </div>
          </div>
        </aside>

        {/* Content View Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#070b14]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
