import { apiClient } from './client';
import { AIFixtureParams, AIFixtureResult, AIOfficialRecommendation, Match } from '../types';
import { MOCK_MATCHES, MOCK_OFFICIALS, MOCK_TEAMS } from './mockData';

export const fixtureApi = {
  generateAIFixture: async (params: AIFixtureParams): Promise<AIFixtureResult> => {
    try {
      const res = await apiClient.post<AIFixtureResult>('/ai/fixtures/generate', params);
      return res.data;
    } catch {
      // Simulate realistic AI generation
      const tournamentMatches: Match[] = [
        {
          id: 'ai-m-1',
          tournamentId: params.tournamentId,
          tournamentName: 'Spotix Elite Basketball Championship 2026',
          sport: 'Basketball',
          roundName: 'Quarter Final 1',
          matchNumber: 1,
          teamA: { id: 'team-1', name: 'Cyber Knights', tag: 'CKN', logoUrl: MOCK_TEAMS[0].logoUrl, score: 0, fouls: 0, timeoutsRemaining: 3 },
          teamB: { id: 'team-2', name: 'Titan Vanguard', tag: 'TVG', logoUrl: MOCK_TEAMS[1].logoUrl, score: 0, fouls: 0, timeoutsRemaining: 3 },
          date: '2026-10-12',
          time: '10:00 AM',
          arenaId: params.arenaIds[0] || 'arena-1',
          arenaName: 'Apex Grand Sports Complex',
          court: 'Court A (Main Arena)',
          status: 'SCHEDULED',
          currentPeriod: 'Scheduled',
          periodTimeRemaining: '00:00',
        },
        {
          id: 'ai-m-2',
          tournamentId: params.tournamentId,
          tournamentName: 'Spotix Elite Basketball Championship 2026',
          sport: 'Basketball',
          roundName: 'Quarter Final 2',
          matchNumber: 2,
          teamA: { id: 'team-3', name: 'Velocity Phoenix', tag: 'VPX', logoUrl: MOCK_TEAMS[2].logoUrl, score: 0, fouls: 0, timeoutsRemaining: 3 },
          teamB: { id: 'team-4', name: 'Apex Predators', tag: 'APX', logoUrl: MOCK_TEAMS[3].logoUrl, score: 0, fouls: 0, timeoutsRemaining: 3 },
          date: '2026-10-12',
          time: '01:00 PM',
          arenaId: params.arenaIds[0] || 'arena-1',
          arenaName: 'Apex Grand Sports Complex',
          court: 'Court A (Main Arena)',
          status: 'SCHEDULED',
          currentPeriod: 'Scheduled',
          periodTimeRemaining: '00:00',
        },
        {
          id: 'ai-m-3',
          tournamentId: params.tournamentId,
          tournamentName: 'Spotix Elite Basketball Championship 2026',
          sport: 'Basketball',
          roundName: 'Quarter Final 3',
          matchNumber: 3,
          teamA: { id: 'team-5', name: 'Bay Area Strikers', tag: 'BAS', logoUrl: MOCK_TEAMS[4].logoUrl, score: 0, fouls: 0, timeoutsRemaining: 3 },
          teamB: { id: 'team-6', name: 'Silicon Warriors', tag: 'SWF', logoUrl: MOCK_TEAMS[5].logoUrl, score: 0, fouls: 0, timeoutsRemaining: 3 },
          date: '2026-10-13',
          time: '10:00 AM',
          arenaId: params.arenaIds[0] || 'arena-1',
          arenaName: 'Apex Grand Sports Complex',
          court: 'Court B',
          status: 'SCHEDULED',
          currentPeriod: 'Scheduled',
          periodTimeRemaining: '00:00',
        },
        {
          id: 'ai-m-4',
          tournamentId: params.tournamentId,
          tournamentName: 'Spotix Elite Basketball Championship 2026',
          sport: 'Basketball',
          roundName: 'Semi Final 1',
          matchNumber: 5,
          teamA: { id: 'team-1', name: 'Winner QF 1', tag: 'W1', logoUrl: MOCK_TEAMS[0].logoUrl, score: 0, fouls: 0, timeoutsRemaining: 3 },
          teamB: { id: 'team-3', name: 'Winner QF 2', tag: 'W2', logoUrl: MOCK_TEAMS[2].logoUrl, score: 0, fouls: 0, timeoutsRemaining: 3 },
          date: '2026-10-14',
          time: '04:00 PM',
          arenaId: params.arenaIds[0] || 'arena-1',
          arenaName: 'Apex Grand Sports Complex',
          court: 'Court A (Main Arena)',
          status: 'SCHEDULED',
          currentPeriod: 'Scheduled',
          periodTimeRemaining: '00:00',
        },
      ];

      return {
        scheduleQuality: 92,
        metrics: {
          conflicts: 0,
          arenaConflicts: 0,
          restViolations: 0,
          teamsScheduled: params.teamsCount || 16,
          matchesCount: 32,
          utilizationRate: 94.5,
        },
        matches: tournamentMatches,
        generatedAt: new Date().toISOString(),
      };
    }
  },

  getAIOfficialRecommendations: async (matchId: string): Promise<AIOfficialRecommendation[]> => {
    try {
      const res = await apiClient.get<AIOfficialRecommendation[]>(`/ai/matches/${matchId}/officials`);
      return res.data;
    } catch {
      return [
        {
          officialId: 'off-1',
          officialName: 'Rahul Kumar',
          officialAvatar: MOCK_OFFICIALS[0].avatarUrl,
          suitabilityScore: 94,
          metrics: {
            sportExpertise: 98,
            experienceScore: 90,
            availability: 100,
            workloadScore: 88,
            conflictRisk: 'Low',
          },
          explanation: 'Highest rating in Basketball officiating with 100% schedule compatibility and low fatigue rating.',
        },
        {
          officialId: 'off-3',
          officialName: 'Michael Chang',
          officialAvatar: MOCK_OFFICIALS[2].avatarUrl,
          suitabilityScore: 88,
          metrics: {
            sportExpertise: 85,
            experienceScore: 88,
            availability: 95,
            workloadScore: 92,
            conflictRisk: 'Low',
          },
          explanation: 'Excellent availability and proven tournament arbitration track record.',
        },
      ];
    }
  },

  getByTournament: async (tournamentId: string): Promise<Match[]> => {
    try {
      const res = await apiClient.get<Match[]>(`/tournaments/${tournamentId}/fixtures`);
      return res.data;
    } catch {
      return MOCK_MATCHES;
    }
  }
};
