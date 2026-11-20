import { UserRole } from '../types';

export const ROLE_DASHBOARDS: Record<UserRole, string> = {
  SUPER_ADMIN: '/admin/dashboard',
  SPONSOR: '/sponsor/dashboard',
  ORGANIZER: '/organizer/dashboard',
  ARENA_MANAGER: '/arena/dashboard',
  TEAM_MANAGER: '/team/dashboard',
  PLAYER: '/player/dashboard',
  OFFICIAL: '/official/dashboard',
  SPECTATOR: '/spectator',
};

export const roleRedirects = ROLE_DASHBOARDS;

export const getDefaultDashboardForRole = (role: UserRole): string => {
  return ROLE_DASHBOARDS[role] || '/spectator';
};

export type Permission =
  | 'manage:users'
  | 'manage:roles'
  | 'manage:sports'
  | 'appoint:officials'
  | 'create:tournaments'
  | 'manage:tournaments'
  | 'generate:ai_fixtures'
  | 'manage:matches'
  | 'score:matches'
  | 'manage:arenas'
  | 'manage:slots'
  | 'manage:bookings'
  | 'manage:team'
  | 'manage:players'
  | 'view:analytics'
  | 'view:live_matches';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    'manage:users',
    'manage:roles',
    'manage:sports',
    'appoint:officials',
    'create:tournaments',
    'manage:tournaments',
    'generate:ai_fixtures',
    'manage:matches',
    'manage:arenas',
    'manage:slots',
    'manage:bookings',
    'manage:team',
    'manage:players',
    'view:analytics',
    'view:live_matches',
  ],
  SPONSOR: [
    'appoint:officials',
    'view:analytics',
    'view:live_matches',
  ],
  ORGANIZER: [
    'create:tournaments',
    'manage:tournaments',
    'generate:ai_fixtures',
    'manage:matches',
    'view:analytics',
    'view:live_matches',
  ],
  ARENA_MANAGER: [
    'manage:arenas',
    'manage:slots',
    'manage:bookings',
    'view:analytics',
    'view:live_matches',
  ],
  TEAM_MANAGER: [
    'manage:team',
    'manage:players',
    'view:live_matches',
  ],
  PLAYER: [
    'manage:players',
    'view:live_matches',
  ],
  OFFICIAL: [
    'score:matches',
    'manage:matches',
    'view:live_matches',
  ],
  SPECTATOR: [
    'view:live_matches',
  ],
};

export const rolePermissions = ROLE_PERMISSIONS;

export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
};

export const ALLOWED_SELF_REGISTRATION_ROLES: UserRole[] = [
  'ORGANIZER',
  'ARENA_MANAGER',
  'TEAM_MANAGER',
  'PLAYER',
  'SPECTATOR'
];

export const isSelfRegistrationAllowed = (role: UserRole): boolean => {
  return ALLOWED_SELF_REGISTRATION_ROLES.includes(role);
};

