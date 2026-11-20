import { apiClient } from './client';
import { NotificationItem } from '../types';
import { MOCK_NOTIFICATIONS } from './mockData';

let notificationsState = [...MOCK_NOTIFICATIONS];

export const notificationApi = {
  getAll: async (): Promise<NotificationItem[]> => {
    try {
      const res = await apiClient.get<NotificationItem[]>('/notifications');
      return res.data;
    } catch {
      return [...notificationsState];
    }
  },

  markAsRead: async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/notifications/${id}/read`);
    } catch {
      notificationsState = notificationsState.map(n => n.id === id ? { ...n, isRead: true } : n);
    }
  },

  markAllAsRead: async (): Promise<void> => {
    try {
      await apiClient.post('/notifications/read-all');
    } catch {
      notificationsState = notificationsState.map(n => ({ ...n, isRead: true }));
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/notifications/${id}`);
    } catch {
      notificationsState = notificationsState.filter(n => n.id !== id);
    }
  }
};
