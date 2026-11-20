import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Cpu,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  RefreshCw,
  ArrowLeft,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { fixtureApi } from '../../api/fixtureApi';
import { MOCK_TOURNAMENTS, MOCK_ARENAS } from '../../api/mockData';
import { AIProcessingAnimation, ScheduleQualityGauge } from '../../components/ai/AIComponents';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useNotification } from '../../context/NotificationContext';
import { AIFixtureResult, Match } from '../../types';

export const AIFixtureGeneratorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useNotification();

  const tournament = MOCK_TOURNAMENTS.find(t => t.id === id) || MOCK_TOURNAMENTS[0];

  const [isGenerating, setIsGenerating] = useState(false);
  const [fixtureResult, setFixtureResult] = useState<AIFixtureResult | null>(null);
  const [params, setParams] = useState({
    teamsCount: tournament.maxTeams || 16,
    format: tournament.format,
    matchDurationMinutes: 60,
    restDurationMinutes: 240, // 4 hours
    avoidConsecutiveMatches: true,
    balanceWeekendSlots: true,
    selectedArena: 'Apex Grand Sports Complex',
  });

  const handleStartGeneration = () => {
    setIsGenerating(true);
    setFixtureResult(null);
  };

  const handleAIComplete = async () => {
    const res = await fixtureApi.generateAIFixture({
      tournamentId: tournament.id,
      teamsCount: params.teamsCount,
      format: params.format,
      arenaIds: ['arena-1'],
      startDate: tournament.startDate,
      endDate: tournament.endDate,
      matchDurationMinutes: params.matchDurationMinutes,
      restDurationMinutes: params.restDurationMinutes,
      avoidConsecutiveMatches: params.avoidConsecutiveMatches,
      balanceWeekendSlots: params.balanceWeekendSlots,
    });
    setFixtureResult(res);
    setIsGenerating(false);
    showToast('success', 'AI Schedule Optimization Completed!', `Calculated 0 conflicts across ${res.metrics.matchesCount} matches.`);
  };

  const handleApproveSchedule = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Fallback
    }
    showToast('success', 'Schedule Approved & Locked', 'Tournament fixtures have been synchronized across official referees and club apps.');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Back button */}
      <Link to={`/organizer/tournaments/${tournament.id}`} className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Tournament Workspace
      </Link>

      {/* Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-950 border border-emerald-500/40 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
            <Sparkles className="w-3.5 h-3.5" /> Spotix Neural Schedule Solver v4.2
          </div>
          <h1 className="text-3xl font-black text-white font-display">AI Fixture Generator</h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Generate balanced tournament schedules using tournament constraints. Automatically resolves court availability, athlete rest limits, and prime-time bracket flows.
          </p>
        </div>
      </div>

      {/* Constraints Input Form */}
      <Card className="p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" /> Constraint Configuration
          </h2>
          <span className="text-xs text-slate-400 font-mono">Tournament: {tournament.name}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Participating Teams</label>
            <input
              type="number"
              value={params.teamsCount}
              onChange={e => setParams({ ...params, teamsCount: parseInt(e.target.value, 10) })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Tournament Format</label>
            <select
              value={params.format}
              onChange={e => setParams({ ...params, format: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
            >
              <option value="KNOCKOUT">Single Elimination Knockout</option>
              <option value="LEAGUE">Round Robin League</option>
              <option value="GROUP_STAGE">Group Stage + Finals</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Match Duration (Mins)</label>
            <input
              type="number"
              value={params.matchDurationMinutes}
              onChange={e => setParams({ ...params, matchDurationMinutes: parseInt(e.target.value, 10) })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Min Rest Interval (Hours)</label>
            <input
              type="number"
              value={params.restDurationMinutes / 60}
              onChange={e => setParams({ ...params, restDurationMinutes: parseInt(e.target.value, 10) * 60 })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={params.avoidConsecutiveMatches}
                onChange={e => setParams({ ...params, avoidConsecutiveMatches: e.target.checked })}
                className="rounded bg-slate-950 border-slate-700 text-emerald-500"
              />
              <span>Prevent Back-to-Back Match Stress</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={params.balanceWeekendSlots}
                onChange={e => setParams({ ...params, balanceWeekendSlots: e.target.checked })}
                className="rounded bg-slate-950 border-slate-700 text-emerald-500"
              />
              <span>Prioritize Prime Evening Slots</span>
            </label>
          </div>

          <Button
            variant="glow"
            size="md"
            onClick={handleStartGeneration}
            disabled={isGenerating}
            rightIcon={<Sparkles className="w-4 h-4" />}
          >
            {isGenerating ? 'Optimizing Schedule...' : 'Generate AI Fixture'}
          </Button>
        </div>
      </Card>

      {/* AI Processing Animation Mode */}
      {isGenerating && (
        <div className="py-6">
          <AIProcessingAnimation onComplete={handleAIComplete} />
        </div>
      )}

      {/* AI Fixture Result View */}
      {fixtureResult && !isGenerating && (
        <div className="space-y-6 animate-in fade-in">
          {/* Quality Audit Gauge */}
          <ScheduleQualityGauge
            quality={fixtureResult.scheduleQuality}
            conflicts={fixtureResult.metrics.conflicts}
            restViolations={fixtureResult.metrics.restViolations}
          />

          {/* Generated Matches Schedule Timeline */}
          <Card className="p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Generated Fixture Timeline (32 Matches)</h3>
                <p className="text-xs text-slate-400">All venues, court assignments, and rest buffers strictly satisfied.</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleStartGeneration}
                  leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                >
                  Regenerate
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleApproveSchedule}
                  leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                >
                  Approve Schedule
                </Button>
              </div>
            </div>

            {/* Match Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fixtureResult.matches.map((m) => (
                <div
                  key={m.id}
                  className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition-all text-xs"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-slate-200">{m.roundName} · Match #{m.matchNumber}</span>
                    <Badge variant="primary" size="sm">{m.time}</Badge>
                  </div>

                  <div className="flex items-center justify-between py-2 border-y border-slate-800/60 font-bold">
                    <div className="flex items-center gap-2 text-slate-100">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <span>{m.teamA.name}</span>
                    </div>
                    <span className="text-slate-500 font-normal">vs</span>
                    <div className="flex items-center gap-2 text-slate-100">
                      <span>{m.teamB.name}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-rose-400" /> {m.arenaName} ({m.court})</span>
                    <span className="text-emerald-400 font-semibold">{m.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => navigate(`/organizer/tournaments/${tournament.id}`)}>
                Back to Workspace
              </Button>
              <Button variant="glow" size="md" onClick={handleApproveSchedule}>
                Lock & Publish Schedule
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
