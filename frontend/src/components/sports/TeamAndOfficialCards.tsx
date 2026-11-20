import React from 'react';
import { Shield, Trophy, Users, Award, Star } from 'lucide-react';
import { Team, Player, Official } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const TeamCard: React.FC<{ team: Team; onSelect?: (team: Team) => void }> = ({ team, onSelect }) => (
  <Card variant="interactive" className="p-5 flex flex-col justify-between h-full border border-slate-800">
    <div>
      <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800/80">
        <img src={team.logoUrl} alt={team.name} className="w-12 h-12 rounded-2xl border border-slate-700 object-cover" />
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-slate-100 text-base">{team.name}</h4>
            <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
              {team.tag}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{team.sport} · {team.city}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center my-4 py-3 bg-slate-900/60 rounded-xl border border-slate-800/50">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Played</p>
          <p className="text-base font-black text-slate-200 mt-0.5">{team.stats.matches}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Wins</p>
          <p className="text-base font-black text-emerald-400 mt-0.5">{team.stats.wins}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Win Rate</p>
          <p className="text-base font-black text-blue-400 mt-0.5">{team.stats.winRate}%</p>
        </div>
      </div>

      <div className="space-y-1.5 text-xs text-slate-400">
        <div className="flex justify-between">
          <span>Coach:</span>
          <span className="text-slate-200 font-medium">{team.coachName}</span>
        </div>
        <div className="flex justify-between">
          <span>Manager:</span>
          <span className="text-slate-200 font-medium">{team.managerName}</span>
        </div>
        <div className="flex justify-between">
          <span>Roster Size:</span>
          <span className="text-slate-200 font-medium">{team.playerCount} Players</span>
        </div>
      </div>
    </div>

    {onSelect && (
      <div className="pt-4 mt-2 border-t border-slate-800/60">
        <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => onSelect(team)}>
          View Team Profile
        </Button>
      </div>
    )}
  </Card>
);

export const PlayerCard: React.FC<{ player: Player; onEdit?: (player: Player) => void }> = ({ player, onEdit }) => (
  <Card variant="interactive" className="p-5 border border-slate-800 flex flex-col justify-between">
    <div>
      <div className="flex items-center gap-3.5">
        <div className="relative">
          <img src={player.avatarUrl} alt={player.name} className="w-14 h-14 rounded-2xl border border-slate-700 object-cover" />
          <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-slate-900 font-display">
            #{player.jerseyNumber}
          </span>
        </div>
        <div>
          <h4 className="font-bold text-slate-100 text-base">{player.name}</h4>
          <p className="text-xs text-emerald-400 font-semibold">{player.position}</p>
          <p className="text-[11px] text-slate-400">{player.teamName}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center my-4 py-2.5 bg-slate-900/60 rounded-xl border border-slate-800/50">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Points</p>
          <p className="text-sm font-bold text-slate-100">{player.stats.pointsOrGoals}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Assists</p>
          <p className="text-sm font-bold text-blue-400">{player.stats.assists}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Rating</p>
          <p className="text-sm font-bold text-emerald-400">{player.stats.performanceRating}</p>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 flex justify-between pt-1 border-t border-slate-800/60">
        <span>HT/WT: {player.height} / {player.weight}</span>
        <span>MVP Awards: {player.stats.mvpAwards}</span>
      </div>
    </div>
  </Card>
);

export const OfficialCard: React.FC<{ official: Official; onAssign?: (official: Official) => void }> = ({ official, onAssign }) => (
  <Card variant="interactive" className="p-5 border border-slate-800 flex flex-col justify-between">
    <div>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3.5">
          <img src={official.avatarUrl} alt={official.name} className="w-12 h-12 rounded-2xl border border-slate-700 object-cover" />
          <div>
            <h4 className="font-bold text-slate-100 text-base">{official.name}</h4>
            <p className="text-xs text-slate-400">{official.certificationLevel} Official</p>
            <div className="flex items-center gap-1 mt-0.5 text-xs text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{official.rating.toFixed(2)}</span>
              <span className="text-slate-500 font-normal">({official.matchesOfficiated} matches)</span>
            </div>
          </div>
        </div>
        <Badge
          variant={official.availabilityStatus === 'AVAILABLE' ? 'success' : official.availabilityStatus === 'ON_DUTY' ? 'live' : 'warning'}
          size="sm"
          dot
        >
          {official.availabilityStatus.replace('_', ' ')}
        </Badge>
      </div>

      <div className="my-3 py-2 px-3 bg-slate-950/60 rounded-xl border border-slate-800/60 text-xs">
        <p className="text-[11px] text-slate-400 font-medium line-clamp-1">{official.certificationName}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {official.sportSpecializations.map(s => (
            <span key={s} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Workload Progress */}
      <div className="space-y-1 my-3">
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>Workload Capacity:</span>
          <span className="font-semibold text-slate-200">{official.workloadScore}%</span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              official.workloadScore > 80 ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${official.workloadScore}%` }}
          />
        </div>
      </div>
    </div>

    {onAssign && (
      <div className="pt-2">
        <Button variant="primary" size="sm" className="w-full text-xs" onClick={() => onAssign(official)}>
          Assign Official
        </Button>
      </div>
    )}
  </Card>
);
