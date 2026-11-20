import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, MapPin, ChevronRight, UserCheck } from 'lucide-react';
import { Match } from '../../types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export interface MatchCardProps {
  match: Match;
  onOpenLive?: (match: Match) => void;
  showControlLink?: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, showControlLink = false }) => {
  const navigate = useNavigate();

  const isLive = match.status === 'LIVE';

  return (
    <Card
      variant={isLive ? 'glow' : 'interactive'}
      glowColor="emerald"
      className={`p-5 transition-all duration-300 border ${
        isLive ? 'border-emerald-500/40 bg-slate-900/90' : 'border-slate-800/80 bg-slate-900/50'
      }`}
    >
      {/* Header Info */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800/60 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-300">{match.roundName}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 font-medium">{match.sport}</span>
        </div>
        <div>
          {isLive ? (
            <Badge variant="live" dot size="sm">
              LIVE · {match.currentPeriod}
            </Badge>
          ) : match.status === 'COMPLETED' ? (
            <Badge variant="secondary" size="sm">
              FINAL
            </Badge>
          ) : (
            <Badge variant="primary" size="sm">
              {match.time}
            </Badge>
          )}
        </div>
      </div>

      {/* Teams and Scores */}
      <div className="py-4 space-y-3">
        {/* Team A */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={match.teamA.logoUrl}
              alt={match.teamA.name}
              className="w-8 h-8 rounded-full border border-slate-700 object-cover"
            />
            <div>
              <h4 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                {match.teamA.name}
                <span className="text-[10px] text-slate-500 font-mono">[{match.teamA.tag}]</span>
              </h4>
              {isLive && <p className="text-[11px] text-slate-400">{match.teamA.fouls} fouls · {match.teamA.timeoutsRemaining} TO</p>}
            </div>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-black font-display ${
              isLive
                ? match.teamA.score > match.teamB.score ? 'text-emerald-400' : 'text-slate-200'
                : match.winnerTeamId === match.teamA.id ? 'text-emerald-400 font-bold' : 'text-slate-300'
            }`}>
              {match.status === 'SCHEDULED' ? '-' : match.teamA.score}
            </span>
          </div>
        </div>

        {/* Team B */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={match.teamB.logoUrl}
              alt={match.teamB.name}
              className="w-8 h-8 rounded-full border border-slate-700 object-cover"
            />
            <div>
              <h4 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                {match.teamB.name}
                <span className="text-[10px] text-slate-500 font-mono">[{match.teamB.tag}]</span>
              </h4>
              {isLive && <p className="text-[11px] text-slate-400">{match.teamB.fouls} fouls · {match.teamB.timeoutsRemaining} TO</p>}
            </div>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-black font-display ${
              isLive
                ? match.teamB.score > match.teamA.score ? 'text-emerald-400' : 'text-slate-200'
                : match.winnerTeamId === match.teamB.id ? 'text-emerald-400 font-bold' : 'text-slate-300'
            }`}>
              {match.status === 'SCHEDULED' ? '-' : match.teamB.score}
            </span>
          </div>
        </div>
      </div>

      {/* Match Meta & Actions */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2 truncate">
          <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span className="truncate">{match.arenaName} ({match.court})</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {showControlLink && (
            <Button
              variant="outline"
              size="sm"
              className="text-[11px] py-1 px-2.5 h-7 border-emerald-500/40 text-emerald-400"
              onClick={() => navigate(`/official/matches/${match.id}/control`)}
            >
              Control Pad
            </Button>
          )}

          <Button
            variant={isLive ? 'primary' : 'ghost'}
            size="sm"
            className="text-[11px] py-1 px-2.5 h-7"
            onClick={() => navigate(`/matches/${match.id}/live`)}
            rightIcon={isLive ? <Play className="w-3 h-3 fill-white" /> : <ChevronRight className="w-3.5 h-3.5" />}
          >
            {isLive ? 'Watch Live' : 'Match Center'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
