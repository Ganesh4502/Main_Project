import { apiClient } from './client';
import { Team, Player, Official } from '../types';
import { MOCK_TEAMS, MOCK_PLAYERS, MOCK_OFFICIALS } from './mockData';

let teamsState = [...MOCK_TEAMS];
let playersState = [...MOCK_PLAYERS];
let officialsState = [...MOCK_OFFICIALS];

export const teamApi = {
  getAll: async (sport?: string): Promise<Team[]> => {
    try {
      const res = await apiClient.get<Team[]>('/teams', { params: { sport } });
      return res.data;
    } catch {
      return sport ? teamsState.filter(t => t.sport.toLowerCase().includes(sport.toLowerCase())) : [...teamsState];
    }
  },

  getById: async (id: string): Promise<Team | undefined> => {
    try {
      const res = await apiClient.get<Team>(`/teams/${id}`);
      return res.data;
    } catch {
      return teamsState.find(t => t.id === id);
    }
  },

  create: async (data: Partial<Team>): Promise<Team> => {
    try {
      const res = await apiClient.post<Team>('/teams', data);
      return res.data;
    } catch {
      const newTeam: Team = {
        id: `team-${Date.now()}`,
        name: data.name || 'New Club',
        tag: data.tag || 'NEW',
        logoUrl: data.logoUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        sport: data.sport || 'Basketball',
        sportId: data.sportId || 'sport-1',
        managerId: data.managerId || 'u-team',
        managerName: data.managerName || 'Samantha Ray',
        managerEmail: data.managerEmail || 'manager@cyberknights.com',
        coachName: data.coachName || 'Head Coach',
        foundedYear: data.foundedYear || 2024,
        city: data.city || 'San Francisco',
        playerCount: 1,
        stats: { matches: 0, wins: 0, losses: 0, draws: 0, points: 0, winRate: 0 },
        status: 'ACTIVE',
      };
      teamsState.push(newTeam);
      return newTeam;
    }
  }
};

export const playerApi = {
  getAll: async (teamId?: string): Promise<Player[]> => {
    try {
      const res = await apiClient.get<Player[]>('/players', { params: { teamId } });
      return res.data;
    } catch {
      return teamId ? playersState.filter(p => p.teamId === teamId) : [...playersState];
    }
  },

  getById: async (id: string): Promise<Player | undefined> => {
    try {
      const res = await apiClient.get<Player>(`/players/${id}`);
      return res.data;
    } catch {
      return playersState.find(p => p.id === id);
    }
  },

  create: async (data: Partial<Player>): Promise<Player> => {
    try {
      const res = await apiClient.post<Player>('/players', data);
      return res.data;
    } catch {
      const newPlayer: Player = {
        id: `pl-${Date.now()}`,
        teamId: data.teamId || 'team-1',
        teamName: data.teamName || 'Cyber Knights',
        name: data.name || 'New Player',
        email: data.email || 'player@spotix.io',
        phone: data.phone || '+1 (555) 000-0000',
        position: data.position || 'Forward',
        jerseyNumber: data.jerseyNumber || 10,
        avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        height: data.height || "6'2\"",
        weight: data.weight || '190 lbs',
        dateOfBirth: data.dateOfBirth || '2002-01-01',
        status: 'ACTIVE',
        stats: { matches: 0, pointsOrGoals: 0, assists: 0, fouls: 0, mvpAwards: 0, performanceRating: 8.0 },
      };
      playersState.push(newPlayer);
      return newPlayer;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/players/${id}`);
    } catch {
      playersState = playersState.filter(p => p.id !== id);
    }
  }
};

export const officialApi = {
  getAll: async (sport?: string): Promise<Official[]> => {
    try {
      const res = await apiClient.get<Official[]>('/officials', { params: { sport } });
      return res.data;
    } catch {
      return sport ? officialsState.filter(o => o.sportSpecializations.some(s => s.toLowerCase().includes(sport.toLowerCase()))) : [...officialsState];
    }
  },

  getById: async (id: string): Promise<Official | undefined> => {
    try {
      const res = await apiClient.get<Official>(`/officials/${id}`);
      return res.data;
    } catch {
      return officialsState.find(o => o.id === id);
    }
  },

  create: async (data: Partial<Official>, assignedBy: 'Super Admin' | 'Sponsor' = 'Super Admin'): Promise<Official> => {
    try {
      const res = await apiClient.post<Official>('/officials', { ...data, assignedBy });
      return res.data;
    } catch {
      const newOfficial: Official = {
        id: `off-${Date.now()}`,
        name: data.name || 'New Official',
        email: data.email || 'ref@spotix.io',
        phone: data.phone || '+1 (555) 000-0000',
        avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        sportSpecializations: data.sportSpecializations || ['Basketball'],
        experienceYears: data.experienceYears || 5,
        certificationLevel: data.certificationLevel || 'National',
        certificationName: data.certificationName || 'National Ref Council Level 2',
        rating: 4.8,
        workloadScore: 40,
        matchesOfficiated: 10,
        availabilityStatus: 'AVAILABLE',
        status: 'ACTIVE',
        assignedBy,
        suitabilityScore: 90,
      };
      officialsState.unshift(newOfficial);
      return newOfficial;
    }
  },

  updateAvailability: async (id: string, availabilityStatus: Official['availabilityStatus']): Promise<Official> => {
    try {
      const res = await apiClient.patch<Official>(`/officials/${id}/availability`, { availabilityStatus });
      return res.data;
    } catch {
      officialsState = officialsState.map(o => o.id === id ? { ...o, availabilityStatus } : o);
      return officialsState.find(o => o.id === id)!;
    }
  }
};
