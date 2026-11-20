import React, { useState } from 'react';
import { Search, Trophy, Filter, Calendar, MapPin, Award, ArrowRight } from 'lucide-react';
import { MOCK_TOURNAMENTS } from '../../api/mockData';
import { TournamentCard } from '../../components/sports/TournamentCard';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { useNotification } from '../../context/NotificationContext';
import { Tournament } from '../../types';

export const TournamentsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedSport, setSelectedSport] = useState('ALL');
  const [selectedFormat, setSelectedFormat] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [registeringTournament, setRegisteringTournament] = useState<Tournament | null>(null);
  const [teamName, setTeamName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const { showToast } = useNotification();

  const sports = ['ALL', 'Basketball', 'Football / Soccer', 'Badminton', 'Cricket'];
  const formats = ['ALL', 'KNOCKOUT', 'LEAGUE', 'GROUP_STAGE'];
  const statuses = ['ALL', 'LIVE', 'REGISTRATION_OPEN', 'PUBLISHED', 'COMPLETED'];

  const filteredTournaments = MOCK_TOURNAMENTS.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.location.toLowerCase().includes(search.toLowerCase());
    const matchSport = selectedSport === 'ALL' || t.sport.toLowerCase().includes(selectedSport.toLowerCase());
    const matchFormat = selectedFormat === 'ALL' || t.format === selectedFormat;
    const matchStatus = selectedStatus === 'ALL' || t.status === selectedStatus;
    return matchSearch && matchSport && matchFormat && matchStatus;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName || !managerEmail) {
      showToast('warning', 'Please provide team name and manager email');
      return;
    }
    showToast('success', 'Registration Submitted!', `Application for ${teamName} sent to ${registeringTournament?.organizerName}.`);
    setRegisteringTournament(null);
    setTeamName('');
    setManagerEmail('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="primary">Tournament Discovery</Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Active Sports Tournaments & Championships
        </h1>
        <p className="text-sm text-slate-400">
          Compete in high-stakes leagues, knockout cups, and open brackets powered by Spotix AI scheduling and real-time live scoring.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tournament name, venue..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <select
          value={selectedSport}
          onChange={e => setSelectedSport(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          {sports.map(s => (
            <option key={s} value={s}>{s === 'ALL' ? 'All Sports' : s}</option>
          ))}
        </select>

        <select
          value={selectedFormat}
          onChange={e => setSelectedFormat(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          {formats.map(f => (
            <option key={f} value={f}>{f === 'ALL' ? 'All Formats' : f.replace('_', ' ')}</option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          {statuses.map(st => (
            <option key={st} value={st}>{st === 'ALL' ? 'All Statuses' : st.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      {/* Grid of Tournaments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTournaments.map((tour) => (
          <TournamentCard
            key={tour.id}
            tournament={tour}
            onRegister={(t) => setRegisteringTournament(t)}
          />
        ))}
      </div>

      {/* Team Registration Modal */}
      {registeringTournament && (
        <Modal
          isOpen={!!registeringTournament}
          onClose={() => setRegisteringTournament(null)}
          title={`Register Your Club for ${registeringTournament.name}`}
          description={`Entry Fee: $${registeringTournament.entryFee} · Prize Pool: ${registeringTournament.prizePool}`}
          maxWidth="lg"
        >
          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Club / Team Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Golden Gate Warriors SC"
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Team Manager Email</label>
              <input
                type="email"
                required
                placeholder="manager@myclub.com"
                value={managerEmail}
                onChange={e => setManagerEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-400 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span>Roster Capacity:</span>
                <span className="text-slate-200 font-medium">Up to 12 athletes</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Processing:</span>
                <span className="text-emerald-400 font-medium">Spotix Escrow Protection</span>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setRegisteringTournament(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Submit Registration
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
