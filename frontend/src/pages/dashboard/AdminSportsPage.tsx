import React, { useState, useEffect } from 'react';
import { Plus, Edit, Activity, Users, Shield, Check, X, Search } from 'lucide-react';
import { sportApi } from '../../api/sportApi';
import { Sport } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useNotification } from '../../context/NotificationContext';

export const AdminSportsPage: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSport, setEditingSport] = useState<Sport | null>(null);
  const [formData, setFormData] = useState<Partial<Sport>>({
    name: '',
    category: 'Team',
    description: '',
    minPlayers: 5,
    maxPlayers: 12,
    officialsRequired: 2,
    rules: ['Standard match duration applies', 'Official referee decisions final'],
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80',
  });
  const { showToast } = useNotification();

  const fetchSports = () => {
    setIsLoading(true);
    sportApi.getAll().then(data => {
      setSports(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchSports();
  }, []);

  const handleOpenCreate = () => {
    setEditingSport(null);
    setFormData({
      name: '',
      category: 'Team',
      description: '',
      minPlayers: 5,
      maxPlayers: 12,
      officialsRequired: 2,
      rules: ['Standard match rules apply'],
      imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sport: Sport) => {
    setEditingSport(sport);
    setFormData(sport);
    setIsModalOpen(true);
  };

  const handleToggleActive = async (sportId: string) => {
    await sportApi.toggleActive(sportId);
    showToast('success', 'Sport Status Toggled');
    fetchSports();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSport) {
      await sportApi.update(editingSport.id, formData);
      showToast('success', 'Sport Updated', `${formData.name} updated successfully.`);
    } else {
      await sportApi.create(formData);
      showToast('success', 'Sport Added', `${formData.name} is now supported across Spotix.`);
    }
    setIsModalOpen(false);
    fetchSports();
  };

  const filteredSports = sports.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-display">Supported Sports Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">Define sports rules, minimum/maximum player rosters, and officiating requirements</p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenCreate} leftIcon={<Plus className="w-4 h-4" />}>
          Add New Sport
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sports..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSports.map((sport) => (
          <Card key={sport.id} className="p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                <img src={sport.imageUrl} alt={sport.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                  {sport.category}
                </span>
                <span className="absolute bottom-3 left-3 text-white font-bold text-lg font-display">
                  {sport.name}
                </span>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">{sport.description}</p>

              <div className="space-y-1.5 py-3 border-y border-slate-800 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Roster Capacity:</span>
                  <span className="text-slate-200 font-semibold">{sport.minPlayers} - {sport.maxPlayers} athletes</span>
                </div>
                <div className="flex justify-between">
                  <span>Officials Required:</span>
                  <span className="text-slate-200 font-semibold">{sport.officialsRequired} Referees</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform State:</span>
                  <Badge variant={sport.isActive ? 'success' : 'secondary'} size="sm">
                    {sport.isActive ? 'Active' : 'Disabled'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => handleOpenEdit(sport)}>
                Edit Sport
              </Button>
              <Button
                variant={sport.isActive ? 'danger' : 'success'}
                size="sm"
                className="text-xs"
                onClick={() => handleToggleActive(sport.id)}
              >
                {sport.isActive ? 'Disable' : 'Enable'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingSport ? `Edit Sport: ${editingSport.name}` : 'Add New Sport Definition'}
          maxWidth="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Sport Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Pickleball"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Team">Team Sport</option>
                  <option value="Racquet">Racquet Sport</option>
                  <option value="Combat">Combat Sport</option>
                  <option value="Athletics">Athletics & Track</option>
                  <option value="Individual">Individual Sport</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Officials Required</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={formData.officialsRequired}
                  onChange={e => setFormData({ ...formData, officialsRequired: parseInt(e.target.value, 10) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Min Players / Squad</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={formData.minPlayers}
                  onChange={e => setFormData({ ...formData, minPlayers: parseInt(e.target.value, 10) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Max Players / Squad</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={formData.maxPlayers}
                  onChange={e => setFormData({ ...formData, maxPlayers: parseInt(e.target.value, 10) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Overview of match rules and gameplay..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Sport Definition
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
