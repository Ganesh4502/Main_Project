import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Flame,
  Search,
  Menu,
  X,
  Trophy,
  MapPin,
  Activity,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CommandPalette } from '../components/ui/CommandPalette';
import { getDefaultDashboardForRole } from '../utils/rbac';

export const PublicLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const { role, isAuthenticated } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Sports', href: '/sports', icon: <Activity className="w-4 h-4" /> },
    { name: 'Arenas', href: '/arenas', icon: <MapPin className="w-4 h-4" /> },
    { name: 'Tournaments', href: '/tournaments', icon: <Trophy className="w-4 h-4" /> },
    { name: 'About', href: '/about', icon: null },
    { name: 'FAQ', href: '/faq', icon: null },
    { name: 'Contact', href: '/contact', icon: null },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />

      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-900/60 via-emerald-900/40 to-blue-900/60 border-b border-slate-800/80 px-4 py-1.5 text-xs text-center text-slate-300 flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> AI-Powered Sports Management
        </span>
        <span className="hidden md:inline text-slate-500">|</span>
        <span className="hidden md:inline">Discover arenas, create tournaments, and generate balanced fixtures instantly.</span>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300 border border-emerald-400/40">
              <Flame className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white font-display">SPOTIX</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Smart Sports SaaS</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/60">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Search trigger */}
            <button
              onClick={() => setIsCommandOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Search...</span>
              <kbd className="text-[10px] bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-slate-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Live Matches shortcut */}
            <Link
              to="/matches/m-live-1/live"
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold hover:bg-rose-500/20 transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              Live Match Center
            </Link>

            {/* Dashboard / Auth CTA */}
            {isAuthenticated && role ? (
              <Link
                to={getDefaultDashboardForRole(role)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 border border-emerald-400/30 transition-all"
              >
                <span>{role.replace('_', ' ')} Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-md shadow-emerald-500/20 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsCommandOpen(true)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 py-6 space-y-4 animate-in slide-in-from-top">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <Link
                to="/matches/m-live-1/live"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Live Match Center
              </Link>
            </nav>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
              {isAuthenticated && role ? (
                <Link
                  to={getDefaultDashboardForRole(role)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold text-sm"
                >
                  Go to {role.replace('_', ' ')} Dashboard
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-semibold text-xs"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Comprehensive Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-slate-950">
                  <Flame className="w-5 h-5 text-slate-950" />
                </div>
                <span className="text-2xl font-black text-white font-display">SPOTIX</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Smart Sports Tournament & Arena Management Platform. Connecting organizers, arenas, teams, players, sponsors, and officials through intelligent AI scheduling.
              </p>
              <div className="pt-2 text-xs text-slate-400 font-medium">
                <p>Play. Organize. Compete. Together.</p>
                <p className="text-emerald-400 font-semibold mt-0.5">More than a platform. A community for sports.</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">Platform</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link to="/sports" className="hover:text-emerald-400 transition-colors">Supported Sports</Link></li>
                <li><Link to="/arenas" className="hover:text-emerald-400 transition-colors">Arena Discovery</Link></li>
                <li><Link to="/tournaments" className="hover:text-emerald-400 transition-colors">Tournaments Hub</Link></li>
                <li><Link to="/matches/m-live-1/live" className="hover:text-emerald-400 transition-colors">Live Match Center</Link></li>
                <li><Link to="/about" className="hover:text-emerald-400 transition-colors">AI Scheduling Engine</Link></li>
              </ul>
            </div>

            {/* Roles */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">Roles & Access</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link to="/organizer/dashboard" className="hover:text-emerald-400 transition-colors">For Organizers</Link></li>
                <li><Link to="/arena/dashboard" className="hover:text-emerald-400 transition-colors">For Arena Managers</Link></li>
                <li><Link to="/team/dashboard" className="hover:text-emerald-400 transition-colors">For Team Managers</Link></li>
                <li><Link to="/official/dashboard" className="hover:text-emerald-400 transition-colors">For Match Officials</Link></li>
                <li><Link to="/sponsor/dashboard" className="hover:text-emerald-400 transition-colors">For Sponsors</Link></li>
              </ul>
            </div>

            {/* Company & Support */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">Resources</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Spotix</Link></li>
                <li><Link to="/faq" className="hover:text-emerald-400 transition-colors">Frequently Asked Questions</Link></li>
                <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Support</Link></li>
                <li><Link to="/settings" className="hover:text-emerald-400 transition-colors">Privacy & Terms</Link></li>
                <li className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> All Systems Operational
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} SPOTIX Inc. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span>Engineered for Elite Sports Competitions</span>
              <span>·</span>
              <span className="text-slate-400">Spring Boot + React Architecture</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
