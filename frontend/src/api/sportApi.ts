import { apiClient } from './client';
import { Sport } from '../types';
import { MOCK_SPORTS } from './mockData';

let sportsState = [...MOCK_SPORTS];

export const sportApi = {
  getAll: async (): Promise<Sport[]> => {
    try {
      const res = await apiClient.get<Sport[]>('/sports');
      return res.data;
    } catch {
      return [...sportsState];
    }
  },

  getById: async (id: string): Promise<Sport | undefined> => {
    try {
      const res = await apiClient.get<Sport>(`/sports/${id}`);
      return res.data;
    } catch {
      return sportsState.find(s => s.id === id || s.slug === id);
    }
  },

  create: async (sportData: Partial<Sport>): Promise<Sport> => {
    try {
      const res = await apiClient.post<Sport>('/sports', sportData);
      return res.data;
    } catch {
      const newSport: Sport = {
        id: `sport-${Date.now()}`,
        name: sportData.name || 'New Sport',
        slug: (sportData.name || 'new-sport').toLowerCase().replace(/\s+/g, '-'),
        category: sportData.category || 'Team',
        icon: sportData.icon || 'Flame',
        description: sportData.description || '',
        minPlayers: sportData.minPlayers || 2,
        maxPlayers: sportData.maxPlayers || 10,
        officialsRequired: sportData.officialsRequired || 2,
        rules: sportData.rules || ['Standard rules apply'],
        imageUrl: sportData.imageUrl || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80',
        popularArenasCount: 5,
        upcomingTournamentsCount: 2,
        activePlayersCount: 150,
        isActive: true,
      };
      sportsState.push(newSport);
      return newSport;
    }
  },

  update: async (id: string, updates: Partial<Sport>): Promise<Sport> => {
    try {
      const res = await apiClient.put<Sport>(`/sports/${id}`, updates);
      return res.data;
    } catch {
      sportsState = sportsState.map(s => s.id === id ? { ...s, ...updates } : s);
      return sportsState.find(s => s.id === id)!;
    }
  },

  toggleActive: async (id: string): Promise<Sport> => {
    try {
      const res = await apiClient.patch<Sport>(`/sports/${id}/toggle`);
      return res.data;
    } catch {
      sportsState = sportsState.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s);
      return sportsState.find(s => s.id === id)!;
    }
  }
};
