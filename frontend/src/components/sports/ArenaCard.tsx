import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Users, Check, ArrowRight } from 'lucide-react';
import { Arena } from '../../types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export interface ArenaCardProps {
  arena: Arena;
  onBook?: (arena: Arena) => void;
}

export const ArenaCard: React.FC<ArenaCardProps> = ({ arena, onBook }) => {
  const navigate = useNavigate();

  return (
    <Card variant="interactive" className="flex flex-col h-full overflow-hidden border border-slate-800 group">
      {/* Media */}
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={arena.images[0]}
          alt={arena.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={arena.isIndoor ? 'primary' : 'secondary'} className="bg-slate-900/90 backdrop-blur-md">
            {arena.isIndoor ? 'Indoor Arena' : 'Outdoor Stadium'}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700 text-xs text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{arena.rating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal">({arena.reviewCount})</span>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
            {arena.sports.slice(0, 3).map(s => (
              <span key={s} className="bg-slate-900/90 text-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-700">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
              {arena.name}
            </h3>
            <span className="text-emerald-400 font-extrabold text-base shrink-0 font-display">
              ${arena.hourlyRate}<span className="text-xs text-slate-400 font-normal">/hr</span>
            </span>
          </div>

          <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="truncate">{arena.address}</span>
          </p>

          <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
            {arena.description}
          </p>

          {/* Facilities pills */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800/60">
            {arena.facilities.slice(0, 3).map((f, i) => (
              <span key={i} className="text-[11px] text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-400" /> {f}
              </span>
            ))}
            {arena.facilities.length > 3 && (
              <span className="text-[11px] text-slate-500 px-1 py-0.5">
                +{arena.facilities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => navigate(`/arenas`)}
          >
            View Details
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => onBook ? onBook(arena) : navigate(`/arenas`)}
            rightIcon={<ArrowRight className="w-3 h-3" />}
          >
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
};
