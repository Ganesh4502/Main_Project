import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Flame, Lock, Mail, ArrowRight, Sparkles, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Button } from '../../components/ui/Button';
import { getDefaultDashboardForRole } from '../../utils/rbac';
import { MOCK_CREDENTIALS } from '../../api/authApi';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@spotix.io');
  const [password, setPassword] = useState('SpotixAdmin2026!');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const { login, isLoading } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const authenticatedUser = await login({ email, password, rememberMe });
      showToast('success', `Welcome back, ${authenticatedUser.name}`, `Authenticated as ${authenticatedUser.role.replace('_', ' ')}.`);
      
      // Auto-redirect to the authorized dashboard for this role
      const defaultPath = getDefaultDashboardForRole(authenticatedUser.role);
      const targetPath = (location.state as any)?.from?.pathname || defaultPath;
      navigate(targetPath, { replace: true });
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid email or password. Please verify your credentials.');
    }
  };

  const handleFillDemoCredentials = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/80 shadow-2xl shadow-emerald-500/5">
        {/* Left Side: Sports Cinematic Visuals */}
        <div className="relative hidden lg:flex flex-col justify-between p-10 bg-slate-950 border-r border-slate-800/80">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&auto=format&fit=crop&q=80"
              alt="Sports Arena Background"
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-black text-white font-display">SPOTIX</span>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Enterprise Sports SaaS</p>
            </div>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              <Sparkles className="w-3.5 h-3.5" /> Secure RBAC Authentication
            </div>
            <h2 className="text-3xl font-black text-white font-display leading-tight">
              Centralized Access. Automatic Role Redirection.
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Authenticate your identity to enter your designated workspace. Role-based security guarantees protected access across all federation modules.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Play. Organize. Compete. Together.</span>
            <span className="text-emerald-400 font-semibold">Spring Boot & JWT Ready</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-6">
              <div>
                <h2 className="text-2xl font-black text-white font-display">Sign In to Spotix</h2>
                <p className="text-xs text-slate-400 mt-1">Enter registered credentials to access your dashboard</p>
              </div>
              <Link to="/" className="text-xs text-emerald-400 font-semibold hover:underline">
                Public Website
              </Link>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 mb-4 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Registered Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    placeholder="admin@spotix.io"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-300 font-semibold">Password</label>
                  <Link to="/forgot-password" className="text-xs text-emerald-400 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Remember me for 30 days</span>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Authenticate & Enter Dashboard
              </Button>
            </form>

            {/* Registered Demo Accounts Preset Helpers */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Test Credentials (Click to Fill)
                </p>
                <span className="text-[10px] text-slate-500">Auto-routes by role</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleFillDemoCredentials('admin@spotix.io', 'SpotixAdmin2026!')}
                  className="p-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 rounded-xl text-left transition-colors cursor-pointer"
                >
                  <span className="font-bold text-slate-100 block">👑 Super Admin</span>
                  <span className="text-[10px] text-slate-500 truncate block">admin@spotix.io</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemoCredentials('organizer@spotix.io', 'SpotixOrganizer2026!')}
                  className="p-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 rounded-xl text-left transition-colors cursor-pointer"
                >
                  <span className="font-bold text-emerald-400 block">🏆 Organizer</span>
                  <span className="text-[10px] text-slate-500 truncate block">organizer@spotix.io</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemoCredentials('arena@apexcomplex.com', 'SpotixArena2026!')}
                  className="p-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 rounded-xl text-left transition-colors cursor-pointer"
                >
                  <span className="font-bold text-blue-400 block">🏟️ Arena Manager</span>
                  <span className="text-[10px] text-slate-500 truncate block">arena@apexcomplex.com</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemoCredentials('official@spotix.io', 'SpotixOfficial2026!')}
                  className="p-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 rounded-xl text-left transition-colors cursor-pointer"
                >
                  <span className="font-bold text-amber-400 block">⚡ Official / Ref</span>
                  <span className="text-[10px] text-slate-500 truncate block">official@spotix.io</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemoCredentials('manager@cyberknights.com', 'SpotixTeam2026!')}
                  className="p-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 rounded-xl text-left transition-colors cursor-pointer"
                >
                  <span className="font-bold text-indigo-400 block">🛡️ Team Manager</span>
                  <span className="text-[10px] text-slate-500 truncate block">manager@cyberknights.com</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemoCredentials('player@spotix.io', 'SpotixPlayer2026!')}
                  className="p-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 rounded-xl text-left transition-colors cursor-pointer"
                >
                  <span className="font-bold text-teal-400 block">🏃 Player</span>
                  <span className="text-[10px] text-slate-500 truncate block">player@spotix.io</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 text-center text-xs text-slate-400">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-emerald-400 font-bold hover:underline">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

