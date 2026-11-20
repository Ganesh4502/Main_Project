import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Trophy, Calendar, Users, Edit, Trash2, CheckCircle2, Play, Sparkles } from 'lucide-react';
import { tournamentApi } from '../../api/tournamentApi';
import { Tournament } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ConfirmationDialog } from '../../components/ui/Modal';
import { useNotification } from '../../context/NotificationContext';

export const OrganizerTournamentsPage: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [cancelModal, setCancelModal] = useState<{ isOpen: boolean; tour: Tournament | null }>({ isOpen: false, tour: null });
  const navigate = useNavigate();
  const { showToast } = useNotification();

  const fetchTournaments = () => {
    setIsLoading(true);
    tournamentApi.getAll().then(data => {
      setTournaments(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleCancelTournament = async () => {
    if (!cancelModal.tour) return;
    await tournamentApi.updateStatus(cancelModal.tour.id, 'CANCELLED');
    showToast('warning', 'Tournament Cancelled', `${cancelModal.tour.name} has been cancelled.`);
    setCancelModal({ isOpen: false, tour: null });
    fetchTournaments();
  };

  const filteredTournaments = tournaments.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.sport.toLowerCase().includes(search.toLowerCase());
    const matchStatus = activeFilter === 'ALL' || t.status === activeFilter;
    return matchSearch && matchStatus;
  });

  const filterTabs = [
    { id: 'ALL', label: 'All Tournaments' },
    { id: 'LIVE', label: 'Live' },
    { id: 'REGISTRATION_OPEN', label: 'Registration Open' },
    { id: 'PUBLISHED', label: 'Published' },
    { id: 'COMPLETED', label: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-display">Tournament Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Create, schedule, publish, and oversee your championship brackets and matches.
          </p>
        </div>

        <Button
          variant="glow"
          size="md"
          onClick={() => navigate('/organizer/tournaments/create')}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Create Tournament
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tournament name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Tournaments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTournaments.map((tour) => (
          <Card key={tour.id} className="p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="relative h-44 rounded-xl overflow-hidden mb-4">
                <img src={tour.bannerUrl} alt={tour.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant={tour.status === 'LIVE' ? 'live' : 'success'} size="sm" dot>
                    {tour.status.replace('_', ' ')}
                  </Badge>
                </div>
                <span className="absolute bottom-3 left-3 text-white font-bold text-base font-display line-clamp-1">
                  {tour.name}
                </span>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">{tour.description}</p>

              <div className="space-y-1.5 py-3 border-y border-slate-800 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Sport & Format:</span>
                  <span className="font-semibold text-slate-100">{tour.sport} ({tour.format})</span>
                </div>
                <div className="flex justify-between">
                  <span>Venue:</span>
                  <span className="font-semibold text-slate-100 truncate max-w-[160px]">{tour.venue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Teams Registered:</span>
                  <span className="font-semibold text-emerald-400">{tour.registeredTeamsCount}/{tour.maxTeams} Clubs</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Schedule Score:</span>
                  <span className="font-bold text-emerald-400 font-mono">{tour.scheduleQualityScore}%</span>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => navigate(`/organizer/tournaments/${tour.id}`)}
                >
                  Manage Workspace
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-emerald-500/30 text-emerald-400"
                  onClick={() => navigate(`/organizer/tournaments/${tour.id}/ai-fixture`)}
                  title="Run AI Scheduler"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </Button>
              </div>

              <div className="flex justify-end gap-2 text-xs">
                <button
                  onClick={() => setCancelModal({ isOpen: true, tour })}
                  className="text-rose-400 hover:text-rose-300 font-medium text-[11px]"
                >
                  Cancel Tournament
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={cancelModal.isOpen}
        onClose={() => setCancelModal({ isOpen: false, tour: null })}
        onConfirm={handleCancelTournament}
        title="Cancel Tournament?"
        message={`Are you sure you want to cancel ${cancelModal.tour?.name}? All registered clubs and booked venue slots will be notified immediately.`}
        confirmText="Confirm Cancellation"
        variant="danger"
      />
    </div>
  );
};
