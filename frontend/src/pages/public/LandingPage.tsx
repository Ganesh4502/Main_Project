import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame,
  Trophy,
  MapPin,
  Sparkles,
  Play,
  ArrowRight,
  Shield,
  Activity,
  Users,
  Calendar,
  CheckCircle2,
  Star,
  Award,
  ChevronRight,
  Cpu,
  Clock,
  Zap,
  Globe2
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { TournamentCard } from '../../components/sports/TournamentCard';
import { ArenaCard } from '../../components/sports/ArenaCard';
import { MatchCard } from '../../components/sports/MatchCard';
import { MOCK_TOURNAMENTS, MOCK_ARENAS, MOCK_MATCHES, MOCK_SPORTS } from '../../api/mockData';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Athletes', value: '45,000+', change: '+24%', icon: <Users className="w-4 h-4 text-emerald-400" /> },
    { label: 'Tournaments Hosted', value: '1,240+', change: '+18%', icon: <Trophy className="w-4 h-4 text-amber-400" /> },
    { label: 'Verified Arenas', value: '380+', change: '+12%', icon: <MapPin className="w-4 h-4 text-blue-400" /> },
    { label: 'AI Fixtures Optimized', value: '9,800+', change: '99.8% conflict-free', icon: <Cpu className="w-4 h-4 text-purple-400" /> },
  ];

  const features = [
    {
      title: 'Intelligent AI Fixture Engine',
      desc: 'Eliminate scheduling headaches. Our constraint engine evaluates athlete rest, court availability, and bracket formats in seconds.',
      icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
      badge: 'Patented AI',
    },
    {
      title: 'Instant Arena Booking & Slots',
      desc: 'Discover premier indoor courts and outdoor stadiums. Real-time availability calendars and frictionless digital reservations.',
      icon: <MapPin className="w-6 h-6 text-blue-400" />,
      badge: 'Real-time Sync',
    },
    {
      title: 'Live Scoring & Match Center',
      desc: 'Sub-second real-time scoring updates via WebSocket with official referee control pads, play-by-play timelines, and livestream feeds.',
      icon: <Activity className="w-6 h-6 text-rose-400" />,
      badge: 'Sub-second Latency',
    },
    {
      title: 'Smart Official Assignment',
      desc: 'Match accredited referees and judges to high-stakes games based on certification tier, sport specialization, workload, and bias elimination.',
      icon: <Shield className="w-6 h-6 text-amber-400" />,
      badge: 'Fair Play Protocol',
    },
    {
      title: 'Team & Roster Management',
      desc: 'Manage player rosters, jersey allocations, injury reports, performance analytics, and tournament registration compliance.',
      icon: <Users className="w-6 h-6 text-cyan-400" />,
      badge: 'Player Hub',
    },
    {
      title: 'Enterprise Analytics & KPIs',
      desc: 'Gain actionable visibility into arena utilization, tournament revenue, spectator engagement, and athletic progress.',
      icon: <Globe2 className="w-6 h-6 text-purple-400" />,
      badge: 'Data Intelligence',
    },
  ];

  const steps = [
    { step: '01', title: 'Discover & Register', desc: 'Browse verified sports arenas or register your club in premier regional and national tournaments.' },
    { step: '02', title: 'AI Automated Scheduling', desc: 'Generate balanced fixtures with optimized rest hours and automated official assignments.' },
    { step: '03', title: 'Live Match Operations', desc: 'Referees score matches on dedicated tablet pads while fans track every point in real-time.' },
    { step: '04', title: 'Celebrate Champions', desc: 'Automated standings, knockout progression, MVP stats, and championship payouts.' },
  ];

  const testimonials = [
    {
      quote: 'Spotix reduced our 64-team national basketball tournament scheduling from 3 days to under 45 seconds. Zero venue double-bookings.',
      author: 'Marcus Vance',
      role: 'Head of Operations, West Coast Athletics',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    {
      quote: 'Managing 12 badminton courts used to mean endless spreadsheets. With Spotix Slot Management, our court utilization increased by 38%.',
      author: 'Sarah Lin',
      role: 'General Manager, Velocity Racquet Hub',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    {
      quote: 'The live scoring interface and spectator experience feels like ESPN and FIFA combined. Our players and fans are obsessed.',
      author: 'Carlos Morales',
      role: 'Director, Bay Area Premier Football League',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="space-y-28 overflow-hidden">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Background glow flares */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-emerald-500/20 to-transparent blur-[120px] pointer-events-none rounded-full" />

        <div className="relative text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-xs font-semibold text-emerald-300 shadow-xl backdrop-blur-md animate-in fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Spotix 2.0 — Next-Gen Sports Operating System</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] font-display">
            Smart Sports Tournament & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-300">
              Arena Management Platform
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Play. Organize. Compete. Together. Connect sports organizers, sponsors, arena managers, teams, players, officials, and spectators into one seamless ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              variant="glow"
              onClick={() => navigate('/tournaments')}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto text-base"
            >
              Explore Tournaments
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/arenas')}
              leftIcon={<MapPin className="w-5 h-5 text-emerald-400" />}
              className="w-full sm:w-auto text-base bg-slate-900/80"
            >
              Discover Arenas
            </Button>
            <Link
              to="/matches/m-live-1/live"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 font-bold text-sm transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              Watch Live Score
            </Link>
          </div>
        </div>

        {/* Hero Interactive Live Match Preview Card */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-emerald-500/30 to-purple-600/30 rounded-3xl blur-xl opacity-70" />
          <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 text-xs">
              <div className="flex items-center gap-2">
                <Badge variant="live" dot>Live Match Center</Badge>
                <span className="text-slate-400 font-semibold">Spotix Elite Basketball Championship</span>
              </div>
              <span className="text-emerald-400 font-bold font-mono">Q3 · 07:42 REMAINING</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 py-6 text-center">
              {/* Team 1 */}
              <div className="flex items-center justify-center md:justify-end gap-4">
                <div className="text-right">
                  <h3 className="text-xl font-black text-slate-100 font-display">Cyber Knights</h3>
                  <p className="text-xs text-slate-400">San Francisco, CA</p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                  alt="Team 1"
                  className="w-14 h-14 rounded-2xl border-2 border-emerald-500/60 object-cover shadow-lg"
                />
              </div>

              {/* Scoreboard center */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-4 bg-slate-950/80 px-6 py-3 rounded-2xl border border-slate-800 shadow-inner">
                  <span className="text-4xl font-black text-emerald-400 font-display">52</span>
                  <span className="text-slate-600 text-2xl font-bold">-</span>
                  <span className="text-4xl font-black text-slate-200 font-display">48</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-2 font-medium">Apex Grand Sports Complex · Court A</span>
              </div>

              {/* Team 2 */}
              <div className="flex items-center justify-center md:justify-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Team 2"
                  className="w-14 h-14 rounded-2xl border-2 border-slate-700 object-cover shadow-lg"
                />
                <div className="text-left">
                  <h3 className="text-xl font-black text-slate-100 font-display">Titan Vanguard</h3>
                  <p className="text-xs text-slate-400">Oakland, CA</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-400">
                Lead Official: <strong className="text-slate-200">Rahul Kumar</strong> (FIBA Level 1 · 94% Suitability Score)
              </span>
              <Button
                variant="glow"
                size="sm"
                onClick={() => navigate('/matches/m-live-1/live')}
                rightIcon={<Play className="w-3.5 h-3.5 fill-slate-950" />}
              >
                Open Full Match Center
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE STATISTICS TICKER */}
      <section className="border-y border-slate-800/80 bg-slate-950/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-center space-y-2">
              <div className="inline-flex p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 mb-1">
                {st.icon}
              </div>
              <h4 className="text-3xl font-black text-white font-display">{st.value}</h4>
              <p className="text-xs text-slate-400 font-semibold">{st.label}</p>
              <p className="text-[11px] text-emerald-400 font-medium">{st.change}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. POPULAR SPORTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Badge variant="primary" className="mb-2">Multi-Sport Architecture</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
              Engineered for Every Sporting Discipline
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              From fast-break basketball tournaments to full-pitch football leagues and badminton championships.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/sports')}>
            View All 8+ Sports
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_SPORTS.slice(0, 4).map((sport) => (
            <Card key={sport.id} variant="interactive" className="p-5 border border-slate-800 group" onClick={() => navigate('/sports')}>
              <div className="relative h-36 rounded-xl overflow-hidden mb-4">
                <img src={sport.imageUrl} alt={sport.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <span className="absolute bottom-2 left-2 text-xs font-bold text-white bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
                  {sport.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                {sport.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {sport.description}
              </p>
              <div className="pt-3 mt-3 border-t border-slate-800/60 flex justify-between text-xs text-slate-400">
                <span>{sport.upcomingTournamentsCount} Tournaments</span>
                <span className="text-emerald-400 font-semibold">{sport.activePlayersCount} Players</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. ARENA DISCOVERY SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Badge variant="primary" className="mb-2">Venue Ecosystem</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
              Premier Arenas & Smart Slot Booking
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Verified sports complexes with Olympic hardwood, FIFA artificial turf, electronic scoreboards, and seamless slot reservations.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/arenas')}>
            Browse All Arenas
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_ARENAS.slice(0, 3).map((arena) => (
            <ArenaCard key={arena.id} arena={arena} onBook={() => navigate('/arenas')} />
          ))}
        </div>
      </section>

      {/* 5. SMART SCHEDULING & AI FIXTURE DEMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-950 border border-emerald-500/40 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                <Sparkles className="w-3.5 h-3.5" /> AI Scheduling Workspace
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
                Say Goodbye to Tournament Scheduling Chaos.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Spotix AI automatically resolves court conflicts, respects team rest constraints, optimizes prime-time broadcast matches, and assigns licensed referees with zero manual math.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>0 Court Overlaps and Double-Bookings Guaranteed</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Mandatory 4-hour athlete rest interval enforcement</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Referee suitability rating matching & fatigue tracking</span>
                </div>
              </div>
              <div className="pt-2 flex gap-3">
                <Button
                  variant="glow"
                  onClick={() => navigate('/organizer/tournaments/tour-1/ai-fixture')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Test AI Fixture Generator
                </Button>
              </div>
            </div>

            {/* AI Workspace Visual Preview */}
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="font-bold text-slate-300">Constraint Optimization Run</span>
                <span className="text-emerald-400 font-bold font-mono">92% Quality Score</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-[10px] text-slate-400">Conflicts</p>
                  <p className="text-base font-bold text-emerald-400">0</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-[10px] text-slate-400">Rest Violations</p>
                  <p className="text-base font-bold text-emerald-400">0</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-[10px] text-slate-400">Teams Scheduled</p>
                  <p className="text-base font-bold text-blue-400">16</p>
                </div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-200">Match 01: Quarter Final</p>
                  <p className="text-[11px] text-slate-400">Cyber Knights vs Titan Vanguard · 10:00 AM</p>
                </div>
                <Badge variant="success" size="sm">Optimal</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY SPOTIX / FEATURE GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="primary">Why Modern Sports Organizations Choose Spotix</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
            Built for High Performance at Every Level
          </h2>
          <p className="text-sm text-slate-400">
            A cohesive platform replacing disconnected spreadsheets, paper scoresheets, and chaotic messaging groups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Card key={i} variant="glass" className="p-6 border border-slate-800 hover:border-slate-700 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                  {f.icon}
                </div>
                <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  {f.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-100">{f.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 7. HOW IT WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="secondary">Lifecycle Workflow</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
            How Spotix Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div key={st.step} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3 relative">
              <span className="text-3xl font-black text-emerald-400/40 font-display">{st.step}</span>
              <h3 className="text-base font-bold text-slate-100">{st.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="border-t border-slate-800/80 bg-slate-950/40 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="primary">Trusted By Athletic Leaders</Badge>
            <h2 className="text-3xl font-black text-white font-display">
              Endorsed by Tournaments & Venues Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} variant="glass" className="p-6 border border-slate-800 flex flex-col justify-between">
                <p className="text-xs text-slate-300 italic leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/60">
                  <img src={t.image} alt={t.author} className="w-10 h-10 rounded-xl object-cover border border-slate-700" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">{t.author}</h4>
                    <p className="text-[11px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION (CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-emerald-600 p-8 sm:p-14 text-center space-y-6 shadow-2xl shadow-emerald-500/10">
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            Ready to Transform Your Sports Operations?
          </h2>
          <p className="text-sm sm:text-base text-slate-100 max-w-xl mx-auto font-medium">
            Join thousands of tournament organizers, arenas, teams, and referees already competing on Spotix.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-slate-950 hover:bg-slate-900 text-white font-bold border border-slate-800 text-base"
              onClick={() => navigate('/register')}
            >
              Get Started for Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 text-base"
              onClick={() => navigate('/contact')}
            >
              Schedule Enterprise Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
