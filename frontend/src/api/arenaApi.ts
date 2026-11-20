import { apiClient } from './client';
import { Arena, ArenaSlot } from '../types';
import { MOCK_ARENAS, MOCK_ARENA_SLOTS } from './mockData';

let arenasState = [...MOCK_ARENAS];
let slotsState = [...MOCK_ARENA_SLOTS];

export const arenaApi = {
  getAll: async (filters?: { sport?: string; city?: string; isIndoor?: boolean; minPrice?: number; maxPrice?: number }): Promise<Arena[]> => {
    try {
      const res = await apiClient.get<Arena[]>('/arenas', { params: filters });
      return res.data;
    } catch {
      let filtered = [...arenasState];
      if (filters?.sport) {
        filtered = filtered.filter(a => a.sports.some(s => s.toLowerCase().includes(filters.sport!.toLowerCase())));
      }
      if (filters?.city) {
        filtered = filtered.filter(a => a.city.toLowerCase().includes(filters.city!.toLowerCase()));
      }
      if (filters?.isIndoor !== undefined) {
        filtered = filtered.filter(a => a.isIndoor === filters.isIndoor);
      }
      return filtered;
    }
  },

  getById: async (id: string): Promise<Arena | undefined> => {
    try {
      const res = await apiClient.get<Arena>(`/arenas/${id}`);
      return res.data;
    } catch {
      return arenasState.find(a => a.id === id);
    }
  },

  create: async (data: Partial<Arena>): Promise<Arena> => {
    try {
      const res = await apiClient.post<Arena>('/arenas', data);
      return res.data;
    } catch {
      const newArena: Arena = {
        id: `arena-${Date.now()}`,
        name: data.name || 'New Arena',
        location: data.location || 'San Francisco, CA',
        city: data.city || 'San Francisco, CA',
        address: data.address || '100 Sports Blvd',
        rating: 4.8,
        reviewCount: 1,
        sports: data.sports || ['Basketball'],
        hourlyRate: data.hourlyRate || 80,
        capacity: data.capacity || 1000,
        isIndoor: data.isIndoor ?? true,
        facilities: data.facilities || ['Locker Rooms', 'LED Lighting', 'Parking'],
        images: data.images?.length ? data.images : ['https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1000&auto=format&fit=crop&q=80'],
        description: data.description || '',
        operatingHours: data.operatingHours || { open: '07:00 AM', close: '10:00 PM', days: 'Mon - Sun' },
        managerId: data.managerId || 'u-arena',
        managerName: data.managerName || 'David Chen',
        contactPhone: data.contactPhone || '+1 (555) 000-0000',
        contactEmail: data.contactEmail || 'info@arena.com',
        courtsCount: data.courtsCount || 4,
        status: 'ACTIVE',
      };
      arenasState.push(newArena);
      return newArena;
    }
  },

  getSlots: async (arenaId: string, date?: string): Promise<ArenaSlot[]> => {
    try {
      const res = await apiClient.get<ArenaSlot[]>(`/arenas/${arenaId}/slots`, { params: { date } });
      return res.data;
    } catch {
      return slotsState.filter(s => s.arenaId === arenaId && (!date || s.date === date));
    }
  },

  updateSlotStatus: async (slotId: string, status: ArenaSlot['status'], purpose?: string): Promise<ArenaSlot> => {
    try {
      const res = await apiClient.patch<ArenaSlot>(`/slots/${slotId}/status`, { status, purpose });
      return res.data;
    } catch {
      slotsState = slotsState.map(s => s.id === slotId ? { ...s, status, purpose: purpose || s.purpose } : s);
      return slotsState.find(s => s.id === slotId)!;
    }
  },

  createSlot: async (slotData: Partial<ArenaSlot>): Promise<ArenaSlot> => {
    try {
      const res = await apiClient.post<ArenaSlot>('/slots', slotData);
      return res.data;
    } catch {
      const newSlot: ArenaSlot = {
        id: `slot-${Date.now()}`,
        arenaId: slotData.arenaId || 'arena-1',
        arenaName: slotData.arenaName || 'Apex Grand Sports Complex',
        courtName: slotData.courtName || 'Court A',
        date: slotData.date || '2026-10-07',
        startTime: slotData.startTime || '10:00 AM',
        endTime: slotData.endTime || '12:00 PM',
        price: slotData.price || 100,
        status: slotData.status || 'AVAILABLE',
        purpose: slotData.purpose,
      };
      slotsState.push(newSlot);
      return newSlot;
    }
  }
};
