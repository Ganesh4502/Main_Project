export type UserRole =
  | 'SUPER_ADMIN'
  | 'SPONSOR'
  | 'ORGANIZER'
  | 'ARENA_MANAGER'
  | 'TEAM_MANAGER'
  | 'PLAYER'
  | 'OFFICIAL'
  | 'SPECTATOR';

export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
  createdAt: string;
  lastLoginAt: string;
  organization?: string;
}

export interface Sport {
  id: string;
  name: string;
  slug: string;
  category: 'Team' | 'Racquet' | 'Combat' | 'Athletics' | 'Individual';
  icon: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  officialsRequired: number;
  rules: string[];
  imageUrl: string;
  popularArenasCount: number;
  upcomingTournamentsCount: number;
  activePlayersCount: number;
  isActive: boolean;
}

export interface Arena {
  id: string;
  name: string;
  location: string;
  city: string;
  address: string;
  rating: number;
  reviewCount: number;
  sports: string[];
  hourlyRate: number;
  capacity: number;
  isIndoor: boolean;
  facilities: string[];
  images: string[];
  description: string;
  operatingHours: {
    open: string;
    close: string;
    days: string;
  };
  managerId: string;
  managerName: string;
  contactPhone: string;
  contactEmail: string;
  courtsCount: number;
  status: 'ACTIVE' | 'MAINTENANCE' | 'INACTIVE';
}

export type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'TOURNAMENT' | 'MAINTENANCE' | 'BLOCKED';

export interface ArenaSlot {
  id: string;
  arenaId: string;
  arenaName: string;
  courtName: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  status: SlotStatus;
  bookedBy?: string;
  purpose?: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  arenaId: string;
  arenaName: string;
  courtName: string;
  userId: string;
  userName: string;
  userEmail: string;
  sport: string;
  date: string;
  startTime: string;
  endTime: string;
  totalAmount: number;
  purpose: 'Casual Play' | 'Tournament Practice' | 'Official Match' | 'Coaching Session' | 'Tournament Fixture';
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED';
  createdAt: string;
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
}

export type TournamentFormat = 'KNOCKOUT' | 'LEAGUE' | 'ROUND_ROBIN' | 'GROUP_STAGE';
export type TournamentStatus = 'DRAFT' | 'REGISTRATION_OPEN' | 'REGISTRATION_CLOSED' | 'PUBLISHED' | 'LIVE' | 'COMPLETED' | 'CANCELLED';

export interface Tournament {
  id: string;
  name: string;
  sport: string;
  sportId: string;
  bannerUrl: string;
  organizerId: string;
  organizerName: string;
  organizerAvatar?: string;
  location: string;
  venue: string;
  arenaId?: string;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  registrationDeadline: string;
  maxTeams: number;
  registeredTeamsCount: number;
  entryFee: number;
  prizePool: string;
  format: TournamentFormat;
  status: TournamentStatus;
  rules: string[];
  description: string;
  scheduleQualityScore?: number;
  sponsorName?: string;
  sponsorLogo?: string;
}

export interface TeamRegistration {
  id: string;
  tournamentId: string;
  tournamentName: string;
  teamId: string;
  teamName: string;
  teamLogo?: string;
  managerName: string;
  managerContact: string;
  appliedDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'WITHDRAWN';
  paymentStatus: 'PAID' | 'PENDING';
  playersCount: number;
}

export interface Team {
  id: string;
  name: string;
  tag: string;
  logoUrl: string;
  sport: string;
  sportId: string;
  managerId: string;
  managerName: string;
  managerEmail: string;
  coachName: string;
  foundedYear: number;
  city: string;
  playerCount: number;
  stats: {
    matches: number;
    wins: number;
    losses: number;
    draws: number;
    points: number;
    winRate: number;
  };
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
}

export interface Player {
  id: string;
  teamId: string;
  teamName: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  jerseyNumber: number;
  avatarUrl: string;
  height: string;
  weight: string;
  dateOfBirth: string;
  status: 'ACTIVE' | 'INJURED' | 'SUSPENDED';
  stats: {
    matches: number;
    pointsOrGoals: number;
    assists: number;
    fouls: number;
    mvpAwards: number;
    performanceRating: number;
  };
}

export interface Official {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  sportSpecializations: string[];
  experienceYears: number;
  certificationLevel: 'National' | 'International' | 'State' | 'Associate';
  certificationName: string;
  rating: number;
  workloadScore: number; // percentage 0-100%
  matchesOfficiated: number;
  availabilityStatus: 'AVAILABLE' | 'UNAVAILABLE' | 'PARTIALLY_AVAILABLE' | 'ON_DUTY';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING_VERIFICATION';
  assignedBy?: 'Super Admin' | 'Sponsor';
  suitabilityScore?: number;
}

export type MatchStatus = 'SCHEDULED' | 'READY' | 'LIVE' | 'COMPLETED' | 'POSTPONED' | 'CANCELLED';

export interface MatchScoreTeam {
  id: string;
  name: string;
  tag: string;
  logoUrl: string;
  score: number;
  fouls: number;
  timeoutsRemaining: number;
  periodScores?: number[];
}

export interface Match {
  id: string;
  tournamentId: string;
  tournamentName: string;
  sport: string;
  roundName: string;
  matchNumber: number;
  teamA: MatchScoreTeam;
  teamB: MatchScoreTeam;
  date: string;
  time: string;
  arenaId: string;
  arenaName: string;
  court: string;
  status: MatchStatus;
  currentPeriod: string; // e.g. "Q3 07:42", "2nd Half 68'", "Set 2"
  periodTimeRemaining: string; // e.g. "07:42"
  official?: {
    id: string;
    name: string;
    role: string;
    suitabilityScore?: number;
  };
  winnerTeamId?: string;
  events?: MatchEvent[];
}

export interface MatchEvent {
  id: string;
  matchId: string;
  timestamp: string;
  gameTime: string;
  type: 'SCORE' | 'FOUL' | 'TIMEOUT' | 'PERIOD_START' | 'PERIOD_END' | 'SUBSTITUTION' | 'CARD' | 'MATCH_END';
  teamId?: string;
  teamName?: string;
  playerId?: string;
  playerName?: string;
  points?: number;
  description: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  category: 'TOURNAMENT' | 'MATCH' | 'BOOKING' | 'TEAM' | 'OFFICIAL' | 'SYSTEM';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface AIFixtureParams {
  tournamentId: string;
  teamsCount: number;
  format: TournamentFormat;
  arenaIds: string[];
  startDate: string;
  endDate: string;
  matchDurationMinutes: number;
  restDurationMinutes: number;
  avoidConsecutiveMatches: boolean;
  balanceWeekendSlots: boolean;
}

export interface AIFixtureResult {
  scheduleQuality: number;
  metrics: {
    conflicts: number;
    arenaConflicts: number;
    restViolations: number;
    teamsScheduled: number;
    matchesCount: number;
    utilizationRate: number;
  };
  matches: Match[];
  generatedAt: string;
}

export interface AIOfficialRecommendation {
  officialId: string;
  officialName: string;
  officialAvatar: string;
  suitabilityScore: number;
  metrics: {
    sportExpertise: number;
    experienceScore: number;
    availability: number;
    workloadScore: number;
    conflictRisk: 'Low' | 'Medium' | 'High';
  };
  explanation: string;
}

export interface StandingRow {
  position: number;
  teamId: string;
  teamName: string;
  teamLogo: string;
  played: number;
  won: number;
  lost: number;
  drawn: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'L' | 'D')[];
}
