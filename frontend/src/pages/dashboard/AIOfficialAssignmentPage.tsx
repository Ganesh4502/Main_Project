import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  UserCheck,
  Sparkles,
  Shield,
  Star,
  Activity,
  CheckCircle2,
  RefreshCw,
  ArrowLeft,
  Zap,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { fixtureApi } from '../../api/fixtureApi';
import { matchApi } from '../../api/matchApi';
import { MOCK_MATCHES, MOCK_OFFICIALS } from '../../api/mockData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useNotification } from '../../context/NotificationContext';
import { Match, Official, AIOfficialRecommendation } from '../../types';

export const AIOfficialAssignmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useNotification();

  const [match, setMatch] = useState<Match>(() => MOCK_MATCHES[0]);
  const [recommendations, setRecommendations] = useState<AIOfficialRecommendation[]>([]);
  const [officials, setOfficials] = useState<Official[]>(MOCK_OFFICIALS);
  const [isCalculating, setIsCalculating] = useState(false);
  const [assignedOfficialId, setAssignedOfficialId] = useState<string | null>(match.official?.id || null);

  const fetchRecs = async () => {
    setIsCalculating(true);
    const recs = await fixtureApi.getAIOfficialRecommendations(match.id);
    setRecommendations(recs);
    setIsCalculating(false);
  };

  useEffect(() => {
    fetchRecs();
  }, [match.id]);

  const handleAcceptRecommendation = async (rec: AIOfficialRecommendation) => {
    await matchApi.assignOfficial(match.id, rec.officialId, rec.officialName);
    setAssignedOfficialId(rec.officialId);
    showToast('success', 'Official Assigned!', `${rec.officialName} assigned to Lead Referee role with ${rec.suitabilityScore}% suitability score.`);
  };

  const handleAssignDirect = async (off: Official) => {
    await matchApi.assignOfficial(match.id, off.id, off.name);
    setAssignedOfficialId(off.id);
    showToast('success', 'Official Assigned', `${off.name} assigned as match official.`);
  };

  const topRec = recommendations[0];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Back button */}
      <Link to="/organizer/matches" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Match Operations
      </Link>

      {/* Match Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">AI Arbiter Assignment</Badge>
            <span className="text-xs text-slate-400 font-mono">{match.roundName}</span>
          </div>
          <h1 className="text-2xl font-black text-white font-display mt-2">
            {match.teamA.name} <span className="text-slate-500 font-normal">vs</span> {match.teamB.name}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {match.sport} · {match.arenaName} ({match.court}) · {match.time}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchRecs}
            isLoading={isCalculating}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Recalculate AI Match
          </Button>
        </div>
      </div>

      {/* AI Top Recommendation Card */}
      {topRec && (
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-blue-950/40 border-2 border-emerald-500/50 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={topRec.officialAvatar} alt={topRec.officialName} className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-lg" />
                <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 text-slate-950 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                </span>
              </div>
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Top AI Recommendation</span>
                <h2 className="text-2xl font-black text-white font-display">{topRec.officialName}</h2>
                <p className="text-xs text-slate-300">FIBA Senior Level 1 & USA Basketball Elite Referee</p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-3xl font-black text-emerald-400 font-display">{topRec.suitabilityScore}%</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Suitability Score</span>
            </div>
          </div>

          {/* Metric Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
              <p className="text-[10px] uppercase font-bold text-slate-400">Sport Expertise</p>
              <p className="text-lg font-black text-emerald-400 mt-0.5">{topRec.metrics.sportExpertise}%</p>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
              <p className="text-[10px] uppercase font-bold text-slate-400">Experience</p>
              <p className="text-lg font-black text-blue-400 mt-0.5">{topRec.metrics.experienceScore}%</p>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
              <p className="text-[10px] uppercase font-bold text-slate-400">Availability</p>
              <p className="text-lg font-black text-emerald-400 mt-0.5">{topRec.metrics.availability}%</p>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
              <p className="text-[10px] uppercase font-bold text-slate-400">Fatigue Workload</p>
              <p className="text-lg font-black text-slate-200 mt-0.5">{topRec.metrics.workloadScore}%</p>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
              <p className="text-[10px] uppercase font-bold text-slate-400">Conflict Risk</p>
              <p className="text-lg font-black text-emerald-400 mt-0.5">{topRec.metrics.conflictRisk}</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 italic bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            AI Insight: "{topRec.explanation}"
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="glow"
              size="lg"
              onClick={() => handleAcceptRecommendation(topRec)}
              disabled={assignedOfficialId === topRec.officialId}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              {assignedOfficialId === topRec.officialId ? 'Official Assigned' : 'Accept Recommendation'}
            </Button>
          </div>
        </div>
      )}

      {/* Available Officials Directory */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">All Certified Officials Available for Match</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {officials.map((off) => {
            const isAssigned = assignedOfficialId === off.id;

            return (
              <Card
                key={off.id}
                className={`p-5 border transition-all ${
                  isAssigned ? 'border-emerald-500 bg-emerald-950/20 ring-1 ring-emerald-500/40' : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={off.avatarUrl} alt={off.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm">{off.name}</h4>
                      <p className="text-[11px] text-slate-400">{off.certificationName}</p>
                      <div className="flex items-center gap-1 text-amber-400 font-bold text-xs mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{off.rating}</span>
                        <span className="text-slate-500 font-normal">({off.matchesOfficiated} matches)</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={off.availabilityStatus === 'AVAILABLE' ? 'success' : 'warning'} size="sm">
                    {off.availabilityStatus}
                  </Badge>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Workload: <strong>{off.workloadScore}%</strong></span>
                  <Button
                    variant={isAssigned ? 'secondary' : 'outline'}
                    size="sm"
                    className="text-xs"
                    onClick={() => handleAssignDirect(off)}
                  >
                    {isAssigned ? 'Assigned' : 'Assign to Match'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
