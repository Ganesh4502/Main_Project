import { apiClient } from './client';
import { User, UserRole } from '../types';
import { MOCK_USERS } from './mockData';

let usersState = [...MOCK_USERS];

export const userApi = {
  getAll: async (role?: UserRole): Promise<User[]> => {
    try {
      const res = await apiClient.get<User[]>('/users', { params: { role } });
      return res.data;
    } catch {
      return role ? usersState.filter(u => u.role === role) : [...usersState];
    }
  },

  getById: async (id: string): Promise<User | undefined> => {
    try {
      const res = await apiClient.get<User>(`/users/${id}`);
      return res.data;
    } catch {
      return usersState.find(u => u.id === id);
    }
  },

  updateStatus: async (id: string, status: User['status']): Promise<User> => {
    try {
      const res = await apiClient.patch<User>(`/users/${id}/status`, { status });
      return res.data;
    } catch {
      usersState = usersState.map(u => u.id === id ? { ...u, status } : u);
      const updated = usersState.find(u => u.id === id)!;
      return updated;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/users/${id}`);
    } catch {
      usersState = usersState.filter(u => u.id !== id);
    }
  }
};
