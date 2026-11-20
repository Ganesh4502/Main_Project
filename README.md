# Spotix Sports Tournament & Arena Management Platform

A high-performance sports management ecosystem featuring an interactive React + TypeScript frontend and an enterprise-grade Java 21 + Spring Boot 3 REST API backend.

---

## Architecture Overview

```
Main_Project/
├── frontend/               # React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion
│   ├── src/
│   │   ├── api/            # API client connected to http://localhost:8080/api/v1
│   │   ├── components/     # UI design system & shared components
│   │   ├── context/        # Auth & Role-based Access Control context
│   │   ├── pages/          # Tournament, Arena, Team, Player, Match, Analytics portals
│   │   └── types/          # Full TypeScript interfaces
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                # Java 21 + Spring Boot 3.4 REST API
│   ├── src/main/java/com/spotix/backend/
│   │   ├── config/         # SecurityFilterChain, JWT Utils, and CORS configuration
│   │   ├── controller/     # REST Endpoints (/auth, /tournaments, /arenas, /matches, /teams, /ai, /analytics)
│   │   ├── dto/            # Data Transfer Objects (Login, Register, AuthResponse)
│   │   ├── model/          # Domain Entities (User, Tournament, Arena, Match, Team, etc.)
│   │   └── repository/     # DataStore initialized with pre-seeded data
│   ├── src/main/resources/ # application.properties (Port 8080, Context Path /api/v1)
│   ├── mvnw.cmd            # Maven Wrapper
│   └── pom.xml
│
├── run-backend.ps1         # One-click PowerShell script to launch Spring Boot backend
├── run-frontend.ps1        # One-click PowerShell script to launch React frontend
├── package.json            # Monorepo task orchestration
└── README.md
```

---

## Getting Started

### 1. Run the Spring Boot Backend

The backend runs on **port 8080** with base URL `http://localhost:8080/api/v1`.

Run via PowerShell:
```powershell
.\run-backend.ps1
```

Or manually:
```powershell
cd backend
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
.\mvnw.cmd spring-boot:run
```

### 2. Run the Frontend

The frontend runs on **port 5173**.

Run via PowerShell:
```powershell
.\run-frontend.ps1
```

Or manually:
```powershell
cd frontend
npm run dev
```

---

## Default Seeded Credentials

| Role | Email | Password |
|---|---|---|
| **Super Admin** | `admin@spotix.io` | `SpotixAdmin2026!` |
| **Sponsor** | `sponsor@redbullsports.com` | `SpotixSponsor2026!` |
| **Organizer** | `organizer@spotix.io` | `SpotixOrganizer2026!` |
| **Arena Manager** | `arena@apexcomplex.com` | `SpotixArena2026!` |
| **Team Manager** | `manager@cyberknights.com` | `SpotixTeam2026!` |
| **Player** | `player@spotix.io` | `SpotixPlayer2026!` |
| **Official / Referee** | `official@spotix.io` | `SpotixOfficial2026!` |
| **Spectator** | `spectator@spotix.io` | `SpotixSpectator2026!` |

---

## API Endpoints Summary

- **Authentication**: `POST /auth/login`, `POST /auth/register`, `GET /auth/me`, `POST /auth/refresh`, `POST /auth/logout`
- **Tournaments**: `GET /tournaments`, `POST /tournaments`, `GET /tournaments/{id}`, `PATCH /tournaments/{id}/status`, `GET /tournaments/{id}/fixtures`, `GET /tournaments/{id}/registrations`
- **Arenas & Slots**: `GET /arenas`, `POST /arenas`, `GET /arenas/{id}`, `GET /arenas/{id}/slots`, `POST /slots`, `PATCH /slots/{id}/status`
- **Matches & Live Scoring**: `GET /matches`, `GET /matches/{id}`, `PATCH /matches/{id}/score`, `POST /matches/{id}/events`, `PATCH /matches/{id}/status`, `PATCH /matches/{id}/assign-official`
- **Teams, Rosters & Officials**: `GET /teams`, `POST /teams`, `GET /players`, `POST /players`, `DELETE /players/{id}`, `GET /officials`, `POST /officials`, `PATCH /officials/{id}/availability`
- **Bookings**: `GET /bookings`, `POST /bookings`, `PATCH /bookings/{id}/status`
- **AI Automation**: `POST /ai/fixtures/generate`, `GET /ai/matches/{id}/officials`
- **Analytics & KPIs**: `GET /analytics/kpis`, `GET /analytics/growth`, `GET /analytics/sports-popularity`, `GET /analytics/arena-utilization`
