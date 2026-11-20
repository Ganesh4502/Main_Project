import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Play,
  Pause,
  Clock,
  MapPin,
  Shield,
  Activity,
  UserCheck,
  Flame,
  Radio,
  Share2,
  Heart,
  Volume2,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  RotateCcw
} from 'lucide-react';
import { useLiveMatch } from '../../context/LiveMatchContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useNotification } from '../../context/NotificationContext';

export const LiveMatchCenterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    activeMatch,
    isClockRunning,
    toggleClock,
    scoreTeamA,
    scoreTeamB
  } = useLiveMatch();

  const [isFollowing, setIsFollowing] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'Alex (Cyber Knights Fan)', text: 'What a 3-pointer by Rivera! Unbelievable shooting stretch!', time: '10:12' },
    { id: 2, user: 'Coach Dave', text: 'Titan Vanguard needs to tighten their perimeter rotation after this timeout.', time: '10:14' },
    { id: 3, user: 'Sports Desk Live', text: 'Quarter 3 pace has increased by 18% compared to first half.', time: '10:16' },
  ]);

  const { showToast } = useNotification();

  const handleFollowToggle = () => {
    setIsFollowing(prev => !prev);
    showToast(
      !isFollowing ? 'success' : 'info',
      !isFollowing ? 'Match Followed!' : 'Unfollowed',
      !isFollowing ? 'You will receive instant score notifications for every basket & foul.' : 'Notifications disabled for this match.'
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments(prev => [
      { id: Date.now(), user: 'Spectator Fan', text: commentInput.trim(), time: activeMatch.periodTimeRemaining },
      ...prev,
    ]);
    setCommentInput('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Back Link & Header Controls */}
      <div className="flex items-center justify-between">
        <Link to="/tournaments" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tournaments Hub
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant={isFollowing ? 'success' : 'outline'}
            size="sm"
            onClick={handleFollowToggle}
            leftIcon={<Heart className={`w-3.5 h-3.5 ${isFollowing ? 'fill-current' : ''}`} />}
          >
            {isFollowing ? 'Following Match' : 'Follow Match'}
          </Button>

          <Link to={`/official/matches/${activeMatch.id}/control`}>
            <Button variant="primary" size="sm" className="bg-blue-600 hover:bg-blue-500 text-xs">
              Official Scoring Pad
            </Button>
          </Link>
        </div>
      </div>

      {/* MATCH HEADER & SCOREBOARD HERO */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-500/40 bg-slate-950 p-6 sm:p-10 shadow-2xl bg-grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 via-slate-950/90 to-emerald-950/30 pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Top metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Badge variant="live" dot>LIVE STOMP FEED</Badge>
              <span className="font-bold text-slate-200">{activeMatch.tournamentName}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">{activeMatch.roundName}</span>
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <span className="flex items-center gap-1.5 font-mono text-emerald-400 font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse" /> Sub-second sync
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> {activeMatch.arenaName} ({activeMatch.court})
              </span>
            </div>
          </div>

          {/* Core Scoreboard Display */}
          <div className="grid grid-cols-1 md:grid-cols-7 items-center gap-6 py-4">
            {/* Team A */}
            <div className="md:col-span-3 flex items-center justify-center md:justify-end gap-5">
              <div className="text-center md:text-right">
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display">{activeMatch.teamA.name}</h2>
                <div className="flex items-center justify-center md:justify-end gap-2 text-xs text-slate-400 mt-1">
                  <span>{activeMatch.teamA.fouls} Fouls</span>
                  <span>·</span>
                  <span>{activeMatch.teamA.timeoutsRemaining} Timeouts</span>
                </div>
              </div>
              <img
                src={activeMatch.teamA.logoUrl}
                alt={activeMatch.teamA.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl object-cover border-2 border-emerald-500/60 shadow-xl"
              />
            </div>

            {/* Score in Center */}
            <div className="md:col-span-1 flex flex-col items-center justify-center">
              <div className="flex items-center gap-4 bg-slate-900/90 px-6 py-4 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-xl">
                <span className="text-4xl sm:text-5xl font-black text-emerald-400 font-display">
                  {activeMatch.teamA.score}
                </span>
                <span className="text-2xl font-bold text-slate-600">-</span>
                <span className="text-4xl sm:text-5xl font-black text-slate-100 font-display">
                  {activeMatch.teamB.score}
                </span>
              </div>

              {/* Live Clock countdown badge */}
              <div className="mt-3 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-slate-200">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeMatch.currentPeriod}</span>
                <span className="text-emerald-400">{activeMatch.periodTimeRemaining}</span>
              </div>
            </div>

            {/* Team B */}
            <div className="md:col-span-3 flex items-center justify-center md:justify-start gap-5">
              <img
                src={activeMatch.teamB.logoUrl}
                alt={activeMatch.teamB.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl object-cover border-2 border-slate-700 shadow-xl"
              />
              <div className="text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display">{activeMatch.teamB.name}</h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-slate-400 mt-1">
                  <span>{activeMatch.teamB.fouls} Fouls</span>
                  <span>·</span>
                  <span>{activeMatch.teamB.timeoutsRemaining} Timeouts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Referee and court meta footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Assigned Lead Arbiter: <strong className="text-slate-200">{activeMatch.official?.name || 'Rahul Kumar (FIBA Level 1)'}</strong></span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-500">Live Court: Maple Hardwood Court A</span>
            </div>
          </div>
        </div>
      </div>

      {/* PLAY-BY-PLAY TIMELINE & SPECTATOR LIVE CHAT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Play-by-Play Event Timeline */}
        <Card className="lg:col-span-2 p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> Official Play-by-Play Timeline
            </h3>
            <span className="text-xs text-slate-400 font-mono">Synced Real-Time</span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {activeMatch.events && activeMatch.events.length > 0 ? (
              activeMatch.events.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 font-mono font-bold text-slate-300 text-[11px] border border-slate-800 mt-0.5">
                      {ev.gameTime}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-200">{ev.description}</p>
                      {ev.teamName && (
                        <p className="text-[10px] text-slate-500 mt-0.5">{ev.teamName}</p>
                      )}
                    </div>
                  </div>

                  <Badge
                    variant={ev.type === 'SCORE' ? 'success' : ev.type === 'FOUL' ? 'danger' : 'warning'}
                    size="sm"
                  >
                    {ev.type}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 text-center py-6">No match events recorded yet.</p>
            )}
          </div>
        </Card>

        {/* Spectator Live Reaction Feed */}
        <Card className="p-6 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" /> Fan Live Room
              </h3>
              <span className="text-[11px] text-emerald-400 font-semibold">1,420 Active Fans</span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 text-xs">
              {comments.map((c) => (
                <div key={c.id} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-emerald-400">{c.user}</span>
                    <span className="text-slate-500 font-mono">{c.time}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comment input */}
          <form onSubmit={handleAddComment} className="pt-4 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder="Send match reaction..."
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <Button type="submit" variant="primary" size="sm">
              Post
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
