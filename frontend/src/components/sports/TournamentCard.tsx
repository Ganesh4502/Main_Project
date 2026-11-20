import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Calendar, MapPin, Users, Award, ArrowRight } from 'lucide-react';
import { Tournament } from '../../types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export interface TournamentCardProps {
  tournament: Tournament;
  onRegister?: (tournament: Tournament) => void;
  showActions?: boolean;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  tournament,
  onRegister,
  showActions = true,
}) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: Tournament['status']) => {
    switch (status) {
      case 'LIVE':
        return <Badge variant="live" dot>LIVE NOW</Badge>;
      case 'REGISTRATION_OPEN':
        return <Badge variant="success" dot>Registration Open</Badge>;
      case 'REGISTRATION_CLOSED':
        return <Badge variant="warning">Reg. Closed</Badge>;
      case 'COMPLETED':
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="primary">{status}</Badge>;
    }
  };

  return (
    <Card variant="interactive" className="flex flex-col h-full overflow-hidden border border-slate-800/90 group">
      {/* Banner */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={tournament.bannerUrl}
          alt={tournament.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {getStatusBadge(tournament.status)}
          <Badge variant="primary" className="bg-slate-900/80 backdrop-blur-md">
            {tournament.sport}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
          <span className="font-semibold text-emerald-400 flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> {tournament.prizePool}
          </span>
          <span className="bg-slate-900/90 px-2 py-0.5 rounded-full border border-slate-700 text-[11px]">
            {tournament.format}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
            {tournament.name}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {tournament.description}
          </p>

          {/* Details */}
          <div className="grid grid-cols-2 gap-2.5 my-4 pt-3 border-t border-slate-800/60 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate">{new Date(tournament.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="truncate">{tournament.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{tournament.registeredTeamsCount}/{tournament.maxTeams} Teams</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">By {tournament.organizerName}</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        {showActions && (
          <div className="pt-2 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => navigate(`/tournaments/${tournament.id}`)}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View Tournament
            </Button>
            {tournament.status === 'REGISTRATION_OPEN' && onRegister && (
              <Button
                variant="primary"
                size="sm"
                className="text-xs px-3"
                onClick={() => onRegister(tournament)}
              >
                Register
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
