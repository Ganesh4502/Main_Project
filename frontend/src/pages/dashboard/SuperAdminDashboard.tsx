import React, { useState, useEffect } from 'react';
import {
  Users,
  Trophy,
  MapPin,
  Shield,
  Activity,
  UserCheck,
  TrendingUp,
  Server,
  Database,
  Cpu,
  Radio,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { analyticsApi, DashboardKPIs, GrowthDataPoint, SportPopularityData, ArenaUtilizationData } from '../../api/analyticsApi';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const SuperAdminDashboard: React.FC = () => {
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null);
  const [growthData, setGrowthData] = useState<GrowthDataPoint[]>([]);
  const [sportsData, setSportsData] = useState<SportPopularityData[]>([]);
  const [arenaData, setArenaData] = useState<ArenaUtilizationData[]>([]);

  useEffect(() => {
    analyticsApi.getKPIs('SUPER_ADMIN').then(setKpis);
    analyticsApi.getGrowthTrends().then(setGrowthData);
    analyticsApi.getSportPopularity().then(setSportsData);
    analyticsApi.getArenaUtilization().then(setArenaData);
  }, []);

  const systemHealth = [
    { service: 'Spring Boot REST API Gateway', status: 'ONLINE', latency: '14ms', uptime: '99.99%', icon: <Server className="w-4 h-4 text-emerald-400" /> },
    { service: 'PostgreSQL Tournament Store', status: 'ONLINE', latency: '4ms', uptime: '100%', icon: <Database className="w-4 h-4 text-emerald-400" /> },
    { service: 'STOMP / WebSocket Live Server', status: 'ACTIVE', latency: '22ms', uptime: '99.98%', icon: <Radio className="w-4 h-4 text-emerald-400" /> },
    { service: 'AI Constraint Solver Engine', status: 'READY', latency: '180ms/solve', uptime: '100%', icon: <Cpu className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">Super Admin Command Center</h1>
            <Badge variant="primary">System Governor</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">Global platform telemetry, user metrics, and tournament health</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="live" dot>Live Operations</Badge>
          <span className="text-xs text-slate-400 font-mono">Synced with Spring Boot API</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Users"
          value={kpis?.totalUsers.toLocaleString() || '14,820'}
          change="+24.8%"
          isPositive={true}
          icon={<Users className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Active Tournaments"
          value={kpis?.activeTournaments || 38}
          change="+18.2%"
          isPositive={true}
          icon={<Trophy className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Registered Arenas"
          value={kpis?.registeredArenas || 42}
          change="+8.4%"
          isPositive={true}
          icon={<MapPin className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Total Teams"
          value={kpis?.totalTeams || 196}
          change="+14.0%"
          isPositive={true}
          icon={<Shield className="w-5 h-5" />}
          color="purple"
        />
        <StatCard
          title="Active Matches"
          value={kpis?.activeMatches || 8}
          change="Live Now"
          isPositive={true}
          icon={<Activity className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Officials Panel"
          value={kpis?.registeredOfficials || 64}
          change="100% Verified"
          isPositive={true}
          icon={<UserCheck className="w-5 h-5" />}
          color="blue"
        />
      </div>

      {/* Primary Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth Chart */}
        <Card className="lg:col-span-2 border border-slate-800">
          <CardHeader>
            <div>
              <CardTitle>Platform User & Tournament Growth</CardTitle>
              <p className="text-xs text-slate-400">Monthly progression of registered athletes and tournaments</p>
            </div>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTourneys" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="users" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" name="Active Athletes" />
                <Area type="monotone" dataKey="tournaments" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorTourneys)" name="Tournaments" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sports Popularity Breakdown */}
        <Card className="border border-slate-800">
          <CardHeader>
            <div>
              <CardTitle>Sport Participation Share</CardTitle>
              <p className="text-xs text-slate-400">Registered athletes by sporting discipline</p>
            </div>
          </CardHeader>
          <CardContent className="h-72 flex flex-col justify-between">
            <ResponsiveContainer width="100%" height="70%">
              <PieChart>
                <Pie data={sportsData} dataKey="players" nameKey="sport" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4}>
                  {sportsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-400 pt-2 border-t border-slate-800">
              {sportsData.slice(0, 6).map((s) => (
                <div key={s.sport} className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="truncate">{s.sport}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <Card className="border border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> Infrastructure Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {systemHealth.map((sys, i) => (
              <div key={i} className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  {sys.icon}
                  <div>
                    <p className="font-semibold text-slate-200">{sys.service}</p>
                    <p className="text-[10px] text-slate-500">Uptime: {sys.uptime} · Latency: {sys.latency}</p>
                  </div>
                </div>
                <Badge variant="success" size="sm">{sys.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Platform Operations */}
        <Card className="lg:col-span-2 border border-slate-800">
          <CardHeader>
            <CardTitle>Recent Administrative Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: 'New Tournament Published', desc: 'Spotix Elite Basketball Championship 2026 was verified and opened for registrations.', time: '12 mins ago', type: 'TOURNAMENT' },
              { title: 'Official Accreditations Approved', desc: 'Elena Rostova (FIFA National Ref) was assigned to Metropolitan Cup panel.', time: '1 hour ago', type: 'OFFICIAL' },
              { title: 'New Arena Registered', desc: 'Apex Grand Sports Complex court slots updated for autumn tournament schedule.', time: '3 hours ago', type: 'ARENA' },
              { title: 'AI Fixture Optimization Run', desc: 'Generated 32 balanced matches with zero arena overlaps.', time: '5 hours ago', type: 'AI' },
            ].map((act, idx) => (
              <div key={idx} className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100">{act.title}</span>
                    <Badge variant="primary" size="sm">{act.type}</Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{act.desc}</p>
                </div>
                <span className="text-[10px] text-slate-500 whitespace-nowrap">{act.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
