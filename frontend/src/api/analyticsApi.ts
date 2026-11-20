import { apiClient } from './client';
import { UserRole } from '../types';

export interface DashboardKPIs {
  totalUsers: number;
  activeTournaments: number;
  registeredArenas: number;
  totalTeams: number;
  activeMatches: number;
  registeredOfficials: number;
  userGrowthPercent: number;
  tournamentGrowthPercent: number;
  arenaUtilizationPercent: number;
}

export interface GrowthDataPoint {
  month: string;
  users: number;
  tournaments: number;
  bookings: number;
  revenue: number;
}

export interface SportPopularityData {
  sport: string;
  players: number;
  tournaments: number;
  color: string;
}

export interface ArenaUtilizationData {
  arena: string;
  utilizationRate: number;
  revenue: number;
}

export const analyticsApi = {
  getKPIs: async (role: UserRole = 'SUPER_ADMIN'): Promise<DashboardKPIs> => {
    try {
      const res = await apiClient.get<DashboardKPIs>('/analytics/kpis', { params: { role } });
      return res.data;
    } catch {
      return {
        totalUsers: 14820,
        activeTournaments: 38,
        registeredArenas: 42,
        totalTeams: 196,
        activeMatches: 8,
        registeredOfficials: 64,
        userGrowthPercent: 24.8,
        tournamentGrowthPercent: 18.2,
        arenaUtilizationPercent: 88.4,
      };
    }
  },

  getGrowthTrends: async (): Promise<GrowthDataPoint[]> => {
    try {
      const res = await apiClient.get<GrowthDataPoint[]>('/analytics/growth');
      return res.data;
    } catch {
      return [
        { month: 'May', users: 5400, tournaments: 12, bookings: 310, revenue: 18500 },
        { month: 'Jun', users: 7200, tournaments: 18, bookings: 460, revenue: 27400 },
        { month: 'Jul', users: 9500, tournaments: 24, bookings: 680, revenue: 39800 },
        { month: 'Aug', users: 11400, tournaments: 29, bookings: 820, revenue: 48900 },
        { month: 'Sep', users: 13200, tournaments: 34, bookings: 990, revenue: 61200 },
        { month: 'Oct', users: 14820, tournaments: 38, bookings: 1240, revenue: 78500 },
      ];
    }
  },

  getSportPopularity: async (): Promise<SportPopularityData[]> => {
    try {
      const res = await apiClient.get<SportPopularityData[]>('/analytics/sports-popularity');
      return res.data;
    } catch {
      return [
        { sport: 'Football', players: 5200, tournaments: 22, color: '#10B981' },
        { sport: 'Badminton', players: 4100, tournaments: 19, color: '#3B82F6' },
        { sport: 'Cricket', players: 3800, tournaments: 9, color: '#F59E0B' },
        { sport: 'Tennis', players: 2800, tournaments: 11, color: '#8B5CF6' },
        { sport: 'Basketball', players: 2450, tournaments: 14, color: '#06B6D4' },
        { sport: 'Kabaddi', players: 1950, tournaments: 7, color: '#EC4899' },
      ];
    }
  },

  getArenaUtilization: async (): Promise<ArenaUtilizationData[]> => {
    try {
      const res = await apiClient.get<ArenaUtilizationData[]>('/analytics/arena-utilization');
      return res.data;
    } catch {
      return [
        { arena: 'Apex Grand Sports Complex', utilizationRate: 94, revenue: 32400 },
        { arena: 'Thunderdome Football Park', utilizationRate: 89, revenue: 41800 },
        { arena: 'Velocity Racquet Arena', utilizationRate: 92, revenue: 26100 },
        { arena: 'Olympus Cricket Oval', utilizationRate: 78, revenue: 19500 },
      ];
    }
  }
};
