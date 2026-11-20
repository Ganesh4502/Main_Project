import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Trophy, Shield, Activity, Plus, Edit, Trash2, Star, Play, MapPin } from 'lucide-react';
import { MOCK_TEAMS, MOCK_PLAYERS, MOCK_MATCHES } from '../../api/mockData';
import { PlayerCard } from '../../components/sports/TeamAndOfficialCards';
import { MatchCard } from '../../components/sports/MatchCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { StatCard } from '../../components/ui/StatCard';
import { useNotification } from '../../context/NotificationContext';
import { Player, Team } from '../../types';

export const TeamManagerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const team = MOCK_TEAMS[0]; // Cyber Knights

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img src={team.logoUrl} alt={team.name} className="w-14 h-14 rounded-2xl border border-slate-700 object-cover" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white font-display">{team.name}</h1>
              <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                {team.tag}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Manager Portal · {team.sport} · {team.city}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="glow" size="sm" onClick={() => navigate('/team/players')} leftIcon={<Users className="w-4 h-4" />}>
            Manage Roster
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/tournaments')}>
            Apply to Tournaments
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Win Rate" value={`${team.stats.winRate}%`} change="23 Wins / 5 Losses" isPositive={true} icon={<Trophy className="w-5 h-5" />} color="emerald" />
        <StatCard title="Roster Size" value={`${team.playerCount} Athletes`} change="Full Squad" isPositive={true} icon={<Users className="w-5 h-5" />} color="blue" />
        <StatCard title="Total Points" value="1,240 Pts" change="88.5 PPG Avg" isPositive={true} icon={<Activity className="w-5 h-5" />} color="purple" />
        <StatCard title="Championship Standing" value="#1 Seed" change="Spotix Elite Cup" isPositive={true} icon={<Star className="w-5 h-5" />} color="amber" />
      </div>

      {/* Upcoming Matches */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Upcoming Club Fixtures</h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/matches/m-live-1/live')}>
            Open Live Match Center
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_MATCHES.slice(0, 2).map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const TeamManagementPage: React.FC = () => {
  const team = MOCK_TEAMS[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white font-display">Club Profile & Information</h1>
        <p className="text-xs text-slate-400 mt-0.5">Manage team identity, coaching staff, and athletic federation badges.</p>
      </div>

      <Card className="p-8 border border-slate-800 space-y-6">
        <div className="flex items-center gap-5 pb-6 border-b border-slate-800">
          <img src={team.logoUrl} alt={team.name} className="w-20 h-20 rounded-3xl object-cover border-2 border-slate-700 shadow-xl" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white font-display">{team.name}</h2>
              <Badge variant="primary">{team.tag}</Badge>
            </div>
            <p className="text-xs text-slate-400">{team.sport} · Founded {team.foundedYear} · {team.city}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <p className="text-slate-500 uppercase font-bold text-[10px]">Head Coach</p>
            <p className="text-sm font-bold text-slate-100">{team.coachName}</p>
          </div>
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <p className="text-slate-500 uppercase font-bold text-[10px]">Team General Manager</p>
            <p className="text-sm font-bold text-slate-100">{team.managerName} ({team.managerEmail})</p>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
          <h3 className="font-bold text-slate-100">Official Club Record</h3>
          <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-slate-800">
            <div>
              <p className="text-slate-500 text-[10px]">Matches</p>
              <p className="text-base font-bold text-slate-100">{team.stats.matches}</p>
            </div>
            <div>
              <p className="text-slate-500 text-[10px]">Wins</p>
              <p className="text-base font-bold text-emerald-400">{team.stats.wins}</p>
            </div>
            <div>
              <p className="text-slate-500 text-[10px]">Losses</p>
              <p className="text-base font-bold text-rose-400">{team.stats.losses}</p>
            </div>
            <div>
              <p className="text-slate-500 text-[10px]">Win Rate</p>
              <p className="text-base font-bold text-blue-400">{team.stats.winRate}%</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const TeamPlayerManagementPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>(MOCK_PLAYERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlayerData, setNewPlayerData] = useState<Partial<Player>>({
    name: '',
    position: 'Point Guard',
    jerseyNumber: 15,
    height: "6'2\"",
    weight: '190 lbs',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  });
  const { showToast } = useNotification();

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Player = {
      id: `pl-${Date.now()}`,
      teamId: 'team-1',
      teamName: 'Cyber Knights',
      name: newPlayerData.name || 'New Player',
      email: 'player@spotix.io',
      phone: '+1 555-0000',
      position: newPlayerData.position || 'Forward',
      jerseyNumber: Number(newPlayerData.jerseyNumber) || 10,
      avatarUrl: newPlayerData.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      height: newPlayerData.height || "6'2\"",
      weight: newPlayerData.weight || '190 lbs',
      dateOfBirth: '2001-01-01',
      status: 'ACTIVE',
      stats: { matches: 0, pointsOrGoals: 0, assists: 0, fouls: 0, mvpAwards: 0, performanceRating: 8.5 },
    };

    setPlayers(prev => [...prev, created]);
    showToast('success', 'Athlete Enrolled', `${created.name} added to roster.`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-display">Player Roster Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage squad line-ups, jersey allocations, and player statistics.</p>
        </div>

        <Button variant="glow" size="sm" onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Add Player to Roster
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>

      {/* Add Player Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Athlete to Squad"
          description="Enrolling an athlete makes them eligible for tournament rosters."
        >
          <form onSubmit={handleAddPlayer} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Athlete Full Name</label>
              <input
                type="text"
                required
                value={newPlayerData.name}
                onChange={e => setNewPlayerData({ ...newPlayerData, name: e.target.value })}
                placeholder="e.g. Jordan Rivera"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Position</label>
                <input
                  type="text"
                  value={newPlayerData.position}
                  onChange={e => setNewPlayerData({ ...newPlayerData, position: e.target.value })}
                  placeholder="Point Guard"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Jersey Number</label>
                <input
                  type="number"
                  value={newPlayerData.jerseyNumber}
                  onChange={e => setNewPlayerData({ ...newPlayerData, jerseyNumber: parseInt(e.target.value, 10) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Add to Roster
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
