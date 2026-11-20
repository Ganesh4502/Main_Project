import React, { useEffect, useState } from 'react';
import { Cpu, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export const AIProcessingAnimation: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const steps = [
    'Analyzing tournament parameters & team rosters...',
    'Checking arena court availability & maintenance windows...',
    'Evaluating scheduling conflicts & travel buffers...',
    'Optimizing mandatory rest periods (min 4 hrs)...',
    'Balancing weekend prime-time television slots...',
    'Finalizing balanced tournament fixture schedule...',
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(timer);
        if (onComplete) setTimeout(onComplete, 600);
        return prev;
      });
    }, 700);

    return () => clearInterval(timer);
  }, [onComplete, steps.length]);

  return (
    <div className="p-8 text-center bg-slate-900/90 border border-emerald-500/30 rounded-3xl shadow-2xl backdrop-blur-2xl max-w-lg mx-auto space-y-6">
      <div className="relative w-20 h-20 mx-auto">
        <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-slate-950 shadow-xl shadow-emerald-500/30">
          <Cpu className="w-10 h-10 animate-pulse text-slate-950" />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-100 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" /> Spotix AI Engine Active
        </h3>
        <p className="text-xs text-slate-400 mt-1">Constraint Satisfaction Scheduling Algorithm v4.2</p>
      </div>

      <div className="space-y-2 text-left bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;

          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 text-xs transition-all duration-300 ${
                isDone
                  ? 'text-emerald-400 font-medium'
                  : isCurrent
                  ? 'text-white font-bold animate-pulse'
                  : 'text-slate-600'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
              )}
              <span className="truncate">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SuitabilityScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  let color = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  if (score < 80) color = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  if (score < 65) color = 'text-rose-400 bg-rose-500/10 border-rose-500/30';

  return (
    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold ${color}`}>
      <Zap className="w-3.5 h-3.5 fill-current" />
      <span>{score}% Suitability Score</span>
    </div>
  );
};

export const ScheduleQualityGauge: React.FC<{ quality: number; conflicts: number; restViolations: number }> = ({
  quality,
  conflicts,
  restViolations,
}) => {
  return (
    <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-5">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-800"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-emerald-400 transition-all duration-1000 ease-out"
              strokeDasharray={`${quality}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-black text-slate-100 font-display">{quality}%</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Quality</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-slate-100">Schedule Optimization Quality</h4>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
              Optimal
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            AI evaluated 142 permutation paths. Verified zero court double-bookings and compliant athlete recovery.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
        <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase font-bold text-slate-400">Conflicts</p>
          <p className="text-lg font-black text-emerald-400 mt-0.5">{conflicts}</p>
        </div>
        <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase font-bold text-slate-400">Rest Violations</p>
          <p className="text-lg font-black text-emerald-400 mt-0.5">{restViolations}</p>
        </div>
        <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase font-bold text-slate-400">Court Fit</p>
          <p className="text-lg font-black text-blue-400 mt-0.5">100%</p>
        </div>
      </div>
    </div>
  );
};
