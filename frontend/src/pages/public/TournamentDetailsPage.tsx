import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  Award,
  Shield,
  Clock,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Play
} from 'lucide-react';
import { MOCK_TOURNAMENTS, MOCK_TEAMS, MOCK_STANDINGS, MOCK_MATCHES } from '../../api/mockData';
import { Tabs } from '../../components/ui/Tabs';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { KnockoutBracket, LeagueTable } from '../../components/sports/TournamentViews';
import { MatchCard } from '../../components/sports/MatchCard';
import { TeamCard } from '../../components/sports/TeamAndOfficialCards';
import { useNotification } from '../../context/NotificationContext';

export const TournamentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('fixtures');
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const { showToast } = useNotification();

  const tournament = MOCK_TOURNAMENTS.find(t => t.id === id) || MOCK_TOURNAMENTS[0];
  const matches = MOCK_MATCHES;
  const teams = MOCK_TEAMS.slice(0, 4);

  const tabs = [
    { id: 'fixtures', label: 'Fixtures & Bracket' },
    { id: 'standings', label: 'Standings' },
    { id: 'teams', label: `Teams (${teams.length})` },
    { id: 'overview', label: 'Overview & Venue' },
    { id: 'rules', label: 'Official Rules' },
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Registration Submitted!', `Application for ${teamName} has been recorded.`);
    setRegistrationModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <Link to="/tournaments" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Tournaments
      </Link>

      {/* Tournament Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="h-64 sm:h-80 w-full relative">
          <img src={tournament.bannerUrl} alt={tournament.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
        </div>

        <div className="p-6 sm:p-8 -mt-24 relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={tournament.status === 'LIVE' ? 'live' : 'success'} dot>
                  {tournament.status.replace('_', ' ')}
                </Badge>
                <Badge variant="primary">{tournament.sport}</Badge>
                <span className="text-xs text-slate-400 font-mono bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-700">
                  {tournament.format} FORMAT
                </span>
                {tournament.sponsorName && (
                  <span className="text-xs text-amber-300 font-medium bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-500/30">
                    Sponsored by {tournament.sponsorName}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight">
                {tournament.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-400" /> {tournament.startDate} to {tournament.endDate}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-rose-400" /> {tournament.venue} ({tournament.location})</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-400" /> {tournament.registeredTeamsCount}/{tournament.maxTeams} Teams</span>
              </div>
            </div>

            {/* Registration CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-400">Prize Pool</p>
                <p className="text-xl font-black text-emerald-400 font-display">{tournament.prizePool}</p>
              </div>

              {tournament.status === 'REGISTRATION_OPEN' ? (
                <Button
                  size="lg"
                  variant="glow"
                  onClick={() => setRegistrationModalOpen(true)}
                  className="w-full sm:w-auto"
                >
                  Register Your Team (${tournament.entryFee})
                </Button>
              ) : tournament.status === 'LIVE' ? (
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/matches/m-live-1/live')}
                  leftIcon={<Play className="w-4 h-4 fill-white" />}
                >
                  Live Match Center
                </Button>
              ) : (
                <Button size="lg" variant="secondary" disabled>
                  Registration Closed
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Contents */}
      {activeTab === 'fixtures' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Knockout Elimination Bracket
            </h3>
            <span className="text-xs text-slate-400 font-mono">94% AI Balanced Schedule</span>
          </div>
          <KnockoutBracket />

          <div className="pt-8">
            <h3 className="text-lg font-bold text-slate-100 mb-4">Matches & Play-by-Play</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matches.map(m => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'standings' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-100">Tournament Standings & Form</h3>
          <LeagueTable standings={MOCK_STANDINGS} />
        </div>
      )}

      {activeTab === 'teams' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-100">Participating Clubs & Rosters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teams.map(tm => (
              <TeamCard key={tm.id} team={tm} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-100">Tournament Overview</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{tournament.description}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <p className="text-slate-500 font-semibold uppercase text-[10px]">Entry Fee</p>
                  <p className="text-slate-100 font-bold mt-0.5">${tournament.entryFee}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-semibold uppercase text-[10px]">Max Teams</p>
                  <p className="text-slate-100 font-bold mt-0.5">{tournament.maxTeams} Clubs</p>
                </div>
                <div>
                  <p className="text-slate-500 font-semibold uppercase text-[10px]">Registration Deadline</p>
                  <p className="text-slate-100 font-bold mt-0.5">{tournament.registrationDeadline}</p>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-100">Organizer Details</h3>
              <div className="flex items-center gap-3">
                <img src={tournament.organizerAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'} alt={tournament.organizerName} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                <div>
                  <h4 className="font-bold text-sm text-slate-100">{tournament.organizerName}</h4>
                  <p className="text-xs text-emerald-400 font-semibold">Verified Athletic Organizer</p>
                </div>
              </div>
              <p className="text-xs text-slate-400">Sanctioned under Spotix National Sports Governance Protocol.</p>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <Card className="p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-slate-100">Tournament Rules & Code of Conduct</h3>
          <ul className="space-y-3 text-xs text-slate-300">
            {tournament.rules.map((r, i) => (
              <li key={i} className="flex items-start gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Registration Modal */}
      {registrationModalOpen && (
        <Modal
          isOpen={registrationModalOpen}
          onClose={() => setRegistrationModalOpen(false)}
          title={`Register for ${tournament.name}`}
          description={`Entry Fee: $${tournament.entryFee} · Prize Pool: ${tournament.prizePool}`}
        >
          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Club / Team Name</label>
              <input
                type="text"
                required
                placeholder="Cyber Knights SC"
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Manager Contact Email</label>
              <input
                type="email"
                required
                placeholder="manager@myclub.com"
                value={managerEmail}
                onChange={e => setManagerEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100"
              />
            </div>
            <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setRegistrationModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Confirm Registration
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
