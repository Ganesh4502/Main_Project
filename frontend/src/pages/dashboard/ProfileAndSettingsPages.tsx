import React, { useState } from 'react';
import { User, Shield, KeyRound, Bell, Palette, Globe, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';

export const ProfilePage: React.FC = () => {
  const { user, role } = useAuth();
  const { showToast } = useNotification();
  const [formData, setFormData] = useState({
    name: user?.name || 'Alexander Vance',
    email: user?.email || 'admin@spotix.io',
    phone: user?.phone || '+1 (555) 482-9011',
    organization: user?.organization || 'Spotix Global HQ',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Profile Saved', 'Your personal details and contact settings were updated.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-white font-display">Personal Profile</h1>
        <p className="text-xs text-slate-400 mt-0.5">Manage your identity, role permissions, and contact preferences.</p>
      </div>

      <Card className="p-8 border border-slate-800 space-y-6">
        <div className="flex items-center gap-5 pb-6 border-b border-slate-800">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={user?.name}
            className="w-20 h-20 rounded-3xl object-cover border-2 border-emerald-500 shadow-xl"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white font-display">{user?.name}</h2>
              <Badge variant="primary">{role.replace('_', ' ')}</Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{user?.email}</p>
            <p className="text-[11px] text-emerald-400 font-semibold mt-1">Verified Member Since 2025</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Contact Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Organization / Federation</label>
              <input
                type="text"
                value={formData.organization}
                onChange={e => setFormData({ ...formData, organization: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <Button type="submit" variant="primary" size="md">
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  const { showToast } = useNotification();

  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'security', label: 'Security & Password' },
    { id: 'notifications', label: 'Notification Rules' },
    { id: 'appearance', label: 'Appearance & UI' },
    { id: 'preferences', label: 'Preferences' },
  ];

  const handleSaveSettings = () => {
    showToast('success', 'Preferences Updated', 'Settings saved.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-white font-display">System & Account Settings</h1>
        <p className="text-xs text-slate-400 mt-0.5">Customize your security keys, notifications, theme aesthetics, and regional locale.</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'account' && (
        <Card className="p-6 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-base font-bold text-slate-100">Account Preferences</h3>
          <p className="text-slate-400">Configure language, time zone, and data export settings.</p>
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Timezone</label>
              <select className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-slate-100 text-xs">
                <option>UTC-08:00 Pacific Time (US & Canada)</option>
                <option>UTC-05:00 Eastern Time (US & Canada)</option>
                <option>UTC+00:00 London (GMT)</option>
                <option>UTC+05:30 Indian Standard Time (IST)</option>
              </select>
            </div>
            <Button variant="primary" size="sm" onClick={handleSaveSettings}>Save Account Settings</Button>
          </div>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card className="p-6 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-base font-bold text-slate-100">Security & Authentication</h3>
          <p className="text-slate-400">Change your password and manage two-factor authentication.</p>
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Current Password</label>
              <input type="password" placeholder="••••••••••••" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-slate-100 text-xs" />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">New Password</label>
              <input type="password" placeholder="••••••••••••" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-slate-100 text-xs" />
            </div>
            <Button variant="primary" size="sm" onClick={handleSaveSettings}>Update Password</Button>
          </div>
        </Card>
      )}

      {activeTab === 'notifications' && (
        <Card className="p-6 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-base font-bold text-slate-100">Notification Channels</h3>
          <div className="space-y-3 pt-2">
            {['Live Match Score Alerts', 'AI Fixture Generation Completed', 'Arena Booking Confirmation', 'Referee Assignment Requests'].map((item, i) => (
              <label key={i} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
                <span className="text-slate-200">{item}</span>
                <input type="checkbox" defaultChecked className="rounded bg-slate-900 border-slate-700 text-emerald-500" />
              </label>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'appearance' && (
        <Card className="p-6 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-base font-bold text-slate-100">Appearance & Theme</h3>
          <p className="text-slate-400">Spotix features dark sports-tech aesthetics with emerald accents.</p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
            <span className="text-slate-200 font-semibold">Active Theme: Deep Midnight & Emerald Accent</span>
            <Badge variant="success" size="sm">Active</Badge>
          </div>
        </Card>
      )}

      {activeTab === 'preferences' && (
        <Card className="p-6 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-base font-bold text-slate-100">Athletic Measurement Preferences</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Unit of Measurement</label>
              <select className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-slate-100 text-xs">
                <option>Imperial (Feet, Inches, Lbs)</option>
                <option>Metric (Meters, Kg)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Default Scoreboard View</label>
              <select className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-slate-100 text-xs">
                <option>Detailed Timeline</option>
                <option>Compact Digital</option>
              </select>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={handleSaveSettings}>Save Preferences</Button>
        </Card>
      )}
    </div>
  );
};
