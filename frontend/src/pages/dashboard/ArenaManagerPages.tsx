import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Check,
  Building
} from 'lucide-react';
import { arenaApi } from '../../api/arenaApi';
import { bookingApi } from '../../api/bookingApi';
import { MOCK_ARENAS, MOCK_ARENA_SLOTS, MOCK_BOOKINGS } from '../../api/mockData';
import { StatCard } from '../../components/ui/StatCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Table, Column } from '../../components/ui/Table';
import { useNotification } from '../../context/NotificationContext';
import { Arena, ArenaSlot, Booking, SlotStatus } from '../../types';

export const ArenaManagerDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white font-display">Arena Manager Hub</h1>
            <Badge variant="primary">Apex Complex</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Manage sports courts, daily slot reservations, and maintenance windows.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="glow"
            size="sm"
            onClick={() => navigate('/arena/arena-1/slots')}
            leftIcon={<Calendar className="w-4 h-4" />}
          >
            Slot Calendar
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Arenas" value="3 Venues" change="2 Active" isPositive={true} icon={<MapPin className="w-5 h-5" />} color="blue" />
        <StatCard title="Today's Bookings" value="18 Slots" change="+4 from yesterday" isPositive={true} icon={<Clock className="w-5 h-5" />} color="emerald" />
        <StatCard title="Available Slots" value="12 Slots" change="Open for booking" isPositive={true} icon={<Calendar className="w-5 h-5" />} color="amber" />
        <StatCard title="Upcoming Tourneys" value="4 Hosted" change="Spotix Elite" isPositive={true} icon={<Building className="w-5 h-5" />} color="purple" />
        <StatCard title="Slot Utilization" value="88.4%" change="+5.2% vs avg" isPositive={true} icon={<TrendingUp className="w-5 h-5" />} color="emerald" />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          variant="interactive"
          className="p-6 border border-slate-800 space-y-3 cursor-pointer"
          onClick={() => navigate('/arena/my-arenas')}
        >
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit">
            <Building className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-100">My Arenas & Venues</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Update operating hours, facilities, hardwood specifications, and court photo galleries.</p>
        </Card>

        <Card
          variant="interactive"
          className="p-6 border border-slate-800 space-y-3 cursor-pointer"
          onClick={() => navigate('/arena/arena-1/slots')}
        >
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-100">Slot & Court Calendar</h3>
          <p className="text-xs text-slate-400 leading-relaxed">View interactive time matrix, block slots for maintenance, and assign tournament windows.</p>
        </Card>

        <Card
          variant="interactive"
          className="p-6 border border-slate-800 space-y-3 cursor-pointer"
          onClick={() => navigate('/arena/bookings')}
        >
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl w-fit">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-100">Booking Requests</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Review athlete reservations, payment confirmations, and practice slot requests.</p>
        </Card>
      </div>
    </div>
  );
};

export const ArenaMyArenasPage: React.FC = () => {
  const [arenas, setArenas] = useState<Arena[]>(MOCK_ARENAS);
  const [selectedArena, setSelectedArena] = useState<Arena | null>(null);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white font-display">My Sports Arenas & Facilities</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage venue configurations, courts, and hourly tariff structures.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {arenas.map((arena) => (
          <Card key={arena.id} className="p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <img src={arena.images[0]} alt={arena.name} className="w-full h-44 rounded-xl object-cover mb-4" />
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-slate-100">{arena.name}</h3>
                <span className="text-emerald-400 font-bold text-sm font-display">${arena.hourlyRate}/hr</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{arena.address}</p>

              <div className="flex flex-wrap gap-1 mt-3">
                {arena.sports.map(s => (
                  <span key={s} className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex gap-2 border-t border-slate-800 mt-4">
              <Button
                variant="primary"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => navigate(`/arena/${arena.id}/slots`)}
              >
                Manage Slots
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const ArenaSlotManagementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [slots, setSlots] = useState<ArenaSlot[]>(MOCK_ARENA_SLOTS);
  const [selectedDate, setSelectedDate] = useState('2026-10-06');
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [newSlotData, setNewSlotData] = useState<Partial<ArenaSlot>>({
    courtName: 'Court A (Main Arena)',
    startTime: '08:00 AM',
    endTime: '10:00 AM',
    price: 150,
    status: 'AVAILABLE',
  });
  const { showToast } = useNotification();

  const handleStatusChange = async (slotId: string, status: SlotStatus) => {
    const updated = await arenaApi.updateSlotStatus(slotId, status);
    setSlots(prev => prev.map(s => (s.id === slotId ? updated : s)));
    showToast('success', 'Slot Status Updated', `Slot is now set to ${status}.`);
  };

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await arenaApi.createSlot({
      ...newSlotData,
      arenaId: id || 'arena-1',
      date: selectedDate,
    });
    setSlots(prev => [...prev, created]);
    showToast('success', 'Slot Created', `Slot added for ${created.courtName}.`);
    setIsSlotModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-display">Arena Slot & Court Calendar</h1>
          <p className="text-xs text-slate-400 mt-0.5">Control availability, block maintenance hours, and allocate tournament slots.</p>
        </div>

        <Button
          variant="glow"
          size="sm"
          onClick={() => setIsSlotModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add New Slot
        </Button>
      </div>

      {/* Date Picker Bar */}
      <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-300">Select Date:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-100"
          />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" size="sm">Available</Badge>
          <Badge variant="primary" size="sm">Tournament</Badge>
          <Badge variant="warning" size="sm">Maintenance</Badge>
          <Badge variant="secondary" size="sm">Blocked</Badge>
        </div>
      </div>

      {/* Slots Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.map((slot) => (
          <Card key={slot.id} className="p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-100 text-sm">{slot.courtName}</span>
              <Badge
                variant={slot.status === 'AVAILABLE' ? 'success' : slot.status === 'TOURNAMENT' ? 'primary' : slot.status === 'MAINTENANCE' ? 'warning' : 'secondary'}
                size="sm"
              >
                {slot.status}
              </Badge>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>{slot.startTime} - {slot.endTime}</span>
              <span className="text-emerald-400 font-bold">${slot.price}</span>
            </div>

            {slot.purpose && (
              <p className="text-[11px] text-slate-500 italic">Purpose: {slot.purpose}</p>
            )}

            <div className="pt-3 border-t border-slate-800 flex gap-1.5 text-xs">
              <button
                onClick={() => handleStatusChange(slot.id, 'AVAILABLE')}
                className="px-2 py-1 bg-slate-950 text-emerald-400 rounded-lg hover:bg-emerald-500/10 text-[11px]"
              >
                Set Available
              </button>
              <button
                onClick={() => handleStatusChange(slot.id, 'MAINTENANCE')}
                className="px-2 py-1 bg-slate-950 text-amber-400 rounded-lg hover:bg-amber-500/10 text-[11px]"
              >
                Maintenance
              </button>
              <button
                onClick={() => handleStatusChange(slot.id, 'BLOCKED')}
                className="px-2 py-1 bg-slate-950 text-slate-400 rounded-lg hover:bg-slate-800 text-[11px]"
              >
                Block
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Slot Modal */}
      {isSlotModalOpen && (
        <Modal
          isOpen={isSlotModalOpen}
          onClose={() => setIsSlotModalOpen(false)}
          title="Create Court Slot"
          description={`Add a booking slot for ${selectedDate}`}
        >
          <form onSubmit={handleCreateSlot} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Court Name</label>
              <input
                type="text"
                required
                value={newSlotData.courtName}
                onChange={e => setNewSlotData({ ...newSlotData, courtName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Start Time</label>
                <input
                  type="text"
                  value={newSlotData.startTime}
                  onChange={e => setNewSlotData({ ...newSlotData, startTime: e.target.value })}
                  placeholder="08:00 AM"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">End Time</label>
                <input
                  type="text"
                  value={newSlotData.endTime}
                  onChange={e => setNewSlotData({ ...newSlotData, endTime: e.target.value })}
                  placeholder="10:00 AM"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Slot Tariff ($)</label>
              <input
                type="number"
                value={newSlotData.price}
                onChange={e => setNewSlotData({ ...newSlotData, price: parseInt(e.target.value, 10) })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsSlotModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Add Slot
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export const ArenaBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const { showToast } = useNotification();

  const handleStatus = async (id: string, status: Booking['status']) => {
    const updated = await bookingApi.updateStatus(id, status);
    setBookings(prev => prev.map(b => (b.id === id ? updated : b)));
    showToast('success', 'Booking Updated', `Status changed to ${status}.`);
  };

  const columns: Column<Booking>[] = [
    { header: 'Booking #', cell: b => <span className="font-mono font-bold text-slate-200">{b.bookingNumber}</span> },
    {
      header: 'Client / User',
      cell: b => (
        <div>
          <p className="font-bold text-slate-100">{b.userName}</p>
          <p className="text-[11px] text-slate-400">{b.userEmail}</p>
        </div>
      ),
    },
    { header: 'Arena & Court', cell: b => <span>{b.arenaName} ({b.courtName})</span> },
    { header: 'Date & Time', cell: b => <span>{b.date} · {b.startTime} - {b.endTime}</span> },
    { header: 'Amount', cell: b => <span className="font-bold text-emerald-400">${b.totalAmount}</span> },
    {
      header: 'Status',
      cell: b => (
        <Badge
          variant={b.status === 'APPROVED' ? 'success' : b.status === 'REJECTED' ? 'danger' : 'warning'}
          size="sm"
        >
          {b.status}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      cell: b => (
        <div className="flex items-center gap-1.5">
          {b.status === 'PENDING' && (
            <>
              <button
                onClick={() => handleStatus(b.id, 'APPROVED')}
                className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded-lg"
                title="Approve"
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleStatus(b.id, 'REJECTED')}
                className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                title="Reject"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white font-display">Arena Booking Management</h1>
        <p className="text-xs text-slate-400 mt-0.5">Manage customer slot reservations, payment statuses, and court assignments.</p>
      </div>

      <Table data={bookings} columns={columns} keyExtractor={b => b.id} />
    </div>
  );
};
