import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trophy,
  Users,
  Calendar,
  Sparkles,
  UserCheck,
  Play,
  Plus,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { MOCK_TOURNAMENTS, MOCK_MATCHES, MOCK_REGISTRATIONS } from '../../api/mockData';

export const OrganizerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const myTournaments = MOCK_TOURNAMENTS;
  const pendingRegistrations = MOCK_REGISTRATIONS.filter(r => r.status === 'PENDING');
  const liveMatches = MOCK_MATCHES.filter(m => m.status === 'LIVE');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white font-display">Organizer Command Studio</h1>
            <Badge variant="primary">Metropolitan Athletics</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Coordinate tournaments, run AI fixture generators, review team rosters, and monitor live referees.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="glow"
            size="sm"
            onClick={() => navigate('/organizer/tournaments/create')}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create Tournament
          </Button>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900/40 via-slate-900 to-emerald-900/40 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Sparkles className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">AI Scheduling Studio Ready</h3>
            <p className="text-xs text-slate-400">Generate 0-conflict tournament schedules with 1-click optimization.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/organizer/tournaments/tour-1/ai-fixture')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Launch AI Scheduler
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/organizer/matches/m-live-1/ai-official')}
          >
            AI Referee Matcher
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="My Tournaments"
          value={myTournaments.length}
          change="3 Live & Reg"
          isPositive={true}
          icon={<Trophy className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Registered Teams"
          value="48 Clubs"
          change="+6 this week"
          isPositive={true}
          icon={<Users className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Pending Applications"
          value={pendingRegistrations.length || 2}
          change="Needs Review"
          isPositive={false}
          icon={<Clock className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Matches Live"
          value={liveMatches.length || 1}
          change="Active Court"
          isPositive={true}
          icon={<Play className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Available Arenas"
          value="6 Venues"
          change="Ready to Book"
          isPositive={true}
          icon={<MapPin className="w-5 h-5" />}
          color="blue"
        />
      </div>

      {/* Active Tournaments & Match Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Tournaments */}
        <Card className="lg:col-span-2 border border-slate-800 space-y-4 p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-100">Tournament Portfolio</h3>
              <p className="text-xs text-slate-400">Current competitions managed by your federation</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/organizer/tournaments')}>
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {myTournaments.slice(0, 3).map((tour) => (
              <div
                key={tour.id}
                onClick={() => navigate(`/organizer/tournaments/${tour.id}`)}
                className="p-4 bg-slate-950/70 hover:bg-slate-850 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <img src={tour.bannerUrl} alt={tour.name} className="w-14 h-14 rounded-xl object-cover border border-slate-800 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-100">{tour.name}</h4>
                      <Badge variant={tour.status === 'LIVE' ? 'live' : 'success'} size="sm">
                        {tour.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{tour.sport} · {tour.venue} · {tour.registeredTeamsCount}/{tour.maxTeams} Teams</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <span className="text-xs text-emerald-400 font-bold font-mono">
                    {tour.scheduleQualityScore}% Quality
                  </span>
                  <Button variant="outline" size="sm" className="text-xs py-1 h-8">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Pending Registrations */}
        <Card className="border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-slate-100">Pending Approvals</h3>
            <Badge variant="warning" size="sm">{pendingRegistrations.length} Pending</Badge>
          </div>

          <div className="space-y-3">
            {pendingRegistrations.map((reg) => (
              <div key={reg.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-100">{reg.teamName}</span>
                  <Badge variant="warning" size="sm">Review</Badge>
                </div>
                <p className="text-[11px] text-slate-400">Manager: {reg.managerName} ({reg.playersCount} players)</p>
                <div className="pt-2 flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 text-[11px] py-1 h-7"
                    onClick={() => navigate(`/organizer/tournaments/tour-1`)}
                  >
                    Approve Team
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
