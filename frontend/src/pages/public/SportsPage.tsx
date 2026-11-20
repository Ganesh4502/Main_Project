import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Activity, Users, Trophy, MapPin, Check, ArrowRight } from 'lucide-react';
import { MOCK_SPORTS } from '../../api/mockData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Sport } from '../../types';

export const SportsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeSportModal, setActiveSportModal] = useState<Sport | null>(null);
  const navigate = useNavigate();

  const categories = ['ALL', 'Team', 'Racquet', 'Combat', 'Athletics'];

  const filteredSports = MOCK_SPORTS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="primary">Multi-Sport Directory</Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Supported Sporting Disciplines
        </h1>
        <p className="text-sm text-slate-400">
          Spotix natively understands the specialized rules, officiating requirements, squad capacities, and timing protocols of all major sports.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sports or rules..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Sports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSports.map((sport) => (
          <Card key={sport.id} variant="interactive" className="p-5 border border-slate-800 flex flex-col justify-between group">
            <div>
              <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                <img
                  src={sport.imageUrl}
                  alt={sport.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                  {sport.category} Sport
                </span>
                <span className="absolute bottom-3 left-3 text-white font-bold text-lg font-display">
                  {sport.name}
                </span>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                {sport.description}
              </p>

              <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs text-slate-400">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-blue-400" /> Team Size:</span>
                  <span className="text-slate-200 font-semibold">{sport.minPlayers} - {sport.maxPlayers} players</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-emerald-400" /> Officials Required:</span>
                  <span className="text-slate-200 font-semibold">{sport.officialsRequired} Referees</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-400" /> Popular Arenas:</span>
                  <span className="text-slate-200 font-semibold">{sport.popularArenasCount} Venues</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setActiveSportModal(sport)}
              >
                Rules & Details
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => navigate('/tournaments')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Tournaments ({sport.upcomingTournamentsCount})
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Sport Detail Modal */}
      {activeSportModal && (
        <Modal
          isOpen={!!activeSportModal}
          onClose={() => setActiveSportModal(null)}
          title={`${activeSportModal.name} Official Framework`}
          description={`${activeSportModal.category} category · Supported on Spotix AI`}
        >
          <div className="space-y-5 text-xs text-slate-300">
            <img src={activeSportModal.imageUrl} alt={activeSportModal.name} className="w-full h-44 object-cover rounded-xl" />
            <p className="text-sm text-slate-200 leading-relaxed">{activeSportModal.description}</p>
            
            <div>
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-2">Rule Book Regulations</h4>
              <ul className="space-y-2">
                {activeSportModal.rules.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setActiveSportModal(null)}>
                Close
              </Button>
              <Button variant="primary" size="sm" onClick={() => { setActiveSportModal(null); navigate('/tournaments'); }}>
                Find Tournaments
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
