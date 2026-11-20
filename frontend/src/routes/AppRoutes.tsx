import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts & Guards
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { SportsPage } from '../pages/public/SportsPage';
import { ArenasPage } from '../pages/public/ArenasPage';
import { TournamentsPage } from '../pages/public/TournamentsPage';
import { TournamentDetailsPage } from '../pages/public/TournamentDetailsPage';
import { AboutPage } from '../pages/public/AboutPage';
import { ContactPage } from '../pages/public/ContactPage';
import { FAQPage } from '../pages/public/FAQPage';

// Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage, ResetPasswordPage, VerifyEmailPage } from '../pages/auth/ForgotPasswordPages';

// Dashboard Pages
import { SuperAdminDashboard } from '../pages/dashboard/SuperAdminDashboard';
import { AdminUsersPage } from '../pages/dashboard/AdminUsersPage';
import { AdminRolesPage } from '../pages/dashboard/AdminRolesPage';
import { AdminSportsPage } from '../pages/dashboard/AdminSportsPage';
import { AdminOfficialsPage } from '../pages/dashboard/AdminOfficialsPage';
import { SponsorDashboard } from '../pages/dashboard/SponsorDashboard';
import { OrganizerDashboard } from '../pages/dashboard/OrganizerDashboard';
import { OrganizerTournamentsPage } from '../pages/dashboard/OrganizerTournamentsPage';
import { OrganizerCreateTournamentPage } from '../pages/dashboard/OrganizerCreateTournamentPage';
import { OrganizerTournamentDetailPage } from '../pages/dashboard/OrganizerTournamentDetailPage';
import { AIFixtureGeneratorPage } from '../pages/dashboard/AIFixtureGeneratorPage';
import { AIOfficialAssignmentPage } from '../pages/dashboard/AIOfficialAssignmentPage';
import { FixtureManagementPage, MatchManagementPage } from '../pages/dashboard/MatchAndFixturePages';
import {
  ArenaManagerDashboard,
  ArenaMyArenasPage,
  ArenaSlotManagementPage,
  ArenaBookingsPage
} from '../pages/dashboard/ArenaManagerPages';
import {
  TeamManagerDashboard,
  TeamManagementPage,
  TeamPlayerManagementPage
} from '../pages/dashboard/TeamManagerPages';
import {
  PlayerDashboard,
  OfficialDashboard,
  OfficialAvailabilityPage
} from '../pages/dashboard/PlayerAndOfficialPages';
import { LiveMatchCenterPage } from '../pages/dashboard/LiveMatchCenterPage';
import { OfficialScoringControlPage } from '../pages/dashboard/OfficialScoringControlPage';
import { SpectatorPortalPage, NotificationsPage } from '../pages/dashboard/SpectatorAndNotificationPages';
import { AnalyticsDashboardPage } from '../pages/dashboard/AnalyticsDashboardPage';
import { ProfilePage, SettingsPage } from '../pages/dashboard/ProfileAndSettingsPages';
import {
  NotFoundPage,
  ForbiddenPage,
  ServerErrorPage,
  NetworkErrorPage,
  MaintenancePage
} from '../pages/dashboard/ErrorPages';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/arenas" element={<ArenasPage />} />
        <Route path="/tournaments" element={<TournamentsPage />} />
        <Route path="/tournaments/:id" element={<TournamentDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Route>

      {/* Public-Only Auth Routes (Redirect logged-in users away to their dashboard) */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>

      {/* Authenticated & Role-Guarded Dashboards */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Super Admin Only */}
          <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN']} />}>
            <Route path="/admin/dashboard" element={<SuperAdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/roles" element={<AdminRolesPage />} />
            <Route path="/admin/sports" element={<AdminSportsPage />} />
            <Route path="/admin/officials" element={<AdminOfficialsPage />} />
          </Route>

          {/* Sponsor Only */}
          <Route element={<ProtectedRoute allowedRoles={['SPONSOR']} />}>
            <Route path="/sponsor/dashboard" element={<SponsorDashboard />} />
            <Route path="/sponsor/officials" element={<AdminOfficialsPage isSponsorView={true} />} />
          </Route>

          {/* Organizer Only */}
          <Route element={<ProtectedRoute allowedRoles={['ORGANIZER']} />}>
            <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
            <Route path="/organizer/tournaments" element={<OrganizerTournamentsPage />} />
            <Route path="/organizer/tournaments/create" element={<OrganizerCreateTournamentPage />} />
            <Route path="/organizer/tournaments/:id" element={<OrganizerTournamentDetailPage />} />
            <Route path="/organizer/tournaments/:id/ai-fixture" element={<AIFixtureGeneratorPage />} />
            <Route path="/organizer/matches/:id/ai-official" element={<AIOfficialAssignmentPage />} />
            <Route path="/organizer/tournaments/:id/fixtures" element={<FixtureManagementPage />} />
            <Route path="/organizer/matches" element={<MatchManagementPage />} />
          </Route>

          {/* Arena Manager Only */}
          <Route element={<ProtectedRoute allowedRoles={['ARENA_MANAGER']} />}>
            <Route path="/arena/dashboard" element={<ArenaManagerDashboard />} />
            <Route path="/arena/my-arenas" element={<ArenaMyArenasPage />} />
            <Route path="/arena/:id/slots" element={<ArenaSlotManagementPage />} />
            <Route path="/arena/bookings" element={<ArenaBookingsPage />} />
          </Route>

          {/* Team Manager Only */}
          <Route element={<ProtectedRoute allowedRoles={['TEAM_MANAGER']} />}>
            <Route path="/team/dashboard" element={<TeamManagerDashboard />} />
            <Route path="/team/players" element={<TeamPlayerManagementPage />} />
          </Route>

          {/* Team and Player Shared View */}
          <Route element={<ProtectedRoute allowedRoles={['TEAM_MANAGER', 'PLAYER']} />}>
            <Route path="/team" element={<TeamManagementPage />} />
          </Route>

          {/* Player Only */}
          <Route element={<ProtectedRoute allowedRoles={['PLAYER']} />}>
            <Route path="/player/dashboard" element={<PlayerDashboard />} />
          </Route>

          {/* Official Only */}
          <Route element={<ProtectedRoute allowedRoles={['OFFICIAL']} />}>
            <Route path="/official/dashboard" element={<OfficialDashboard />} />
            <Route path="/official/availability" element={<OfficialAvailabilityPage />} />
          </Route>

          {/* Official Live Scoring Control (Official and Super Admin) */}
          <Route element={<ProtectedRoute allowedRoles={['OFFICIAL', 'SUPER_ADMIN']} />}>
            <Route path="/official/matches/:id/control" element={<OfficialScoringControlPage />} />
          </Route>

          {/* Live Match Center & Spectator */}
          <Route path="/matches/:id/live" element={<LiveMatchCenterPage />} />
          <Route path="/spectator" element={<SpectatorPortalPage />} />

          {/* Shared Authenticated Pages */}
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/analytics" element={<AnalyticsDashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Errors & Status Pages */}
      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="/500" element={<ServerErrorPage />} />
      <Route path="/network-error" element={<NetworkErrorPage />} />
      <Route path="/maintenance" element={<MaintenancePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

