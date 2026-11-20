import React from 'react';
import { Trophy, CheckCircle2 } from 'lucide-react';
import { StandingRow } from '../../types';
import { Card } from '../ui/Card';

export interface BracketMatch {
  id: string;
  round: string;
  team1: { name: string; score: number; isWinner?: boolean };
  team2: { name: string; score: number; isWinner?: boolean };
  date: string;
  time: string;
  status: 'SCHEDULED' | 'LIVE' | 'COMPLETED';
}

export const KnockoutBracket: React.FC = () => {
  const rounds = [
    {
      name: 'Quarter Finals',
      matches: [
        { id: 'qf-1', round: 'QF 1', team1: { name: 'Cyber Knights', score: 88, isWinner: true }, team2: { name: 'Apex Predators', score: 79 }, date: 'Oct 12', time: '10:00 AM', status: 'COMPLETED' },
        { id: 'qf-2', round: 'QF 2', team1: { name: 'Titan Vanguard', score: 76, isWinner: true }, team2: { name: 'Silicon Hawks', score: 70 }, date: 'Oct 12', time: '01:00 PM', status: 'COMPLETED' },
        { id: 'qf-3', round: 'QF 3', team1: { name: 'Velocity Phoenix', score: 92, isWinner: true }, team2: { name: 'Golden Gate Warriors', score: 84 }, date: 'Oct 13', time: '10:00 AM', status: 'COMPLETED' },
        { id: 'qf-4', round: 'QF 4', team1: { name: 'Bay Area Strikers', score: 81, isWinner: true }, team2: { name: 'Silicon Warriors', score: 78 }, date: 'Oct 13', time: '01:00 PM', status: 'COMPLETED' },
      ],
    },
    {
      name: 'Semi Finals',
      matches: [
        { id: 'sf-1', round: 'SF 1', team1: { name: 'Cyber Knights', score: 52 }, team2: { name: 'Titan Vanguard', score: 48 }, date: 'Oct 15', time: '10:00 AM', status: 'LIVE' },
        { id: 'sf-2', round: 'SF 2', team1: { name: 'Velocity Phoenix', score: 0 }, team2: { name: 'Bay Area Strikers', score: 0 }, date: 'Oct 15', time: '02:00 PM', status: 'SCHEDULED' },
      ],
    },
    {
      name: 'Championship Final',
      matches: [
        { id: 'fn-1', round: 'Championship Final', team1: { name: 'Winner SF 1', score: 0 }, team2: { name: 'Winner SF 2', score: 0 }, date: 'Oct 18', time: '06:00 PM', status: 'SCHEDULED' },
      ],
    },
  ];

  return (
    <div className="w-full overflow-x-auto p-4 scrollbar-thin">
      <div className="flex gap-10 min-w-[900px] justify-between">
        {rounds.map((round, rIdx) => (
          <div key={rIdx} className="flex-1 flex flex-col justify-around">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 text-center border-b border-slate-800 pb-2 flex items-center justify-center gap-1.5">
              {rIdx === 2 && <Trophy className="w-3.5 h-3.5 text-amber-400" />} {round.name}
            </h4>
            <div className="space-y-8">
              {round.matches.map((m) => (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    m.status === 'LIVE'
                      ? 'border-emerald-500/60 bg-emerald-950/20 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/40'
                      : 'border-slate-800 bg-slate-900/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mb-2">
                    <span className="font-semibold text-slate-300">{m.round}</span>
                    <span className={m.status === 'LIVE' ? 'text-emerald-400 font-bold animate-pulse' : ''}>
                      {m.status === 'LIVE' ? '● LIVE' : `${m.date} · ${m.time}`}
                    </span>
                  </div>

                  {/* Team 1 */}
                  <div className={`flex justify-between items-center py-1 px-2 rounded-lg text-xs font-medium ${
                    m.team1.isWinner ? 'bg-emerald-500/15 text-emerald-300 font-bold' : 'text-slate-200'
                  }`}>
                    <span className="truncate">{m.team1.name}</span>
                    <span className="font-bold ml-2 font-display">{m.status === 'SCHEDULED' ? '-' : m.team1.score}</span>
                  </div>

                  {/* Team 2 */}
                  <div className={`flex justify-between items-center py-1 px-2 rounded-lg text-xs font-medium mt-1 ${
                    m.team2.isWinner ? 'bg-emerald-500/15 text-emerald-300 font-bold' : 'text-slate-200'
                  }`}>
                    <span className="truncate">{m.team2.name}</span>
                    <span className="font-bold ml-2 font-display">{m.status === 'SCHEDULED' ? '-' : m.team2.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const LeagueTable: React.FC<{ standings: StandingRow[] }> = ({ standings }) => (
  <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">
    <table className="w-full text-left text-xs border-collapse">
      <thead>
        <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
          <th className="py-3 px-4 w-12 text-center">Pos</th>
          <th className="py-3 px-4">Club / Team</th>
          <th className="py-3 px-3 text-center">P</th>
          <th className="py-3 px-3 text-center">W</th>
          <th className="py-3 px-3 text-center">D</th>
          <th className="py-3 px-3 text-center">L</th>
          <th className="py-3 px-3 text-center">GF</th>
          <th className="py-3 px-3 text-center">GA</th>
          <th className="py-3 px-3 text-center">GD</th>
          <th className="py-3 px-4 text-center font-bold text-slate-100">PTS</th>
          <th className="py-3 px-4 text-center">Recent Form</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-800/60 text-slate-200">
        {standings.map((row) => (
          <tr key={row.teamId} className="hover:bg-slate-800/40 transition-colors">
            <td className="py-3 px-4 text-center font-black">
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                row.position <= 2 ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}>
                {row.position}
              </span>
            </td>
            <td className="py-3 px-4">
              <div className="flex items-center gap-2.5">
                <img src={row.teamLogo} alt={row.teamName} className="w-6 h-6 rounded-full border border-slate-700 object-cover" />
                <span className="font-bold text-sm text-slate-100">{row.teamName}</span>
              </div>
            </td>
            <td className="py-3 px-3 text-center font-semibold text-slate-400">{row.played}</td>
            <td className="py-3 px-3 text-center text-emerald-400 font-semibold">{row.won}</td>
            <td className="py-3 px-3 text-center text-slate-400">{row.drawn}</td>
            <td className="py-3 px-3 text-center text-rose-400">{row.lost}</td>
            <td className="py-3 px-3 text-center">{row.goalsFor}</td>
            <td className="py-3 px-3 text-center text-slate-400">{row.goalsAgainst}</td>
            <td className="py-3 px-3 text-center font-semibold text-slate-300">
              {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
            </td>
            <td className="py-3 px-4 text-center text-base font-black text-emerald-400 font-display">
              {row.points}
            </td>
            <td className="py-3 px-4">
              <div className="flex items-center justify-center gap-1">
                {row.form.map((f, i) => (
                  <span
                    key={i}
                    className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                      f === 'W' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : f === 'D' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
