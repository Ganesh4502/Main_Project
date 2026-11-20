import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserCheck,
  Trophy,
  Activity,
  Calendar,
  Star,
  Play,
  CheckCircle2,
  Clock,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';
import { MOCK_PLAYERS, MOCK_MATCHES, MOCK_OFFICIALS } from '../../api/mockData';
import { MatchCard } from '../../components/sports/MatchCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/ui/StatCard';
import { useNotification } from '../../context/NotificationContext';

export const PlayerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const player = MOCK_PLAYERS[0]; // Jordan Rivera

  return (
    <div className="space-y-8">
      {/* Player Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={player.avatarUrl} alt={player.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-xl" />
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 font-black text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-900 font-display">
              #{player.jerseyNumber}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white font-display">{player.name}</h1>
              <Badge variant="primary">{player.position}</Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{player.teamName} · Spotix Elite Athlete</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="glow" size="sm" onClick={() => navigate('/matches/m-live-1/live')} leftIcon={<Play className="w-4 h-4 fill-slate-950" />}>
            Watch Live Match
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Points" value={player.stats.pointsOrGoals} change="22.9 PPG Avg" isPositive={true} icon={<Activity className="w-5 h-5" />} color="emerald" />
        <StatCard title="Assists Recorded" value={player.stats.assists} change="7.5 APG Avg" isPositive={true} icon={<Zap className="w-5 h-5" />} color="blue" />
        <StatCard title="MVP Awards" value={`${player.stats.mvpAwards} Accolades`} change="Top 5 in League" isPositive={true} icon={<Trophy className="w-5 h-5" />} color="amber" />
        <StatCard title="Athletic Rating" value={player.stats.performanceRating} change="Elite Tier" isPositive={true} icon={<Star className="w-5 h-5" />} color="purple" />
      </div>

      {/* Upcoming Matches */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Upcoming Matches & Fixtures</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_MATCHES.slice(0, 2).map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const OfficialDashboard: React.FC = () => {
  const navigate = useNavigate();
  const official = MOCK_OFFICIALS[0]; // Rahul Kumar

  return (
    <div className="space-y-8">
      {/* Official Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={official.avatarUrl} alt={official.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-xl" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white font-display">{official.name}</h1>
              <Badge variant="success" dot size="sm">Available on Court</Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{official.certificationName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="glow"
            size="sm"
            onClick={() => navigate('/official/matches/m-live-1/control')}
            leftIcon={<Play className="w-4 h-4 fill-slate-950" />}
          >
            Launch Live Scoring Pad
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/official/availability')}>
            Update Availability
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Assigned Matches" value="14 Matches" change="Today: 2 Live" isPositive={true} icon={<Play className="w-5 h-5" />} color="emerald" />
        <StatCard title="Referee Rating" value={official.rating} change="142 Match Reviews" isPositive={true} icon={<Star className="w-5 h-5" />} color="amber" />
        <StatCard title="Workload Capacity" value={`${official.workloadScore}%`} change="Optimal Stamina" isPositive={true} icon={<Activity className="w-5 h-5" />} color="blue" />
        <StatCard title="Certification Tier" value={official.certificationLevel} change="Accredited" isPositive={true} icon={<Shield className="w-5 h-5" />} color="purple" />
      </div>

      {/* Assigned Matches List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Assigned Matches for Officiating</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_MATCHES.map((m) => (
            <MatchCard key={m.id} match={m} showControlLink={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const OfficialAvailabilityPage: React.FC = () => {
  const [availability, setAvailability] = useState<{ [date: string]: 'AVAILABLE' | 'PARTIALLY_AVAILABLE' | 'UNAVAILABLE' }>({
    '2026-10-06': 'AVAILABLE',
    '2026-10-07': 'AVAILABLE',
    '2026-10-08': 'PARTIALLY_AVAILABLE',
    '2026-10-09': 'AVAILABLE',
    '2026-10-10': 'UNAVAILABLE',
  });
  const { showToast } = useNotification();

  const handleToggle = (date: string) => {
    const current = availability[date] || 'AVAILABLE';
    const next = current === 'AVAILABLE' ? 'PARTIALLY_AVAILABLE' : current === 'PARTIALLY_AVAILABLE' ? 'UNAVAILABLE' : 'AVAILABLE';
    setAvailability(prev => ({ ...prev, [date]: next }));
    showToast('info', 'Availability Changed', `Date ${date} marked as ${next}.`);
  };

  const dates = [
    { date: '2026-10-06', day: 'Monday' },
    { date: '2026-10-07', day: 'Tuesday' },
    { date: '2026-10-08', day: 'Wednesday' },
    { date: '2026-10-09', day: 'Thursday' },
    { date: '2026-10-10', day: 'Friday' },
    { date: '2026-10-11', day: 'Saturday' },
    { date: '2026-10-12', day: 'Sunday' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white font-display">Referee Availability Calendar</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Mark your court availability so the Spotix AI Matcher schedules you without conflicts.
        </p>
      </div>

      <Card className="p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
          <span className="font-bold text-slate-300">Click any day to toggle availability status</span>
          <div className="flex gap-2">
            <Badge variant="success" size="sm">Available</Badge>
            <Badge variant="warning" size="sm">Partially</Badge>
            <Badge variant="danger" size="sm">Unavailable</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {dates.map((d) => {
            const status = availability[d.date] || 'AVAILABLE';

            return (
              <div
                key={d.date}
                onClick={() => handleToggle(d.date)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  status === 'AVAILABLE'
                    ? 'border-emerald-500/40 bg-emerald-950/20'
                    : status === 'PARTIALLY_AVAILABLE'
                    ? 'border-amber-500/40 bg-amber-950/20'
                    : 'border-rose-500/40 bg-rose-950/20 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-100">{d.day}</span>
                  <Badge
                    variant={status === 'AVAILABLE' ? 'success' : status === 'PARTIALLY_AVAILABLE' ? 'warning' : 'danger'}
                    size="sm"
                  >
                    {status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-1">{d.date}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
