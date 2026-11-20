import { apiClient } from './client';
import { Tournament, TeamRegistration } from '../types';
import { MOCK_TOURNAMENTS, MOCK_REGISTRATIONS } from './mockData';

let tournamentsState = [...MOCK_TOURNAMENTS];
let registrationsState = [...MOCK_REGISTRATIONS];

export const tournamentApi = {
  getAll: async (filters?: { sport?: string; status?: string; format?: string }): Promise<Tournament[]> => {
    try {
      const res = await apiClient.get<Tournament[]>('/tournaments', { params: filters });
      return res.data;
    } catch {
      let list = [...tournamentsState];
      if (filters?.sport) {
        list = list.filter(t => t.sport.toLowerCase().includes(filters.sport!.toLowerCase()));
      }
      if (filters?.status) {
        list = list.filter(t => t.status === filters.status);
      }
      if (filters?.format) {
        list = list.filter(t => t.format === filters.format);
      }
      return list;
    }
  },

  getById: async (id: string): Promise<Tournament | undefined> => {
    try {
      const res = await apiClient.get<Tournament>(`/tournaments/${id}`);
      return res.data;
    } catch {
      return tournamentsState.find(t => t.id === id);
    }
  },

  create: async (data: Partial<Tournament>): Promise<Tournament> => {
    try {
      const res = await apiClient.post<Tournament>('/tournaments', data);
      return res.data;
    } catch {
      const newTour: Tournament = {
        id: `tour-${Date.now()}`,
        name: data.name || 'New Spotix Tournament',
        sport: data.sport || 'Basketball',
        sportId: data.sportId || 'sport-1',
        bannerUrl: data.bannerUrl || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&auto=format&fit=crop&q=80',
        organizerId: data.organizerId || 'u-organizer',
        organizerName: data.organizerName || 'Marcus Sterling',
        location: data.location || 'San Francisco, CA',
        venue: data.venue || 'Apex Grand Sports Complex',
        arenaId: data.arenaId || 'arena-1',
        startDate: data.startDate || '2026-11-01',
        endDate: data.endDate || '2026-11-10',
        registrationStartDate: data.registrationStartDate || '2026-10-01',
        registrationDeadline: data.registrationDeadline || '2026-10-28',
        maxTeams: data.maxTeams || 16,
        registeredTeamsCount: 1,
        entryFee: data.entryFee || 250,
        prizePool: data.prizePool || '$10,000 + Trophy',
        format: data.format || 'KNOCKOUT',
        status: 'REGISTRATION_OPEN',
        rules: data.rules?.length ? data.rules : ['Official tournament rules apply', 'Mandatory team check-in 30 mins before match'],
        description: data.description || 'Exciting competitive tournament powered by Spotix AI scheduling.',
        scheduleQualityScore: 92,
      };
      tournamentsState.unshift(newTour);
      return newTour;
    }
  },

  updateStatus: async (id: string, status: Tournament['status']): Promise<Tournament> => {
    try {
      const res = await apiClient.patch<Tournament>(`/tournaments/${id}/status`, { status });
      return res.data;
    } catch {
      tournamentsState = tournamentsState.map(t => t.id === id ? { ...t, status } : t);
      return tournamentsState.find(t => t.id === id)!;
    }
  },

  getRegistrations: async (tournamentId: string): Promise<TeamRegistration[]> => {
    try {
      const res = await apiClient.get<TeamRegistration[]>(`/tournaments/${tournamentId}/registrations`);
      return res.data;
    } catch {
      return registrationsState.filter(r => r.tournamentId === tournamentId);
    }
  },

  updateRegistrationStatus: async (regId: string, status: TeamRegistration['status']): Promise<TeamRegistration> => {
    try {
      const res = await apiClient.patch<TeamRegistration>(`/registrations/${regId}/status`, { status });
      return res.data;
    } catch {
      registrationsState = registrationsState.map(r => r.id === regId ? { ...r, status } : r);
      return registrationsState.find(r => r.id === regId)!;
    }
  }
};
