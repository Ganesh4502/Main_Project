import React, { useState, useEffect } from 'react';
import { Plus, UserCheck, Star, Shield, Award, Calendar, Activity, Search, Edit } from 'lucide-react';
import { officialApi } from '../../api/officialApi';
import { Official } from '../../types';
import { OfficialCard } from '../../components/sports/TeamAndOfficialCards';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';

export const AdminOfficialsPage: React.FC<{ isSponsorView?: boolean }> = ({ isSponsorView = false }) => {
  const [officials, setOfficials] = useState<Official[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSport, setSelectedSport] = useState('ALL');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Official>>({
    name: '',
    email: '',
    phone: '',
    sportSpecializations: ['Basketball'],
    experienceYears: 5,
    certificationLevel: 'National',
    certificationName: 'Certified Federation Official Badge',
    rating: 4.85,
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  });
  const { role } = useAuth();
  const { showToast } = useNotification();

  const fetchOfficials = () => {
    setIsLoading(true);
    officialApi.getAll().then(data => {
      setOfficials(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchOfficials();
  }, []);

  const handleCreateOfficial = async (e: React.FormEvent) => {
    e.preventDefault();
    const assignedBy = role === 'SPONSOR' ? 'Sponsor' : 'Super Admin';
    await officialApi.create(formData, assignedBy);
    showToast('success', 'Official Appointed & Accredited', `${formData.name} has been enrolled into Spotix Referees Panel.`);
    setIsCreateModalOpen(false);
    fetchOfficials();
  };

  const filteredOfficials = officials.filter(o => {
    const matchSearch = o.name.toLowerCase().includes(search.toLowerCase()) || o.certificationName.toLowerCase().includes(search.toLowerCase());
    const matchSport = selectedSport === 'ALL' || o.sportSpecializations.includes(selectedSport);
    return matchSearch && matchSport;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white font-display">
              {isSponsorView ? 'Sponsor Officials Appointment & Oversight' : 'Federation Officials & Referees Roster'}
            </h1>
            <Badge variant="primary">Accredited Panel</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Verified arbiters, certified judges, and referees. Managed exclusively by Super Administrators and Corporate Sponsors.
          </p>
        </div>

        <Button
          variant="glow"
          size="md"
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Appoint New Official
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search officials by name or certification..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedSport}
            onChange={e => setSelectedSport(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Sport Specializations</option>
            <option value="Basketball">Basketball</option>
            <option value="Football / Soccer">Football / Soccer</option>
            <option value="Badminton">Badminton</option>
            <option value="Tennis">Tennis</option>
            <option value="Cricket">Cricket</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOfficials.map((official) => (
          <OfficialCard key={official.id} official={official} />
        ))}
      </div>

      {/* Create Official Modal */}
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Appoint & Accredit Official"
          description="Enrolling an official grants match scoring control permissions and tournament assignment eligibility."
          maxWidth="lg"
        >
          <form onSubmit={handleCreateOfficial} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Official's Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rahul Kumar"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Official Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ref@federation.org"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Certification Tier</label>
                <select
                  value={formData.certificationLevel}
                  onChange={e => setFormData({ ...formData, certificationLevel: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="International">International (FIBA / FIFA / BWF)</option>
                  <option value="National">National Level</option>
                  <option value="State">State / Regional</option>
                  <option value="Associate">Associate Certified</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Experience (Years)</label>
                <input
                  type="number"
                  min={1}
                  value={formData.experienceYears}
                  onChange={e => setFormData({ ...formData, experienceYears: parseInt(e.target.value, 10) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Certification Badge / Accreditation Name</label>
              <input
                type="text"
                required
                value={formData.certificationName}
                onChange={e => setFormData({ ...formData, certificationName: e.target.value })}
                placeholder="e.g. FIBA Senior Level 1 Referee"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Issue Official Accreditation
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
