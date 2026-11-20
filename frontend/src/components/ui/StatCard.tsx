import React from 'react';
import { Card } from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  description?: string;
  color?: 'emerald' | 'blue' | 'purple' | 'amber';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  description,
  color = 'emerald',
}) => {
  const colorMap = {
    emerald: {
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      glow: 'group-hover:border-emerald-500/40',
      pill: 'text-emerald-400 bg-emerald-500/10',
    },
    blue: {
      bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      glow: 'group-hover:border-blue-500/40',
      pill: 'text-blue-400 bg-blue-500/10',
    },
    purple: {
      bg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      glow: 'group-hover:border-purple-500/40',
      pill: 'text-purple-400 bg-purple-500/10',
    },
    amber: {
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      glow: 'group-hover:border-amber-500/40',
      pill: 'text-amber-400 bg-amber-500/10',
    },
  };

  const currentTheme = colorMap[color];

  return (
    <Card variant="interactive" className={`p-6 ${currentTheme.glow} transition-all duration-300`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
          <h4 className="text-3xl font-extrabold text-slate-100 mt-2 tracking-tight font-display">{value}</h4>
        </div>
        <div className={`p-3 rounded-2xl border ${currentTheme.bg}`}>
          {icon}
        </div>
      </div>

      {(change || description) && (
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
          {change && (
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-0.5 font-semibold px-2 py-0.5 rounded-full ${
                  isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}
              >
                {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {change}
              </span>
              <span className="text-slate-500">vs last month</span>
            </div>
          )}
          {description && !change && <span className="text-slate-400">{description}</span>}
        </div>
      )}
    </Card>
  );
};
