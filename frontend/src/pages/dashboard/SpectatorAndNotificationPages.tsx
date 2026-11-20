import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trophy,
  Play,
  Heart,
  Activity,
  MapPin,
  Users,
  Search,
  CheckCircle2,
  Trash2,
  Bell,
  Clock,
  ArrowRight
} from 'lucide-react';
import { MOCK_MATCHES, MOCK_TOURNAMENTS, MOCK_TEAMS, MOCK_STANDINGS } from '../../api/mockData';
import { MatchCard } from '../../components/sports/MatchCard';
import { TournamentCard } from '../../components/sports/TournamentCard';
import { LeagueTable } from '../../components/sports/TournamentViews';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useNotification } from '../../context/NotificationContext';

export const SpectatorPortalPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white font-display">Spectator & Fan Zone</h1>
            <Badge variant="live" dot>Live Match Feed</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Track live scores, follow your favorite clubs, and inspect tournament standings in real-time.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="glow"
            size="sm"
            onClick={() => navigate('/matches/m-live-1/live')}
            leftIcon={<Play className="w-4 h-4 fill-slate-950" />}
          >
            Enter Live Arena
          </Button>
        </div>
      </div>

      {/* Featured Live Match Spotlight */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" /> Live Games Happening Now
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_MATCHES.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </div>

      {/* Tournament Standings */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Championship League Table</h2>
        <LeagueTable standings={MOCK_STANDINGS} />
      </div>

      {/* Discover More Tournaments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Trending Tournaments</h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/tournaments')}>
            Browse All Tournaments
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TOURNAMENTS.slice(0, 3).map((t) => (
            <TournamentCard key={t.id} tournament={t} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const NotificationsPage: React.FC = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotification } = useNotification();
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const navigate = useNavigate();

  const categories = ['ALL', 'TOURNAMENT', 'MATCH', 'BOOKING', 'OFFICIAL', 'SYSTEM'];

  const filteredNotifications = notifications.filter(n =>
    categoryFilter === 'ALL' || n.category === categoryFilter
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-display">Notification Center</h1>
          <p className="text-xs text-slate-400 mt-0.5">Real-time alerts regarding fixtures, referee assignments, and bookings.</p>
        </div>

        <Button variant="outline" size="sm" onClick={markAllAsRead}>
          Mark All as Read
        </Button>
      </div>

      {/* Categories Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              categoryFilter === cat
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <Card className="divide-y divide-slate-800/60 border border-slate-800 overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            No notifications in this category.
          </div>
        ) : (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markAsRead(n.id);
                if (n.link) navigate(n.link);
              }}
              className={`p-4 flex items-start justify-between gap-4 text-xs transition-colors cursor-pointer ${
                !n.isRead ? 'bg-slate-900/60 text-slate-100 hover:bg-slate-900' : 'text-slate-400 hover:bg-slate-900/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 shrink-0 mt-0.5">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100">{n.title}</span>
                    <Badge variant="primary" size="sm">{n.category}</Badge>
                    {!n.isRead && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                  </div>
                  <p className="text-slate-300 mt-1 leading-relaxed text-[11px]">{n.message}</p>
                  <span className="text-[10px] text-slate-500 mt-1 block">{n.createdAt}</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearNotification(n.id);
                }}
                className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                title="Dismiss"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </Card>
    </div>
  );
};
