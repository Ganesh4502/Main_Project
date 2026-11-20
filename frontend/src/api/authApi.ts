import { apiClient } from './client';
import { User, UserRole } from '../types';
import { MOCK_USERS } from './mockData';
import { isSelfRegistrationAllowed } from '../utils/rbac';

export interface LoginRequest {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password?: string;
  role: 'ORGANIZER' | 'ARENA_MANAGER' | 'TEAM_MANAGER' | 'PLAYER' | 'SPECTATOR';
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

// Credentials dictionary for standalone frontend mock mode
export const MOCK_CREDENTIALS: Record<string, { role: UserRole; passwordHint: string }> = {
  'admin@spotix.io': { role: 'SUPER_ADMIN', passwordHint: 'SpotixAdmin2026!' },
  'sponsor@redbullsports.com': { role: 'SPONSOR', passwordHint: 'SpotixSponsor2026!' },
  'organizer@spotix.io': { role: 'ORGANIZER', passwordHint: 'SpotixOrganizer2026!' },
  'arena@apexcomplex.com': { role: 'ARENA_MANAGER', passwordHint: 'SpotixArena2026!' },
  'manager@cyberknights.com': { role: 'TEAM_MANAGER', passwordHint: 'SpotixTeam2026!' },
  'player@spotix.io': { role: 'PLAYER', passwordHint: 'SpotixPlayer2026!' },
  'official@spotix.io': { role: 'OFFICIAL', passwordHint: 'SpotixOfficial2026!' },
  'spectator@spotix.io': { role: 'SPECTATOR', passwordHint: 'SpotixSpectator2026!' },
};

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const res = await apiClient.post<AuthResponse>('/auth/login', credentials);
      if (res.data && res.data.token) {
        localStorage.setItem('spotix_token', res.data.token);
        localStorage.setItem('spotix_user_session', JSON.stringify(res.data.user));
      }
      return res.data;
    } catch {
      // Standalone frontend execution fallback
      const emailKey = credentials.email.trim().toLowerCase();
      const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === emailKey);

      if (!foundUser) {
        throw new Error('Invalid email or password. Please check your registered credentials.');
      }

      // Generate simulated session JWT
      const token = `spotix_mock_jwt_${foundUser.role}_${Date.now()}`;
      const authData: AuthResponse = {
        token,
        refreshToken: `spotix_mock_refresh_${foundUser.role}_${Date.now()}`,
        user: {
          ...foundUser,
          lastLoginAt: new Date().toISOString()
        }
      };

      localStorage.setItem('spotix_token', token);
      localStorage.setItem('spotix_user_session', JSON.stringify(authData.user));
      return authData;
    }
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    // Enforce role restriction on registration
    if (!isSelfRegistrationAllowed(data.role as UserRole)) {
      throw new Error('Public registration for privileged role is not permitted.');
    }

    try {
      const res = await apiClient.post<AuthResponse>('/auth/register', data);
      if (res.data && res.data.token) {
        localStorage.setItem('spotix_token', res.data.token);
        localStorage.setItem('spotix_user_session', JSON.stringify(res.data.user));
      }
      return res.data;
    } catch {
      const newUser: User = {
        id: `u-${Date.now()}`,
        name: `${data.firstName} ${data.lastName}`,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        role: data.role as UserRole,
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
      const token = `spotix_mock_jwt_${newUser.role}_${Date.now()}`;
      const authData: AuthResponse = {
        token,
        user: newUser
      };

      localStorage.setItem('spotix_token', token);
      localStorage.setItem('spotix_user_session', JSON.stringify(newUser));
      return authData;
    }
  },

  getCurrentUser: async (): Promise<User | null> => {
    const token = localStorage.getItem('spotix_token');
    if (!token) return null;

    try {
      const res = await apiClient.get<User>('/auth/me');
      return res.data;
    } catch {
      const saved = localStorage.getItem('spotix_user_session');
      if (saved) {
        try {
          return JSON.parse(saved) as User;
        } catch {
          return null;
        }
      }
      return null;
    }
  },

  refreshToken: async (): Promise<string | null> => {
    try {
      const res = await apiClient.post<{ token: string }>('/auth/refresh');
      if (res.data?.token) {
        localStorage.setItem('spotix_token', res.data.token);
        return res.data.token;
      }
      return null;
    } catch {
      return localStorage.getItem('spotix_token');
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignored for standalone mode
    } finally {
      localStorage.removeItem('spotix_token');
      localStorage.removeItem('spotix_user_session');
      localStorage.removeItem('spotix_current_role');
    }
  }
};

