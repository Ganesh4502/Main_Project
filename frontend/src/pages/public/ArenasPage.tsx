import React, { useState } from 'react';
import { Search, MapPin, Filter, Star, Check, Calendar, Clock, DollarSign, ArrowRight, Layers, Eye } from 'lucide-react';
import { MOCK_ARENAS, MOCK_ARENA_SLOTS } from '../../api/mockData';
import { ArenaCard } from '../../components/sports/ArenaCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useNotification } from '../../context/NotificationContext';
import { Arena, ArenaSlot } from '../../types';

export const ArenasPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedSport, setSelectedSport] = useState('ALL');
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [indoorFilter, setIndoorFilter] = useState<'ALL' | 'INDOOR' | 'OUTDOOR'>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [bookingArena, setBookingArena] = useState<Arena | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<ArenaSlot | null>(null);
  const [bookingDate, setBookingDate] = useState('2026-10-06');
  const { showToast } = useNotification();

  const sportsList = ['ALL', 'Basketball', 'Football / Soccer', 'Badminton', 'Tennis', 'Cricket'];
  const citiesList = ['ALL', 'San Francisco, CA', 'Oakland, CA', 'San Jose, CA', 'Fremont, CA'];

  const filteredArenas = MOCK_ARENAS.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.address.toLowerCase().includes(search.toLowerCase());
    const matchSport = selectedSport === 'ALL' || a.sports.includes(selectedSport);
    const matchCity = selectedCity === 'ALL' || a.city === selectedCity;
    const matchIndoor = indoorFilter === 'ALL' || (indoorFilter === 'INDOOR' ? a.isIndoor : !a.isIndoor);
    return matchSearch && matchSport && matchCity && matchIndoor;
  });

  const arenaSlots = MOCK_ARENA_SLOTS.filter(s => bookingArena ? s.arenaId === bookingArena.id : true);

  const handleConfirmBooking = () => {
    if (!selectedSlot) {
      showToast('warning', 'Please select an available slot first');
      return;
    }
    showToast('success', 'Arena Slot Reserved!', `Slot on ${selectedSlot.courtName} (${selectedSlot.startTime} - ${selectedSlot.endTime}) is confirmed.`);
    setBookingArena(null);
    setSelectedSlot(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Badge variant="primary" className="mb-2">Venue Marketplace</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            Discover & Book Sports Arenas
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            Reserve certified courts and stadiums equipped with pro hardwood, floodlights, scoreboards, and broadcast facilities.
          </p>
        </div>

        {/* View Switcher: Grid vs Map */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              viewMode === 'grid' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Grid View
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              viewMode === 'map' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" /> Interactive Map Area
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by arena name, amenities..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Sport Filter */}
          <select
            value={selectedSport}
            onChange={e => setSelectedSport(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            {sportsList.map(s => (
              <option key={s} value={s}>{s === 'ALL' ? 'All Sports' : s}</option>
            ))}
          </select>

          {/* City Filter */}
          <select
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            {citiesList.map(c => (
              <option key={c} value={c}>{c === 'ALL' ? 'All Locations' : c}</option>
            ))}
          </select>

          {/* Indoor / Outdoor */}
          <select
            value={indoorFilter}
            onChange={e => setIndoorFilter(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">Indoor & Outdoor</option>
            <option value="INDOOR">Indoor Only</option>
            <option value="OUTDOOR">Outdoor Stadium Only</option>
          </select>
        </div>
      </div>

      {/* Map View Mode */}
      {viewMode === 'map' && (
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 h-96 flex flex-col items-center justify-center p-6 bg-grid-pattern shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-slate-950/90" />
          
          {/* Mock Interactive Map Points */}
          <div className="relative z-10 w-full max-w-4xl h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Badge variant="primary" className="bg-slate-900/90 backdrop-blur-md">
                Bay Area Regional Sports GIS (Live View)
              </Badge>
              <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                {filteredArenas.length} Venues Active
              </span>
            </div>

            {/* Simulated Map Markers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-auto">
              {filteredArenas.map((arena, i) => (
                <div
                  key={arena.id}
                  onClick={() => setBookingArena(arena)}
                  className="p-3 bg-slate-900/90 border border-emerald-500/50 hover:border-emerald-400 rounded-2xl shadow-xl backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
                    <MapPin className="w-3.5 h-3.5 fill-emerald-500 text-slate-950" />
                    <span className="truncate">{arena.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">{arena.city} · ${arena.hourlyRate}/hr</p>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Click any venue pin above to preview court slots and book directly.
            </p>
          </div>
        </div>
      )}

      {/* Grid View Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArenas.map((arena) => (
            <ArenaCard
              key={arena.id}
              arena={arena}
              onBook={(a) => setBookingArena(a)}
            />
          ))}
        </div>
      )}

      {/* Slot Booking Modal */}
      {bookingArena && (
        <Modal
          isOpen={!!bookingArena}
          onClose={() => setBookingArena(null)}
          title={`Reserve Court at ${bookingArena.name}`}
          description={`${bookingArena.address} · $${bookingArena.hourlyRate}/hour`}
          maxWidth="2xl"
        >
          <div className="space-y-6 text-xs text-slate-300">
            {/* Date Picker */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">Select Booking Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={e => setBookingDate(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                />
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Operating Hours:</span>
                <p className="text-slate-200 font-bold">{bookingArena.operatingHours.open} - {bookingArena.operatingHours.close}</p>
              </div>
            </div>

            {/* Slots Matrix */}
            <div>
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-3">Available Court Slots</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                {arenaSlots.map((slot) => {
                  const isAvail = slot.status === 'AVAILABLE';
                  const isSelected = selectedSlot?.id === slot.id;

                  return (
                    <div
                      key={slot.id}
                      onClick={() => isAvail && setSelectedSlot(slot)}
                      className={`p-3 rounded-xl border text-xs transition-all ${
                        !isAvail
                          ? 'border-slate-800/60 bg-slate-950/40 opacity-50 cursor-not-allowed'
                          : isSelected
                          ? 'border-emerald-500 bg-emerald-500/20 shadow-lg shadow-emerald-500/10 cursor-pointer'
                          : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-100">{slot.courtName}</span>
                        <Badge
                          variant={slot.status === 'AVAILABLE' ? 'success' : slot.status === 'TOURNAMENT' ? 'primary' : 'secondary'}
                          size="sm"
                        >
                          {slot.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-slate-400 text-[11px]">
                        <span>{slot.startTime} - {slot.endTime}</span>
                        <span className="text-emerald-400 font-bold">${slot.price}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Booking Summary */}
            {selectedSlot && (
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-emerald-400">Selected Slot:</p>
                  <p className="text-slate-200">{selectedSlot.courtName} ({selectedSlot.startTime} - {selectedSlot.endTime})</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400">Total Due:</p>
                  <p className="text-xl font-black text-white font-display">${selectedSlot.price}</p>
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setBookingArena(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={!selectedSlot}
                onClick={handleConfirmBooking}
              >
                Confirm Reservation & Pay
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
