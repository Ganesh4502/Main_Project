import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trophy, MapPin, Users, Activity, ArrowRight, X } from 'lucide-react';
import { MOCK_TOURNAMENTS, MOCK_ARENAS, MOCK_TEAMS, MOCK_SPORTS } from '../../api/mockData';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent can toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTournaments = MOCK_TOURNAMENTS.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase()) || t.sport.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArenas = MOCK_ARENAS.filter(a =>
    a.name.toLowerCase().includes(query.toLowerCase()) || a.city.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTeams = MOCK_TEAMS.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase()) || t.sport.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSports = MOCK_SPORTS.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-emerald-500/10 z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 border-b border-slate-800 bg-slate-900/90">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search tournaments, arenas, teams, sports, matches... (Press Esc to close)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent px-3 py-4 text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-xs bg-slate-800 border border-slate-700 text-slate-400 px-2 py-1 rounded-md hover:text-white"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs">
          {/* Tournaments */}
          {filteredTournaments.length > 0 && (
            <div>
              <p className="font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> Tournaments
              </p>
              <div className="space-y-1">
                {filteredTournaments.map(t => (
                  <div
                    key={t.id}
                    onClick={() => handleSelect(`/tournaments/${t.id}`)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer text-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-sm text-slate-100">{t.name}</span>
                      <span className="text-[11px] text-slate-400">({t.sport})</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Arenas */}
          {filteredArenas.length > 0 && (
            <div>
              <p className="font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" /> Arenas & Venues
              </p>
              <div className="space-y-1">
                {filteredArenas.map(a => (
                  <div
                    key={a.id}
                    onClick={() => handleSelect('/arenas')}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer text-slate-200 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-sm text-slate-100">{a.name}</span>
                      <span className="text-[11px] text-slate-400 ml-2">{a.city} · ${a.hourlyRate}/hr</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teams */}
          {filteredTeams.length > 0 && (
            <div>
              <p className="font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" /> Teams
              </p>
              <div className="space-y-1">
                {filteredTeams.map(tm => (
                  <div
                    key={tm.id}
                    onClick={() => handleSelect('/team')}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer text-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-100">{tm.name}</span>
                      <span className="text-[11px] text-slate-400">[{tm.tag}] · {tm.sport}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sports */}
          {filteredSports.length > 0 && (
            <div>
              <p className="font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-purple-400" /> Sports
              </p>
              <div className="space-y-1">
                {filteredSports.map(s => (
                  <div
                    key={s.id}
                    onClick={() => handleSelect('/sports')}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer text-slate-200 transition-colors"
                  >
                    <span className="font-semibold text-sm text-slate-100">{s.name} ({s.category})</span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredTournaments.length === 0 && filteredArenas.length === 0 && filteredTeams.length === 0 && filteredSports.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              No matching records found for "{query}".
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with mouse or arrow keys</span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">Ctrl</kbd> +
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">K</kbd> to toggle
          </span>
        </div>
      </div>
    </div>
  );
};
