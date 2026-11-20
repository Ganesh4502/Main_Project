import React, { useState, useEffect } from 'react';
import { Search, UserCheck, Shield, UserX, Trash2, Edit, CheckCircle2, AlertTriangle, Plus } from 'lucide-react';
import { userApi } from '../../api/userApi';
import { User, UserRole } from '../../types';
import { Table, Column } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal, ConfirmationDialog } from '../../components/ui/Modal';
import { useNotification } from '../../context/NotificationContext';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ isOpen: boolean; user: User | null; action: 'DEACTIVATE' | 'ACTIVATE' | 'SUSPEND' | 'DELETE' }>({
    isOpen: false,
    user: null,
    action: 'DEACTIVATE',
  });
  const { showToast } = useNotification();

  const fetchUsers = () => {
    setIsLoading(true);
    userApi.getAll().then(data => {
      setUsers(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleActionConfirm = async () => {
    if (!confirmDialog.user) return;
    const target = confirmDialog.user;

    if (confirmDialog.action === 'DELETE') {
      await userApi.delete(target.id);
      showToast('success', 'User Removed', `${target.name} has been deleted from Spotix.`);
    } else {
      const newStatus = confirmDialog.action === 'ACTIVATE' ? 'ACTIVE' : confirmDialog.action === 'SUSPEND' ? 'SUSPENDED' : 'INACTIVE';
      await userApi.updateStatus(target.id, newStatus);
      showToast('success', 'Status Updated', `${target.name} is now ${newStatus}.`);
    }

    setConfirmDialog({ isOpen: false, user: null, action: 'DEACTIVATE' });
    fetchUsers();
  };

  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchStatus = statusFilter === 'ALL' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const columns: Column<User>[] = [
    {
      header: 'User Identity',
      cell: (u) => (
        <div className="flex items-center gap-3">
          <img src={u.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} alt={u.name} className="w-9 h-9 rounded-xl object-cover border border-slate-700" />
          <div>
            <p className="font-bold text-slate-100">{u.name}</p>
            <p className="text-[11px] text-slate-400">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Assigned Role',
      cell: (u) => <Badge variant="primary" size="sm">{u.role.replace('_', ' ')}</Badge>,
    },
    {
      header: 'Account Status',
      cell: (u) => (
        <Badge
          variant={u.status === 'ACTIVE' ? 'success' : u.status === 'SUSPENDED' ? 'danger' : 'warning'}
          size="sm"
          dot
        >
          {u.status}
        </Badge>
      ),
    },
    {
      header: 'Joined Date',
      cell: (u) => <span className="text-xs text-slate-400">{new Date(u.createdAt).toLocaleDateString()}</span>,
    },
    {
      header: 'Last Session',
      cell: (u) => <span className="text-xs text-slate-400">{new Date(u.lastLoginAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>,
    },
    {
      header: 'Actions',
      cell: (u) => (
        <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => setSelectedUser(u)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="View Details"
          >
            <Edit className="w-4 h-4" />
          </button>
          {u.status === 'ACTIVE' ? (
            <button
              onClick={() => setConfirmDialog({ isOpen: true, user: u, action: 'DEACTIVATE' })}
              className="p-1.5 text-amber-400 hover:text-amber-300 rounded-lg hover:bg-amber-500/10 transition-colors"
              title="Deactivate Account"
            >
              <UserX className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setConfirmDialog({ isOpen: true, user: u, action: 'ACTIVATE' })}
              className="p-1.5 text-emerald-400 hover:text-emerald-300 rounded-lg hover:bg-emerald-500/10 transition-colors"
              title="Activate Account"
            >
              <UserCheck className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setConfirmDialog({ isOpen: true, user: u, action: 'DELETE' })}
            className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10 transition-colors"
            title="Delete User"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-display">User & Athlete Directory</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage permissions, activation states, and registered personas across Spotix</p>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="ALL">All Roles ({users.length})</option>
          <option value="SUPER_ADMIN">Super Admins</option>
          <option value="SPONSOR">Sponsors</option>
          <option value="ORGANIZER">Tournament Organizers</option>
          <option value="ARENA_MANAGER">Arena Managers</option>
          <option value="TEAM_MANAGER">Team Managers</option>
          <option value="PLAYER">Players / Athletes</option>
          <option value="OFFICIAL">Officials / Referees</option>
          <option value="SPECTATOR">Spectators</option>
        </select>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="ALL">All Account Statuses</option>
          <option value="ACTIVE">Active Only</option>
          <option value="INACTIVE">Inactive Only</option>
          <option value="SUSPENDED">Suspended Only</option>
        </select>
      </div>

      {/* Table */}
      <Table
        data={filteredUsers}
        columns={columns}
        keyExtractor={u => u.id}
        isLoading={isLoading}
        onRowClick={u => setSelectedUser(u)}
      />

      {/* View/Edit User Modal */}
      {selectedUser && (
        <Modal
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          title={`User Profile: ${selectedUser.name}`}
          description={`ID: ${selectedUser.id} · Role: ${selectedUser.role}`}
        >
          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <img src={selectedUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} alt={selectedUser.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-700" />
              <div>
                <h4 className="text-base font-bold text-slate-100">{selectedUser.name}</h4>
                <p className="text-slate-400">{selectedUser.email}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="primary" size="sm">{selectedUser.role.replace('_', ' ')}</Badge>
                  <Badge variant={selectedUser.status === 'ACTIVE' ? 'success' : 'danger'} size="sm">{selectedUser.status}</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-slate-500 text-[10px] uppercase font-bold">Organization / Club</p>
                <p className="text-slate-200 font-semibold mt-0.5">{selectedUser.organization || 'Independent'}</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-slate-500 text-[10px] uppercase font-bold">Member Since</p>
                <p className="text-slate-200 font-semibold mt-0.5">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setSelectedUser(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, user: null, action: 'DEACTIVATE' })}
        onConfirm={handleActionConfirm}
        title={`${confirmDialog.action} User Account?`}
        message={`Are you sure you want to ${confirmDialog.action.toLowerCase()} ${confirmDialog.user?.name}'s account? This action alters platform access immediately.`}
        confirmText={`Yes, ${confirmDialog.action}`}
        variant={confirmDialog.action === 'DELETE' || confirmDialog.action === 'SUSPEND' ? 'danger' : 'warning'}
      />
    </div>
  );
};
