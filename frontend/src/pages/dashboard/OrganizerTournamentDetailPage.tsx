import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Trophy,
  Users,
  Calendar,
  Sparkles,
  UserCheck,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  Shield,
  Settings,
  Sliders,
  BarChart3,
  Award
} from 'lucide-react';
import { MOCK_TOURNAMENTS, MOCK_REGISTRATIONS, MOCK_TEAMS, MOCK_MATCHES } from '../../api/mockData';
import { Tabs } from '../../components/ui/Tabs';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { KnockoutBracket } from '../../components/sports/TournamentViews';
import { MatchCard } from '../../components/sports/MatchCard';
import { TeamCard } from '../../components/sports/TeamAndOfficialCards';
import { ConfirmationDialog } from '../../components/ui/Modal';
import { useNotification } from '../../context/NotificationContext';
import { TeamRegistration } from '../../types';

export const OrganizerTournamentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [registrations, setRegistrations] = useState<TeamRegistration[]>(MOCK_REGISTRATIONS);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    reg: TeamRegistration | null;
    action: 'APPROVE' | 'REJECT';
  }>({ isOpen: false, reg: null, action: 'APPROVE' });

  const navigate = useNavigate();
  const { showToast } = useNotification();

  const tournament = MOCK_TOURNAMENTS.find(t => t.id === id) || MOCK_TOURNAMENTS[0];

  const handleApprove = (reg: TeamRegistration) => {
    setConfirmModal({ isOpen: true, reg, action: 'APPROVE' });
  };

  const handleReject = (reg: TeamRegistration) => {
    setConfirmModal({ isOpen: true, reg, action: 'REJECT' });
  };

  const handleConfirmAction = () => {
    if (!confirmModal.reg) return;
    const targetId = confirmModal.reg.id;
    const newStatus = confirmModal.action === 'APPROVE' ? 'APPROVED' : 'REJECTED';

    setRegistrations(prev => prev.map(r => (r.id === targetId ? { ...r, status: newStatus } : r)));
    showToast(
      confirmModal.action === 'APPROVE' ? 'success' : 'warning',
      `Team Application ${confirmModal.action === 'APPROVE' ? 'Approved' : 'Rejected'}`,
      `${confirmModal.reg.teamName} registration has been updated.`
    );
    setConfirmModal({ isOpen: false, reg: null, action: 'APPROVE' });
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'registrations', label: `Registrations (${registrations.filter(r => r.status === 'PENDING').length} Pending)` },
    { id: 'teams', label: `Teams (${MOCK_TEAMS.length})` },
    { id: 'fixtures', label: 'Fixtures & Brackets' },
    { id: 'matches', label: 'Match Operations' },
    { id: 'ai-tools', label: 'AI Workspace' },
  ];

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link to="/organizer/tournaments" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Tournaments
      </Link>

      {/* Header Banner */}
      <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src={tournament.bannerUrl} alt={tournament.name} className="w-20 h-20 rounded-2xl object-cover border border-slate-800" />
          <div>
            <div className="flex items-center gap-2">
              <Badge variant={tournament.status === 'LIVE' ? 'live' : 'success'} size="sm" dot>
                {tournament.status.replace('_', ' ')}
              </Badge>
              <span className="text-xs text-slate-400 font-mono">{tournament.format}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white font-display mt-1">{tournament.name}</h1>
            <p className="text-xs text-slate-400">{tournament.sport} · {tournament.venue}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="glow"
            size="sm"
            onClick={() => navigate(`/organizer/tournaments/${tournament.id}/ai-fixture`)}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Launch AI Fixture Studio
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/tournaments/${tournament.id}`)}
          >
            Public View
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-100">Tournament Summary</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{tournament.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs">
              <div>
                <p className="text-slate-500 uppercase text-[10px] font-bold">Roster Format</p>
                <p className="text-slate-200 font-bold mt-0.5">{tournament.format}</p>
              </div>
              <div>
                <p className="text-slate-500 uppercase text-[10px] font-bold">Prize Pool</p>
                <p className="text-emerald-400 font-bold mt-0.5">{tournament.prizePool}</p>
              </div>
              <div>
                <p className="text-slate-500 uppercase text-[10px] font-bold">Quality Score</p>
                <p className="text-emerald-400 font-bold mt-0.5 font-mono">{tournament.scheduleQualityScore}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-slate-800 space-y-3 text-xs">
            <h3 className="text-base font-bold text-slate-100">Important Dates</h3>
            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span>Start:</span>
                <span className="font-semibold text-slate-100">{tournament.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span>End:</span>
                <span className="font-semibold text-slate-100">{tournament.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Registration Closes:</span>
                <span className="font-semibold text-amber-400">{tournament.registrationDeadline}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Registrations Management Tab */}
      {activeTab === 'registrations' && (
        <Card className="p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-100">Team Applications & Approvals</h3>
              <p className="text-xs text-slate-400">Review club applications and confirm participation slots</p>
            </div>
          </div>

          <div className="space-y-3">
            {registrations.map((reg) => (
              <div
                key={reg.id}
                className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100 text-sm">{reg.teamName}</span>
                    <Badge
                      variant={reg.status === 'APPROVED' ? 'success' : reg.status === 'REJECTED' ? 'danger' : 'warning'}
                      size="sm"
                    >
                      {reg.status}
                    </Badge>
                  </div>
                  <p className="text-slate-400 mt-0.5 text-[11px]">
                    Manager: {reg.managerName} ({reg.managerContact}) · {reg.playersCount} Athletes · Applied on {reg.appliedDate}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {reg.status === 'PENDING' && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        className="text-xs py-1 h-8"
                        onClick={() => handleApprove(reg)}
                        leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                      >
                        Approve Team
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="text-xs py-1 h-8"
                        onClick={() => handleReject(reg)}
                        leftIcon={<XCircle className="w-3.5 h-3.5" />}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {reg.status === 'APPROVED' && (
                    <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Participation Confirmed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Teams Tab */}
      {activeTab === 'teams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TEAMS.map(tm => (
            <TeamCard key={tm.id} team={tm} />
          ))}
        </div>
      )}

      {/* Fixtures Tab */}
      {activeTab === 'fixtures' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Knockout Visual Bracket</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/organizer/tournaments/${tournament.id}/ai-fixture`)}
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
            >
              Re-optimize with AI
            </Button>
          </div>
          <KnockoutBracket />
        </div>
      )}

      {/* Matches Tab */}
      {activeTab === 'matches' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Match Operations & Referee Assignment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_MATCHES.map(m => (
              <MatchCard key={m.id} match={m} showControlLink={true} />
            ))}
          </div>
        </div>
      )}

      {/* AI Tools Workspace Tab */}
      {activeTab === 'ai-tools' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card
            variant="interactive"
            className="p-6 border border-emerald-500/30 bg-emerald-950/10 space-y-3 cursor-pointer"
            onClick={() => navigate(`/organizer/tournaments/${tournament.id}/ai-fixture`)}
          >
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl w-fit">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100">AI Fixture Generator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auto-generate 0-conflict schedules taking into account court capacities, rest durations, and broadcast slots.
            </p>
            <Button variant="glow" size="sm" className="mt-2">
              Launch Generator
            </Button>
          </Card>

          <Card
            variant="interactive"
            className="p-6 border border-blue-500/30 bg-blue-950/10 space-y-3 cursor-pointer"
            onClick={() => navigate(`/organizer/matches/m-live-1/ai-official`)}
          >
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl w-fit">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100">AI Referee Matcher</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Find the most suitable certified match referees based on sport rating, workload fatigue, and conflict scores.
            </p>
            <Button variant="primary" size="sm" className="mt-2">
              Match Officials
            </Button>
          </Card>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, reg: null, action: 'APPROVE' })}
        onConfirm={handleConfirmAction}
        title={`${confirmModal.action === 'APPROVE' ? 'Approve' : 'Reject'} Team Registration?`}
        message={`Are you sure you want to ${confirmModal.action.toLowerCase()} ${confirmModal.reg?.teamName}'s registration for this tournament?`}
        confirmText={`Confirm ${confirmModal.action === 'APPROVE' ? 'Approval' : 'Rejection'}`}
        variant={confirmModal.action === 'APPROVE' ? 'primary' : 'danger'}
      />
    </div>
  );
};
