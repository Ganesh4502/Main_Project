import { apiClient } from './client';
import { Booking } from '../types';
import { MOCK_BOOKINGS } from './mockData';

let bookingsState = [...MOCK_BOOKINGS];

export const bookingApi = {
  getAll: async (userId?: string, arenaId?: string): Promise<Booking[]> => {
    try {
      const res = await apiClient.get<Booking[]>('/bookings', { params: { userId, arenaId } });
      return res.data;
    } catch {
      let list = [...bookingsState];
      if (userId) list = list.filter(b => b.userId === userId);
      if (arenaId) list = list.filter(b => b.arenaId === arenaId);
      return list;
    }
  },

  getById: async (id: string): Promise<Booking | undefined> => {
    try {
      const res = await apiClient.get<Booking>(`/bookings/${id}`);
      return res.data;
    } catch {
      return bookingsState.find(b => b.id === id);
    }
  },

  create: async (data: Partial<Booking>): Promise<Booking> => {
    try {
      const res = await apiClient.post<Booking>('/bookings', data);
      return res.data;
    } catch {
      const newBooking: Booking = {
        id: `book-${Date.now()}`,
        bookingNumber: `SPX-BK-${Math.floor(1000 + Math.random() * 9000)}`,
        arenaId: data.arenaId || 'arena-1',
        arenaName: data.arenaName || 'Apex Grand Sports Complex',
        courtName: data.courtName || 'Court A (Main Arena)',
        userId: data.userId || 'u-team',
        userName: data.userName || 'Samantha Ray',
        userEmail: data.userEmail || 'manager@cyberknights.com',
        sport: data.sport || 'Basketball',
        date: data.date || '2026-10-12',
        startTime: data.startTime || '02:00 PM',
        endTime: data.endTime || '04:00 PM',
        totalAmount: data.totalAmount || 150,
        purpose: data.purpose || 'Casual Play',
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        paymentStatus: 'PAID',
      };
      bookingsState.unshift(newBooking);
      return newBooking;
    }
  },

  updateStatus: async (id: string, status: Booking['status']): Promise<Booking> => {
    try {
      const res = await apiClient.patch<Booking>(`/bookings/${id}/status`, { status });
      return res.data;
    } catch {
      bookingsState = bookingsState.map(b => b.id === id ? { ...b, status } : b);
      return bookingsState.find(b => b.id === id)!;
    }
  }
};
