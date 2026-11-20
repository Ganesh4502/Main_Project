import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Match, MatchEvent } from '../types';
import { matchApi } from '../api/matchApi';
import { MOCK_MATCHES } from '../api/mockData';

interface HistorySnapshot {
  match: Match;
  description: string;
}

interface LiveMatchContextType {
  activeMatch: Match;
  isClockRunning: boolean;
  scoreTeamA: (points: number, scorerName?: string) => void;
  scoreTeamB: (points: number, scorerName?: string) => void;
  recordFoul: (team: 'A' | 'B', playerName?: string) => void;
  recordTimeout: (team: 'A' | 'B') => void;
  recordCustomEvent: (type: MatchEvent['type'], description: string, team?: 'A' | 'B', points?: number) => void;
  undoLastAction: () => boolean;
  toggleClock: () => void;
  endPeriod: () => void;
  completeMatch: (winnerTeamId?: string) => void;
  canUndo: boolean;
  historyLength: number;
}

const LiveMatchContext = createContext<LiveMatchContextType | undefined>(undefined);

export const LiveMatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeMatch, setActiveMatch] = useState<Match>(() => MOCK_MATCHES[0]);
  const [isClockRunning, setIsClockRunning] = useState<boolean>(true);
  const [history, setHistory] = useState<HistorySnapshot[]>([]);
  const clockIntervalRef = useRef<any>(null);

  // Initialize from API
  useEffect(() => {
    matchApi.getById('m-live-1').then(m => {
      if (m) setActiveMatch(m);
    });
  }, []);

  // Live timer tick simulation
  useEffect(() => {
    if (isClockRunning && activeMatch.status === 'LIVE') {
      clockIntervalRef.current = setInterval(() => {
        setActiveMatch(prev => {
          const parts = (prev.periodTimeRemaining || '07:42').split(':');
          let mins = parseInt(parts[0] || '0', 10);
          let secs = parseInt(parts[1] || '0', 10);

          if (secs === 0) {
            if (mins === 0) return prev;
            mins -= 1;
            secs = 59;
          } else {
            secs -= 1;
          }

          const newTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
          return { ...prev, periodTimeRemaining: newTime };
        });
      }, 1000);
    } else {
      if (clockIntervalRef.current) clearInterval(clockIntervalRef.current);
    }

    return () => {
      if (clockIntervalRef.current) clearInterval(clockIntervalRef.current);
    };
  }, [isClockRunning, activeMatch.status]);

  const saveHistory = (match: Match, description: string) => {
    setHistory(prev => [...prev.slice(-15), { match: JSON.parse(JSON.stringify(match)), description }]);
  };

  const scoreTeamA = (points: number, scorerName = 'Player A') => {
    saveHistory(activeMatch, `Score +${points} for ${activeMatch.teamA.name}`);
    const newEvent: MatchEvent = {
      id: `ev-${Date.now()}`,
      matchId: activeMatch.id,
      timestamp: new Date().toISOString(),
      gameTime: activeMatch.periodTimeRemaining,
      type: 'SCORE',
      teamId: activeMatch.teamA.id,
      teamName: activeMatch.teamA.name,
      points,
      description: `${scorerName} scores +${points} pts (${activeMatch.teamA.name})`,
    };

    setActiveMatch(prev => ({
      ...prev,
      teamA: { ...prev.teamA, score: prev.teamA.score + points },
      events: [newEvent, ...(prev.events || [])],
    }));
  };

  const scoreTeamB = (points: number, scorerName = 'Player B') => {
    saveHistory(activeMatch, `Score +${points} for ${activeMatch.teamB.name}`);
    const newEvent: MatchEvent = {
      id: `ev-${Date.now()}`,
      matchId: activeMatch.id,
      timestamp: new Date().toISOString(),
      gameTime: activeMatch.periodTimeRemaining,
      type: 'SCORE',
      teamId: activeMatch.teamB.id,
      teamName: activeMatch.teamB.name,
      points,
      description: `${scorerName} scores +${points} pts (${activeMatch.teamB.name})`,
    };

    setActiveMatch(prev => ({
      ...prev,
      teamB: { ...prev.teamB, score: prev.teamB.score + points },
      events: [newEvent, ...(prev.events || [])],
    }));
  };

  const recordFoul = (team: 'A' | 'B', playerName = 'Player') => {
    const isTeamA = team === 'A';
    const targetTeam = isTeamA ? activeMatch.teamA : activeMatch.teamB;
    saveHistory(activeMatch, `Foul on ${targetTeam.name}`);

    const newEvent: MatchEvent = {
      id: `ev-${Date.now()}`,
      matchId: activeMatch.id,
      timestamp: new Date().toISOString(),
      gameTime: activeMatch.periodTimeRemaining,
      type: 'FOUL',
      teamId: targetTeam.id,
      teamName: targetTeam.name,
      description: `Personal foul on ${playerName} (${targetTeam.name})`,
    };

    setActiveMatch(prev => ({
      ...prev,
      teamA: isTeamA ? { ...prev.teamA, fouls: prev.teamA.fouls + 1 } : prev.teamA,
      teamB: !isTeamA ? { ...prev.teamB, fouls: prev.teamB.fouls + 1 } : prev.teamB,
      events: [newEvent, ...(prev.events || [])],
    }));
  };

  const recordTimeout = (team: 'A' | 'B') => {
    const isTeamA = team === 'A';
    const targetTeam = isTeamA ? activeMatch.teamA : activeMatch.teamB;
    saveHistory(activeMatch, `Timeout called by ${targetTeam.name}`);

    const newEvent: MatchEvent = {
      id: `ev-${Date.now()}`,
      matchId: activeMatch.id,
      timestamp: new Date().toISOString(),
      gameTime: activeMatch.periodTimeRemaining,
      type: 'TIMEOUT',
      teamId: targetTeam.id,
      teamName: targetTeam.name,
      description: `Official 60s Timeout granted to ${targetTeam.name}`,
    };

    setActiveMatch(prev => ({
      ...prev,
      teamA: isTeamA ? { ...prev.teamA, timeoutsRemaining: Math.max(0, prev.teamA.timeoutsRemaining - 1) } : prev.teamA,
      teamB: !isTeamA ? { ...prev.teamB, timeoutsRemaining: Math.max(0, prev.teamB.timeoutsRemaining - 1) } : prev.teamB,
      events: [newEvent, ...(prev.events || [])],
    }));
  };

  const recordCustomEvent = (type: MatchEvent['type'], description: string, team?: 'A' | 'B', points?: number) => {
    saveHistory(activeMatch, description);
    const isTeamA = team === 'A';
    const targetTeam = team ? (isTeamA ? activeMatch.teamA : activeMatch.teamB) : undefined;

    const newEvent: MatchEvent = {
      id: `ev-${Date.now()}`,
      matchId: activeMatch.id,
      timestamp: new Date().toISOString(),
      gameTime: activeMatch.periodTimeRemaining,
      type,
      teamId: targetTeam?.id,
      teamName: targetTeam?.name,
      points,
      description,
    };

    setActiveMatch(prev => ({
      ...prev,
      events: [newEvent, ...(prev.events || [])],
    }));
  };

  const undoLastAction = (): boolean => {
    if (history.length === 0) return false;
    const lastSnapshot = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setActiveMatch(lastSnapshot.match);
    return true;
  };

  const toggleClock = () => {
    setIsClockRunning(prev => !prev);
  };

  const endPeriod = () => {
    saveHistory(activeMatch, 'End Period');
    const newEvent: MatchEvent = {
      id: `ev-${Date.now()}`,
      matchId: activeMatch.id,
      timestamp: new Date().toISOString(),
      gameTime: '00:00',
      type: 'PERIOD_END',
      description: `End of ${activeMatch.currentPeriod}`,
    };

    setActiveMatch(prev => ({
      ...prev,
      currentPeriod: prev.currentPeriod.includes('Quarter 3') ? 'Quarter 4' : 'Overtime',
      periodTimeRemaining: '10:00',
      events: [newEvent, ...(prev.events || [])],
    }));
  };

  const completeMatch = (winnerTeamId?: string) => {
    saveHistory(activeMatch, 'Complete Match');
    const winnerId = winnerTeamId || (activeMatch.teamA.score >= activeMatch.teamB.score ? activeMatch.teamA.id : activeMatch.teamB.id);
    const winnerName = winnerId === activeMatch.teamA.id ? activeMatch.teamA.name : activeMatch.teamB.name;

    const newEvent: MatchEvent = {
      id: `ev-${Date.now()}`,
      matchId: activeMatch.id,
      timestamp: new Date().toISOString(),
      gameTime: '00:00',
      type: 'MATCH_END',
      description: `Final Buzzer! Match Won by ${winnerName} (${activeMatch.teamA.score} - ${activeMatch.teamB.score})`,
    };

    setActiveMatch(prev => ({
      ...prev,
      status: 'COMPLETED',
      winnerTeamId: winnerId,
      currentPeriod: 'Full Time',
      events: [newEvent, ...(prev.events || [])],
    }));
    setIsClockRunning(false);
  };

  return (
    <LiveMatchContext.Provider
      value={{
        activeMatch,
        isClockRunning,
        scoreTeamA,
        scoreTeamB,
        recordFoul,
        recordTimeout,
        recordCustomEvent,
        undoLastAction,
        toggleClock,
        endPeriod,
        completeMatch,
        canUndo: history.length > 0,
        historyLength: history.length,
      }}
    >
      {children}
    </LiveMatchContext.Provider>
  );
};

export const useLiveMatch = () => {
  const context = useContext(LiveMatchContext);
  if (!context) {
    throw new Error('useLiveMatch must be used within a LiveMatchProvider');
  }
  return context;
};
