import React, { useState } from 'react';
import { Shield, Check, Lock, Users, Sparkles } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useNotification } from '../../context/NotificationContext';
import { UserRole } from '../../types';

interface RoleConfig {
  role: UserRole;
  name: string;
  description: string;
  userCount: number;
  permissions: { id: string; label: string; enabled: boolean }[];
}

export const AdminRolesPage: React.FC = () => {
  const { showToast } = useNotification();

  const [roles, setRoles] = useState<RoleConfig[]>([
    {
      role: 'SUPER_ADMIN',
      name: 'Super Administrator',
      description: 'Unrestricted master access across global system infrastructure, database, and telemetry.',
      userCount: 4,
      permissions: [
        { id: 'p1', label: 'Manage All Users & Roles', enabled: true },
        { id: 'p2', label: 'Access System Health & API Telemetry', enabled: true },
        { id: 'p3', label: 'Appoint Accredited Match Officials', enabled: true },
        { id: 'p4', label: 'Override AI Fixture Outputs', enabled: true },
      ],
    },
    {
      role: 'SPONSOR',
      name: 'Corporate Sponsor',
      description: 'Enterprise tournament backers with official accreditation rights & ROI statistics.',
      userCount: 18,
      permissions: [
        { id: 'p5', label: 'Appoint & Verify Match Officials', enabled: true },
        { id: 'p6', label: 'Sponsor Tournament Prize Pools', enabled: true },
        { id: 'p7', label: 'Access Brand Engagement Analytics', enabled: true },
        { id: 'p8', label: 'Manage Global Users', enabled: false },
      ],
    },
    {
      role: 'ORGANIZER',
      name: 'Tournament Organizer',
      description: 'Host athletic competitions, generate AI fixtures, assign referees, and oversee match operations.',
      userCount: 142,
      permissions: [
        { id: 'p9', label: 'Create & Publish Tournaments', enabled: true },
        { id: 'p10', label: 'Execute AI Fixture Constraint Solver', enabled: true },
        { id: 'p11', label: 'Assign Referees via AI Matcher', enabled: true },
        { id: 'p12', label: 'Approve & Reject Team Registrations', enabled: true },
      ],
    },
    {
      role: 'ARENA_MANAGER',
      name: 'Arena Manager',
      description: 'Venue operators managing courts, synthetic turfs, hourly pricing, and slot calendars.',
      userCount: 42,
      permissions: [
        { id: 'p13', label: 'Manage Arena Profiles & Photos', enabled: true },
        { id: 'p14', label: 'Create & Block Slot Calendars', enabled: true },
        { id: 'p15', label: 'Approve Venue Booking Requests', enabled: true },
        { id: 'p16', label: 'Set Maintenance Windows', enabled: true },
      ],
    },
    {
      role: 'TEAM_MANAGER',
      name: 'Team Manager / Club Owner',
      description: 'Club administrators managing player rosters, match tactics, and tournament applications.',
      userCount: 196,
      permissions: [
        { id: 'p17', label: 'Manage Team Roster & Lineups', enabled: true },
        { id: 'p18', label: 'Apply to Tournaments', enabled: true },
        { id: 'p19', label: 'Book Arena Practice Slots', enabled: true },
      ],
    },
    {
      role: 'OFFICIAL',
      name: 'Match Official / Referee',
      description: 'Accredited umpires scoring live matches, fouls, timeouts, and submitting match cards.',
      userCount: 64,
      permissions: [
        { id: 'p20', label: 'Operate Real-time Match Control Pad', enabled: true },
        { id: 'p21', label: 'Manage Availability Calendar', enabled: true },
        { id: 'p22', label: 'Submit Official Match Reports', enabled: true },
      ],
    },
  ]);

  const togglePermission = (roleName: UserRole, permId: string) => {
    setRoles(prev =>
      prev.map(r => {
        if (r.role !== roleName) return r;
        return {
          ...r,
          permissions: r.permissions.map(p => (p.id === permId ? { ...p, enabled: !p.enabled } : p)),
        };
      })
    );
    showToast('success', 'Permission Updated', 'Security access control table updated successfully.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white font-display">Roles & Granular Permissions</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Fine-tune the security capabilities and interface boundaries for each of the 8 platform personas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((r) => (
          <Card key={r.role} className="p-6 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-100">{r.name}</h3>
                  <p className="text-[11px] text-slate-500 font-mono">{r.role}</p>
                </div>
                <Badge variant="primary" size="sm">
                  {r.userCount} Users
                </Badge>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{r.description}</p>

              {/* Permission list */}
              <div className="space-y-2 pt-3 border-t border-slate-800/80">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Access Rights</p>
                {r.permissions.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => togglePermission(r.role, p.id)}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 cursor-pointer text-xs"
                  >
                    <span className="text-slate-300 text-[11px] pr-2">{p.label}</span>
                    <button
                      type="button"
                      className={`w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0 ${
                        p.enabled ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 border border-slate-700'
                      }`}
                    >
                      {p.enabled && <Check className="w-3 h-3 stroke-[3]" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
