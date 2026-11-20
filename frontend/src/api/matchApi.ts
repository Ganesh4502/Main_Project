import { apiClient } from './client';
import { Match, MatchEvent } from '../types';
import { MOCK_MATCHES } from './mockData';

let matchesState = [...MOCK_MATCHES];

export const matchApi = {
  getAll: async (filters?: { tournamentId?: string; status?: string; sport?: string }): Promise<Match[]> => {
    try {
      const res = await apiClient.get<Match[]>('/matches', { params: filters });
      return res.data;
    } catch {
      let list = [...matchesState];
      if (filters?.tournamentId) list = list.filter(m => m.tournamentId === filters.tournamentId);
      if (filters?.status) list = list.filter(m => m.status === filters.status);
      if (filters?.sport) list = list.filter(m => m.sport.toLowerCase().includes(filters.sport!.toLowerCase()));
      return list;
    }
  },

  getById: async (id: string): Promise<Match | undefined> => {
    try {
      const res = await apiClient.get<Match>(`/matches/${id}`);
      return res.data;
    } catch {
      return matchesState.find(m => m.id === id) || matchesState[0];
    }
  },

  updateScore: async (id: string, team: 'A' | 'B', points: number, eventDesc?: string): Promise<Match> => {
    try {
      const res = await apiClient.patch<Match>(`/matches/${id}/score`, { team, points, eventDesc });
      return res.data;
    } catch {
      matchesState = matchesState.map(m => {
        if (m.id !== id) return m;
        const isTeamA = team === 'A';
        const newScoreA = isTeamA ? m.teamA.score + points : m.teamA.score;
        const newScoreB = !isTeamA ? m.teamB.score + points : m.teamB.score;

        const newEvent: MatchEvent = {
          id: `ev-${Date.now()}`,
          matchId: id,
          timestamp: new Date().toISOString(),
          gameTime: m.periodTimeRemaining || '08:00',
          type: 'SCORE',
          teamId: isTeamA ? m.teamA.id : m.teamB.id,
          teamName: isTeamA ? m.teamA.name : m.teamB.name,
          points,
          description: eventDesc || `${isTeamA ? m.teamA.name : m.teamB.name} scored +${points} pts`,
        };

        return {
          ...m,
          teamA: { ...m.teamA, score: Math.max(0, newScoreA) },
          teamB: { ...m.teamB, score: Math.max(0, newScoreB) },
          events: [newEvent, ...(m.events || [])],
        };
      });
      return matchesState.find(m => m.id === id)!;
    }
  },

  addEvent: async (id: string, event: Partial<MatchEvent>): Promise<Match> => {
    try {
      const res = await apiClient.post<Match>(`/matches/${id}/events`, event);
      return res.data;
    } catch {
      matchesState = matchesState.map(m => {
        if (m.id !== id) return m;
        const fullEvent: MatchEvent = {
          id: `ev-${Date.now()}`,
          matchId: id,
          timestamp: new Date().toISOString(),
          gameTime: m.periodTimeRemaining || '06:00',
          type: event.type || 'SCORE',
          teamId: event.teamId,
          teamName: event.teamName,
          playerId: event.playerId,
          playerName: event.playerName,
          points: event.points,
          description: event.description || 'Action recorded',
        };
        return {
          ...m,
          events: [fullEvent, ...(m.events || [])],
        };
      });
      return matchesState.find(m => m.id === id)!;
    }
  },

  updateStatus: async (id: string, status: Match['status']): Promise<Match> => {
    try {
      const res = await apiClient.patch<Match>(`/matches/${id}/status`, { status });
      return res.data;
    } catch {
      matchesState = matchesState.map(m => m.id === id ? { ...m, status } : m);
      return matchesState.find(m => m.id === id)!;
    }
  },

  assignOfficial: async (matchId: string, officialId: string, officialName: string): Promise<Match> => {
    try {
      const res = await apiClient.patch<Match>(`/matches/${matchId}/assign-official`, { officialId, officialName });
      return res.data;
    } catch {
      matchesState = matchesState.map(m => m.id === matchId ? {
        ...m,
        official: { id: officialId, name: officialName, role: 'Assigned Lead Official' }
      } : m);
      return matchesState.find(m => m.id === matchId)!;
    }
  }
};
