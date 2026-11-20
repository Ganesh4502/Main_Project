import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Trophy,
  Activity,
  Calendar,
  MapPin,
  Sparkles,
  Shield,
  Upload,
  CheckCircle2
} from 'lucide-react';
import { tournamentApi } from '../../api/tournamentApi';
import { MOCK_SPORTS, MOCK_ARENAS } from '../../api/mockData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useNotification } from '../../context/NotificationContext';
import { TournamentFormat } from '../../types';

export const OrganizerCreateTournamentPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    sport: 'Basketball',
    description: '',
    bannerUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&auto=format&fit=crop&q=80',
    format: 'KNOCKOUT' as TournamentFormat,
    maxTeams: 16,
    entryFee: 300,
    prizePool: '$20,000 + Trophy',
    rules: [
      'Official federation match rules apply.',
      'Rosters are locked 24 hours prior to first fixture.',
      'Mandatory check-in 30 mins before scheduled game.',
    ],
    startDate: '2026-11-01',
    endDate: '2026-11-10',
    registrationStartDate: '2026-10-01',
    registrationDeadline: '2026-10-28',
    arenaId: 'arena-1',
    selectedArenaName: 'Apex Grand Sports Complex',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useNotification();

  const handleNext = () => {
    if (currentStep === 1 && !formData.name) {
      showToast('warning', 'Please enter tournament name');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const created = await tournamentApi.create({
        name: formData.name,
        sport: formData.sport,
        description: formData.description,
        bannerUrl: formData.bannerUrl,
        format: formData.format,
        maxTeams: Number(formData.maxTeams),
        entryFee: Number(formData.entryFee),
        prizePool: formData.prizePool,
        rules: formData.rules,
        startDate: formData.startDate,
        endDate: formData.endDate,
        registrationStartDate: formData.registrationStartDate,
        registrationDeadline: formData.registrationDeadline,
        venue: formData.selectedArenaName,
        arenaId: formData.arenaId,
        location: 'San Francisco, CA',
        status: 'REGISTRATION_OPEN',
      });

      showToast('success', 'Tournament Created Successfully!', `${created.name} is now open for registrations.`);
      navigate(`/organizer/tournaments/${created.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    { num: 1, label: 'Basic Info' },
    { num: 2, label: 'Configuration' },
    { num: 3, label: 'Schedule' },
    { num: 4, label: 'Arena & Venue' },
    { num: 5, label: 'Review & Launch' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-display">Create New Tournament</h1>
        <p className="text-xs text-slate-400 mt-1">
          Follow our 5-step tournament wizard to configure brackets, rules, dates, and venue linkages.
        </p>
      </div>

      {/* Step Stepper Header */}
      <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
        {stepsList.map((st, i) => {
          const isDone = st.num < currentStep;
          const isCurrent = st.num === currentStep;

          return (
            <React.Fragment key={st.num}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                    isDone
                      ? 'bg-emerald-500 text-slate-950'
                      : isCurrent
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white ring-2 ring-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : st.num}
                </div>
                <span className={`text-xs hidden sm:inline font-semibold ${isCurrent ? 'text-white' : 'text-slate-400'}`}>
                  {st.label}
                </span>
              </div>
              {i < stepsList.length - 1 && <div className="flex-1 h-0.5 mx-2 bg-slate-800" />}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <Card className="p-6 sm:p-8 border border-slate-800 space-y-5 animate-in fade-in">
          <h2 className="text-lg font-bold text-white">Step 1: Basic Information</h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Tournament Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Spotix Fall Basketball Classic 2026"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Sport Discipline</label>
                <select
                  value={formData.sport}
                  onChange={e => setFormData({ ...formData, sport: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  {MOCK_SPORTS.map(s => (
                    <option key={s.id} value={s.name}>{s.name} ({s.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Banner Image URL</label>
                <input
                  type="url"
                  value={formData.bannerUrl}
                  onChange={e => setFormData({ ...formData, bannerUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Tournament Description</label>
              <textarea
                rows={4}
                placeholder="Details about participating divisions, brackets, and team qualifications..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Step 2: Configuration */}
      {currentStep === 2 && (
        <Card className="p-6 sm:p-8 border border-slate-800 space-y-5 animate-in fade-in">
          <h2 className="text-lg font-bold text-white">Step 2: Tournament Configuration & Format</h2>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Tournament Format</label>
                <select
                  value={formData.format}
                  onChange={e => setFormData({ ...formData, format: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="KNOCKOUT">Single Elimination Knockout</option>
                  <option value="LEAGUE">Round Robin League</option>
                  <option value="GROUP_STAGE">Group Stage + Playoffs</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Maximum Teams</label>
                <input
                  type="number"
                  min={4}
                  max={64}
                  value={formData.maxTeams}
                  onChange={e => setFormData({ ...formData, maxTeams: parseInt(e.target.value, 10) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Entry Fee ($)</label>
                <input
                  type="number"
                  value={formData.entryFee}
                  onChange={e => setFormData({ ...formData, entryFee: parseInt(e.target.value, 10) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Prize Pool Description</label>
              <input
                type="text"
                value={formData.prizePool}
                onChange={e => setFormData({ ...formData, prizePool: e.target.value })}
                placeholder="e.g. $25,000 + Gold Trophy"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Step 3: Schedule */}
      {currentStep === 3 && (
        <Card className="p-6 sm:p-8 border border-slate-800 space-y-5 animate-in fade-in">
          <h2 className="text-lg font-bold text-white">Step 3: Schedule & Deadlines</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Tournament Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Tournament End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Registration Open Date</label>
              <input
                type="date"
                value={formData.registrationStartDate}
                onChange={e => setFormData({ ...formData, registrationStartDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Registration Deadline</label>
              <input
                type="date"
                value={formData.registrationDeadline}
                onChange={e => setFormData({ ...formData, registrationDeadline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Step 4: Arena Selection */}
      {currentStep === 4 && (
        <Card className="p-6 sm:p-8 border border-slate-800 space-y-5 animate-in fade-in">
          <h2 className="text-lg font-bold text-white">Step 4: Linked Arena & Venues</h2>
          <p className="text-xs text-slate-400">Select the home complex where matches and finals will be hosted.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_ARENAS.map((arena) => {
              const isSelected = formData.arenaId === arena.id;

              return (
                <div
                  key={arena.id}
                  onClick={() => setFormData({ ...formData, arenaId: arena.id, selectedArenaName: arena.name })}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500/40 shadow-lg'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-100 text-sm">{arena.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{arena.city} · ${arena.hourlyRate}/hr</p>
                  <p className="text-[11px] text-slate-500 mt-2">{arena.courtsCount} Courts Available</p>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Step 5: Review & Preview */}
      {currentStep === 5 && (
        <Card className="p-6 sm:p-8 border border-slate-800 space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white">Step 5: Review Tournament Setup</h2>
              <p className="text-xs text-slate-400">Verify all constraints before opening for team registrations</p>
            </div>
            <Badge variant="success" dot>Ready to Publish</Badge>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-100">{formData.name || 'Spotix Championship'}</h3>
                <p className="text-xs text-slate-400">{formData.sport} · {formData.format} Format</p>
              </div>
              <span className="text-emerald-400 font-black text-base">{formData.prizePool}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Max Teams</p>
                <p className="text-base font-bold text-slate-100 mt-0.5">{formData.maxTeams} Clubs</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Entry Fee</p>
                <p className="text-base font-bold text-slate-100 mt-0.5">${formData.entryFee}</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Start Date</p>
                <p className="text-base font-bold text-slate-100 mt-0.5">{formData.startDate}</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Venue</p>
                <p className="text-base font-bold text-emerald-400 mt-0.5 truncate">{formData.selectedArenaName}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          size="md"
          onClick={handleBack}
          disabled={currentStep === 1}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
        >
          Previous Step
        </Button>

        {currentStep < 5 ? (
          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            rightIcon={<ChevronRight className="w-4 h-4" />}
          >
            Continue to Step {currentStep + 1}
          </Button>
        ) : (
          <Button
            variant="glow"
            size="lg"
            onClick={handleFinalSubmit}
            isLoading={isSubmitting}
            rightIcon={<Sparkles className="w-4 h-4" />}
          >
            Publish Tournament Now
          </Button>
        )}
      </div>
    </div>
  );
};
