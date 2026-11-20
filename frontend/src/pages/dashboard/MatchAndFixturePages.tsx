import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Layers,
  Sparkles,
  Trophy,
  Play,
  Search,
  Filter,
  ArrowLeft,
  Clock,
  MapPin,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { MOCK_MATCHES, MOCK_TOURNAMENTS } from '../../api/mockData';
import { KnockoutBracket, LeagueTable } from '../../components/sports/TournamentViews';
import { MatchCard } from '../../components/sports/MatchCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { MatchStatus, Match } from '../../types';

export const FixtureManagementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [viewFormat, setViewFormat] = useState<'bracket' | 'calendar' | 'list'>('bracket');
  const navigate = useNavigate();

  const tournament = MOCK_TOURNAMENTS.find(t => t.id === id) || MOCK_TOURNAMENTS[0];

  return (
    <div className="space-y-6">
      <Link to={`/organizer/tournaments/${tournament.id}`} className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Tournament Workspace
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white font-display">Fixture & Schedule Management</h1>
            <Badge variant="primary">{tournament.name}</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Manage match schedules, arenas, referee assignments, and visual knockout brackets.</p>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setViewFormat('bracket')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
              viewFormat === 'bracket' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Knockout Bracket
          </button>
          <button
            onClick={() => setViewFormat('list')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
              viewFormat === 'list' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Match List
          </button>
        </div>
      </div>

      {viewFormat === 'bracket' && (
        <Card className="p-6 border border-slate-800">
          <KnockoutBracket />
        </Card>
      )}

      {viewFormat === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_MATCHES.map((m) => (
            <MatchCard key={m.id} match={m} showControlLink={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export const MatchManagementPage: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>(MOCK_MATCHES);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const navigate = useNavigate();

  const filteredMatches = matches.filter(m => {
    const matchSearch = m.teamA.name.toLowerCase().includes(search.toLowerCase()) || m.teamB.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-display">Match Operations & Center</h1>
          <p className="text-xs text-slate-400 mt-0.5">Monitor real-time court matches, referee control pads, and final score approvals.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search teams in match..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 w-full sm:w-auto"
        >
          <option value="ALL">All Match Statuses</option>
          <option value="LIVE">Live Matches Only</option>
          <option value="READY">Ready for Tip-off</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="COMPLETED">Completed Finals</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMatches.map(m => (
          <MatchCard key={m.id} match={m} showControlLink={true} />
        ))}
      </div>
    </div>
  );
};
