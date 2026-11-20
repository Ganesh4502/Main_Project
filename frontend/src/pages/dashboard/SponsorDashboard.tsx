import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Trophy, UserCheck, DollarSign, TrendingUp, Sparkles, Plus, CheckCircle2, ArrowRight } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { MOCK_TOURNAMENTS, MOCK_OFFICIALS } from '../../api/mockData';

export const SponsorDashboard: React.FC = () => {
  const navigate = useNavigate();

  const sponsoredTournaments = MOCK_TOURNAMENTS.filter(t => t.sponsorName);
  const appointedOfficials = MOCK_OFFICIALS.filter(o => o.assignedBy === 'Sponsor');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white font-display">Sponsor Corporate Portal</h1>
            <Badge variant="primary">Apex Sports Ventures</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor branded tournament initiatives, athlete participation reach, and referee accreditation pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="glow"
            size="sm"
            onClick={() => navigate('/sponsor/officials')}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Appoint Match Official
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Sponsored Tournaments"
          value={sponsoredTournaments.length || 3}
          change="+1 this quarter"
          isPositive={true}
          icon={<Trophy className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Prize Pool Committed"
          value="$65,000"
          change="100% Escrow Secured"
          isPositive={true}
          icon={<Award className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Athletes Reached"
          value="4,850"
          change="+32% Brand Exposure"
          isPositive={true}
          icon={<TrendingUp className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Accredited Officials"
          value={appointedOfficials.length || 2}
          change="FIFA / FIBA Panels"
          isPositive={true}
          icon={<UserCheck className="w-5 h-5" />}
          color="purple"
        />
      </div>

      {/* Sponsored Tournaments Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Your Sponsored Tournaments</h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/tournaments')}>
            Browse Available Tournaments to Sponsor
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sponsoredTournaments.map(t => (
            <Card key={t.id} variant="glass" className="p-6 border border-slate-800 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant={t.status === 'LIVE' ? 'live' : 'success'} size="sm" dot>
                    {t.status.replace('_', ' ')}
                  </Badge>
                  <h3 className="text-base font-bold text-slate-100 mt-2">{t.name}</h3>
                  <p className="text-xs text-slate-400">{t.sport} · {t.venue}</p>
                </div>
                <span className="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30">
                  {t.prizePool}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center p-3 bg-slate-950 rounded-xl text-xs">
                <div>
                  <p className="text-slate-500 text-[10px]">Clubs</p>
                  <p className="font-bold text-slate-200">{t.registeredTeamsCount}/{t.maxTeams}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px]">Format</p>
                  <p className="font-bold text-slate-200">{t.format}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px]">Quality</p>
                  <p className="font-bold text-emerald-400">{t.scheduleQualityScore}%</p>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs">
                <span className="text-slate-400">Brand Tag: <strong>{t.sponsorName}</strong></span>
                <Button variant="outline" size="sm" onClick={() => navigate(`/tournaments/${t.id}`)}>
                  Tournament Center
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Appointed Officials Overview */}
      <Card className="border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100">Officials Appointed by Sponsor</h3>
            <p className="text-xs text-slate-400">Referees and arbiters accredited under your corporate federation sponsorship.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/sponsor/officials')}>
            Manage Roster
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appointedOfficials.map(o => (
            <div key={o.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <img src={o.avatarUrl} alt={o.name} className="w-10 h-10 rounded-xl object-cover border border-slate-700" />
                <div>
                  <h4 className="font-bold text-slate-100">{o.name}</h4>
                  <p className="text-slate-400 text-[11px]">{o.certificationName}</p>
                </div>
              </div>
              <Badge variant="success" size="sm">Active Arbiter</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
