import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  RotateCcw,
  Play,
  Pause,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Trophy,
  ArrowLeft,
  Volume2,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { useLiveMatch } from '../../context/LiveMatchContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { ConfirmationDialog } from '../../components/ui/Modal';
import { useNotification } from '../../context/NotificationContext';

export const OfficialScoringControlPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    activeMatch,
    isClockRunning,
    scoreTeamA,
    scoreTeamB,
    recordFoul,
    recordTimeout,
    undoLastAction,
    toggleClock,
    endPeriod,
    completeMatch,
    canUndo,
    historyLength
  } = useLiveMatch();

  const [confirmCompleteOpen, setConfirmCompleteOpen] = useState(false);
  const { showToast } = useNotification();

  const handleUndo = () => {
    const success = undoLastAction();
    if (success) {
      showToast('info', 'Action Undone', 'Last scoring/foul event reverted.');
    }
  };

  const handleFinishMatch = () => {
    completeMatch();
    showToast('success', 'Match Finalized!', `Final score locked: ${activeMatch.teamA.score} - ${activeMatch.teamB.score}`);
    setConfirmCompleteOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Arbiter Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/official/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Official Hub
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleUndo}
            disabled={!canUndo}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            className="border-amber-500/40 text-amber-400 hover:bg-amber-500/10 text-xs"
          >
            Undo Last Action ({historyLength})
          </Button>

          <Link to={`/matches/${activeMatch.id}/live`}>
            <Button variant="secondary" size="sm" className="text-xs">
              Spectator View
            </Button>
          </Link>
        </div>
      </div>

      {/* MATCH TIME & PERIOD CONTROLLER */}
      <div className="p-4 sm:p-6 bg-slate-900 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="live" dot>LIVE OFFICIAL PAD</Badge>
            <span className="font-bold text-slate-200 text-sm">{activeMatch.tournamentName}</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{activeMatch.roundName} · Maple Court A</p>
        </div>

        {/* Big Clock Controller */}
        <div className="flex items-center gap-4 bg-slate-950 px-5 py-2.5 rounded-2xl border border-slate-800">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{activeMatch.currentPeriod}</span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-wider">
              {activeMatch.periodTimeRemaining}
            </span>
          </div>

          <button
            onClick={toggleClock}
            className={`p-3 rounded-xl transition-all cursor-pointer ${
              isClockRunning
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-500 text-slate-950 font-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/20'
            }`}
            title={isClockRunning ? 'Pause Clock' : 'Resume Clock'}
          >
            {isClockRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-slate-950" />}
          </button>
        </div>
      </div>

      {/* FAST TOUCH-OPTIMIZED 2-COLUMN SCORING PAD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TEAM A CONTROL PAD */}
        <Card className="p-6 sm:p-8 border-2 border-blue-500/40 bg-slate-900/90 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <img src={activeMatch.teamA.logoUrl} alt={activeMatch.teamA.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-700 shadow-md" />
              <div>
                <h3 className="text-xl font-black text-white font-display">{activeMatch.teamA.name}</h3>
                <p className="text-xs text-blue-400 font-semibold">{activeMatch.teamA.fouls} Fouls · {activeMatch.teamA.timeoutsRemaining} Timeouts Left</p>
              </div>
            </div>
            <span className="text-5xl sm:text-6xl font-black text-blue-400 font-display">
              {activeMatch.teamA.score}
            </span>
          </div>

          {/* Large Point Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => scoreTeamA(1, 'Free Throw')}
              className="py-5 bg-blue-600/20 hover:bg-blue-600/30 active:bg-blue-600 border border-blue-500/50 hover:border-blue-400 rounded-2xl text-2xl font-black text-blue-300 active:text-white transition-all transform active:scale-95 shadow-lg flex flex-col items-center justify-center cursor-pointer"
            >
              <span>+1</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Free Throw</span>
            </button>

            <button
              onClick={() => scoreTeamA(2, 'Field Goal')}
              className="py-5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-2xl text-3xl font-black transition-all transform active:scale-95 shadow-xl shadow-blue-600/30 flex flex-col items-center justify-center cursor-pointer"
            >
              <span>+2</span>
              <span className="text-[10px] font-semibold text-blue-100 uppercase">Field Goal</span>
            </button>

            <button
              onClick={() => scoreTeamA(3, '3-Pointer')}
              className="py-5 bg-gradient-to-tr from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white rounded-2xl text-3xl font-black transition-all transform active:scale-95 shadow-xl shadow-emerald-500/20 flex flex-col items-center justify-center cursor-pointer"
            >
              <span>+3</span>
              <span className="text-[10px] font-semibold text-emerald-100 uppercase">3-Pointer</span>
            </button>
          </div>

          {/* Foul & Timeout Touch Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => recordFoul('A', 'Team Player')}
              className="py-3 px-4 bg-slate-950 hover:bg-rose-950/30 border border-rose-500/40 text-rose-400 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" /> Personal Foul (+1)
            </button>
            <button
              onClick={() => recordTimeout('A')}
              className="py-3 px-4 bg-slate-950 hover:bg-amber-950/30 border border-amber-500/40 text-amber-400 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Clock className="w-4 h-4" /> Timeout (60s)
            </button>
          </div>
        </Card>

        {/* TEAM B CONTROL PAD */}
        <Card className="p-6 sm:p-8 border-2 border-emerald-500/40 bg-slate-900/90 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <img src={activeMatch.teamB.logoUrl} alt={activeMatch.teamB.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-700 shadow-md" />
              <div>
                <h3 className="text-xl font-black text-white font-display">{activeMatch.teamB.name}</h3>
                <p className="text-xs text-emerald-400 font-semibold">{activeMatch.teamB.fouls} Fouls · {activeMatch.teamB.timeoutsRemaining} Timeouts Left</p>
              </div>
            </div>
            <span className="text-5xl sm:text-6xl font-black text-emerald-400 font-display">
              {activeMatch.teamB.score}
            </span>
          </div>

          {/* Large Point Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => scoreTeamB(1, 'Free Throw')}
              className="py-5 bg-emerald-600/20 hover:bg-emerald-600/30 active:bg-emerald-600 border border-emerald-500/50 hover:border-emerald-400 rounded-2xl text-2xl font-black text-emerald-300 active:text-white transition-all transform active:scale-95 shadow-lg flex flex-col items-center justify-center cursor-pointer"
            >
              <span>+1</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Free Throw</span>
            </button>

            <button
              onClick={() => scoreTeamB(2, 'Field Goal')}
              className="py-5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-2xl text-3xl font-black transition-all transform active:scale-95 shadow-xl shadow-emerald-600/30 flex flex-col items-center justify-center cursor-pointer"
            >
              <span>+2</span>
              <span className="text-[10px] font-semibold text-emerald-100 uppercase">Field Goal</span>
            </button>

            <button
              onClick={() => scoreTeamB(3, '3-Pointer')}
              className="py-5 bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-2xl text-3xl font-black transition-all transform active:scale-95 shadow-xl shadow-teal-500/20 flex flex-col items-center justify-center cursor-pointer"
            >
              <span>+3</span>
              <span className="text-[10px] font-semibold text-teal-100 uppercase">3-Pointer</span>
            </button>
          </div>

          {/* Foul & Timeout Touch Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => recordFoul('B', 'Team Player')}
              className="py-3 px-4 bg-slate-950 hover:bg-rose-950/30 border border-rose-500/40 text-rose-400 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" /> Personal Foul (+1)
            </button>
            <button
              onClick={() => recordTimeout('B')}
              className="py-3 px-4 bg-slate-950 hover:bg-amber-950/30 border border-amber-500/40 text-amber-400 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Clock className="w-4 h-4" /> Timeout (60s)
            </button>
          </div>
        </Card>
      </div>

      {/* MATCH COMPLETION & PERIOD TRANSITION FOOTER */}
      <div className="p-4 sm:p-6 bg-slate-900/80 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            onClick={endPeriod}
            className="text-xs"
          >
            End {activeMatch.currentPeriod}
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="danger"
            size="lg"
            onClick={() => setConfirmCompleteOpen(true)}
            leftIcon={<Trophy className="w-4 h-4" />}
          >
            Finalize & Lock Match Results
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmCompleteOpen}
        onClose={() => setConfirmCompleteOpen(false)}
        onConfirm={handleFinishMatch}
        title="Complete Match & Lock Scores?"
        message={`This will finalize the official match score (${activeMatch.teamA.score} - ${activeMatch.teamB.score}) and advance the winner in the championship bracket.`}
        confirmText="Finalize Official Match"
        variant="primary"
      />
    </div>
  );
};
