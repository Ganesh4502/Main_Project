import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Trophy,
  Users,
  Activity,
  Award,
  Zap
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
import { analyticsApi, GrowthDataPoint, SportPopularityData, ArenaUtilizationData } from '../../api/analyticsApi';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/ui/StatCard';

export const AnalyticsDashboardPage: React.FC = () => {
  const [growth, setGrowth] = useState<GrowthDataPoint[]>([]);
  const [sports, setSports] = useState<SportPopularityData[]>([]);
  const [arenas, setArenas] = useState<ArenaUtilizationData[]>([]);

  useEffect(() => {
    analyticsApi.getGrowthTrends().then(setGrowth);
    analyticsApi.getSportPopularity().then(setSports);
    analyticsApi.getArenaUtilization().then(setArenas);
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-white font-display">Athletic Platform Analytics</h1>
          <Badge variant="primary">Real-Time Insights</Badge>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Comprehensive performance data answering core operational questions for tournaments, venues, and athletes.
        </p>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Athletes" value="14,820" change="+24.8% growth" isPositive={true} icon={<Users className="w-5 h-5" />} color="emerald" />
        <StatCard title="Tournament Revenue" value="$78,500" change="+18.5% YoY" isPositive={true} icon={<Award className="w-5 h-5" />} color="amber" />
        <StatCard title="Slot Bookings" value="1,240 Slots" change="+32% vs last month" isPositive={true} icon={<MapPin className="w-5 h-5" />} color="blue" />
        <StatCard title="AI Schedule Accuracy" value="99.8%" change="Zero Rest Violations" isPositive={true} icon={<Zap className="w-5 h-5" />} color="purple" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tournament & Booking Growth */}
        <Card className="p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Monthly Platform Bookings & Tournaments</h3>
              <p className="text-xs text-slate-400">Scale of matches and venue slot reservations</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="bookings" fill="#10B981" radius={[4, 4, 0, 0]} name="Slot Bookings" />
                <Bar dataKey="tournaments" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Tournaments" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Arena Utilization Rate */}
        <Card className="p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Arena Utilization & Yield</h3>
              <p className="text-xs text-slate-400">Occupancy rate per premier sports complex</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={arenas} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <YAxis dataKey="arena" type="category" stroke="#64748b" fontSize={9} width={130} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="utilizationRate" fill="#3B82F6" radius={[0, 4, 4, 0]} name="Utilization Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
