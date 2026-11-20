import React from 'react';
import { Sparkles, Trophy, Shield, Cpu, Users, HeartHandshake, Globe2, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="primary">Our Story & Mission</Badge>
        <h1 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight">
          Powering the Next Era of Competitive Sports
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Spotix was created to bridge grassroots athletics and elite professional leagues through intelligent scheduling, fair referee allocations, and real-time live match infrastructure.
        </p>
      </div>

      {/* Visual Storytelling Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="glass" className="p-8 border border-slate-800 space-y-4">
          <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-2xl w-fit">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">Our Mission</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Empower athletes, organizers, and arena operators with state-of-the-art SaaS tooling that makes organizing sporting competitions as effortless as clicking a button.
          </p>
        </Card>

        <Card variant="glass" className="p-8 border border-slate-800 space-y-4">
          <div className="p-3.5 bg-blue-500/10 text-blue-400 rounded-2xl w-fit">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">AI Scheduling Technology</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our multi-variable constraint engine solves scheduling bottlenecks, respects recovery physiology, and eliminates venue scheduling double-bookings with mathematical precision.
          </p>
        </Card>

        <Card variant="glass" className="p-8 border border-slate-800 space-y-4">
          <div className="p-3.5 bg-purple-500/10 text-purple-400 rounded-2xl w-fit">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">Future Vision</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Connecting global tournaments into a unified, transparent sports ecosystem featuring authenticated refereeing credentials and decentralized player performance passports.
          </p>
        </Card>
      </div>

      {/* Technology Pillars */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
            Built on Modern Enterprise Architecture
          </h2>
          <p className="text-xs text-slate-400">
            Spotix delivers ultra-low latency live updates, bank-grade role-based access control, and scalable cloud scheduling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Spring Boot Backend', desc: 'Secure, high-throughput REST APIs and transactional stability.' },
            { title: 'STOMP / WebSocket', desc: 'Sub-second real-time scoreboard broadcasts to millions of fans.' },
            { title: 'Constraint Solver AI', desc: 'Automated linear programming algorithms for 0-conflict fixtures.' },
            { title: 'Multi-Tenant RBAC', desc: 'Granular permissions across 8 distinct stakeholder personas.' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
