import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ShieldAlert, AlertTriangle, WifiOff, Wrench, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 border border-slate-800 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
          <Flame className="w-8 h-8" />
        </div>
        <div>
          <span className="text-4xl font-black text-white font-display">404</span>
          <h2 className="text-xl font-bold text-slate-100 mt-2">Looks like this match has ended.</h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            The page, tournament fixture, or arena you're looking for doesn't exist or has been moved to an archived season.
          </p>
        </div>
        <Link to="/">
          <Button variant="primary" size="md" className="w-full" leftIcon={<Home className="w-4 h-4" />}>
            Go Home
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export const ForbiddenPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 border border-slate-800 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div>
          <span className="text-4xl font-black text-white font-display">403</span>
          <h2 className="text-xl font-bold text-slate-100 mt-2">Access Denied: Restricted Zone</h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            You do not possess the required federation role credentials to access this administrative module.
          </p>
        </div>
        <Link to="/">
          <Button variant="primary" size="md" className="w-full" leftIcon={<Home className="w-4 h-4" />}>
            Return to Safety
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export const ServerErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 border border-slate-800 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div>
          <span className="text-4xl font-black text-white font-display">500</span>
          <h2 className="text-xl font-bold text-slate-100 mt-2">Referee Whistle: Server Error</h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Something unexpected occurred while crunching tournament brackets. Our engineering team has been notified.
          </p>
        </div>
        <Link to="/">
          <Button variant="primary" size="md" className="w-full">
            Try Again / Go Home
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export const NetworkErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 border border-slate-800 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
          <WifiOff className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100">Live Connection Interrupted</h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Unable to connect to the Spotix STOMP / WebSocket gateway. Checking court network connectivity...
          </p>
        </div>
        <Button variant="primary" size="md" className="w-full" onClick={() => window.location.reload()}>
          Reconnect Feed
        </Button>
      </Card>
    </div>
  );
};

export const MaintenancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 border border-slate-800 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/30">
          <Wrench className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100">Court Maintenance in Progress</h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Spotix is undergoing planned upgrades to optimize AI fixture algorithms. We'll be back before next tip-off.
          </p>
        </div>
        <Link to="/">
          <Button variant="outline" size="md" className="w-full">
            Refresh Status
          </Button>
        </Link>
      </Card>
    </div>
  );
};
