package com.spotix.backend.repository;

import com.spotix.backend.model.*;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class DataStore {

    public final List<User> users = new CopyOnWriteArrayList<>();
    public final List<Sport> sports = new CopyOnWriteArrayList<>();
    public final List<Arena> arenas = new CopyOnWriteArrayList<>();
    public final List<ArenaSlot> arenaSlots = new CopyOnWriteArrayList<>();
    public final List<Booking> bookings = new CopyOnWriteArrayList<>();
    public final List<Tournament> tournaments = new CopyOnWriteArrayList<>();
    public final List<TeamRegistration> teamRegistrations = new CopyOnWriteArrayList<>();
    public final List<Team> teams = new CopyOnWriteArrayList<>();
    public final List<Player> players = new CopyOnWriteArrayList<>();
    public final List<Official> officials = new CopyOnWriteArrayList<>();
    public final List<Match> matches = new CopyOnWriteArrayList<>();
    public final List<NotificationItem> notifications = new CopyOnWriteArrayList<>();

    @PostConstruct
    public void init() {
        seedUsers();
        seedSports();
        seedArenas();
        seedSlots();
        seedBookings();
        seedTournaments();
        seedRegistrations();
        seedTeams();
        seedPlayers();
        seedOfficials();
        seedMatches();
        seedNotifications();
    }

    private void seedUsers() {
        users.add(User.builder()
                .id("u-admin")
                .name("Alexander Vance")
                .firstName("Alexander")
                .lastName("Vance")
                .email("admin@spotix.io")
                .password("SpotixAdmin2026!")
                .role(UserRole.SUPER_ADMIN)
                .avatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80")
                .status("ACTIVE")
                .createdAt("2025-01-10T09:00:00Z")
                .lastLoginAt("2026-10-05T08:15:00Z")
                .organization("Spotix Global HQ")
                .build());

        users.add(User.builder()
                .id("u-sponsor")
                .name("Elena Rostova")
                .firstName("Elena")
                .lastName("Rostova")
                .email("sponsor@redbullsports.com")
                .password("SpotixSponsor2026!")
                .role(UserRole.SPONSOR)
                .avatarUrl("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80")
                .status("ACTIVE")
                .createdAt("2025-02-14T11:20:00Z")
                .lastLoginAt("2026-10-04T16:30:00Z")
                .organization("Apex Sport Ventures & Red Bull Labs")
                .build());

        users.add(User.builder()
                .id("u-organizer")
                .name("Marcus Sterling")
                .firstName("Marcus")
                .lastName("Sterling")
                .email("organizer@spotix.io")
                .password("SpotixOrganizer2026!")
                .role(UserRole.ORGANIZER)
                .avatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80")
                .status("ACTIVE")
                .createdAt("2025-03-01T10:00:00Z")
                .lastLoginAt("2026-10-05T09:45:00Z")
                .organization("Metropolitan Athletics Federation")
                .build());

        users.add(User.builder()
                .id("u-arena")
                .name("David Chen")
                .firstName("David")
                .lastName("Chen")
                .email("arena@apexcomplex.com")
                .password("SpotixArena2026!")
                .role(UserRole.ARENA_MANAGER)
                .avatarUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80")
                .status("ACTIVE")
                .createdAt("2025-03-12T14:30:00Z")
                .lastLoginAt("2026-10-05T07:10:00Z")
                .organization("Apex Olympic Complex & Arena Hub")
                .build());

        users.add(User.builder()
                .id("u-team")
                .name("Samantha Ray")
                .firstName("Samantha")
                .lastName("Ray")
                .email("manager@cyberknights.com")
                .password("SpotixTeam2026!")
                .role(UserRole.TEAM_MANAGER)
                .avatarUrl("https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80")
                .status("ACTIVE")
                .createdAt("2025-04-05T12:00:00Z")
                .lastLoginAt("2026-10-05T10:00:00Z")
                .organization("Cyber Knights Basketball Club")
                .build());

        users.add(User.builder()
                .id("u-player")
                .name("Jordan Rivera")
                .firstName("Jordan")
                .lastName("Rivera")
                .email("player@spotix.io")
                .password("SpotixPlayer2026!")
                .role(UserRole.PLAYER)
                .avatarUrl("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80")
                .status("ACTIVE")
                .createdAt("2025-04-18T16:00:00Z")
                .lastLoginAt("2026-10-05T10:20:00Z")
                .build());

        users.add(User.builder()
                .id("u-official")
                .name("Rahul Kumar")
                .firstName("Rahul")
                .lastName("Kumar")
                .email("official@spotix.io")
                .password("SpotixOfficial2026!")
                .role(UserRole.OFFICIAL)
                .avatarUrl("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80")
                .status("ACTIVE")
                .createdAt("2025-05-02T08:00:00Z")
                .lastLoginAt("2026-10-05T06:50:00Z")
                .organization("FIBA Certified Officials Panel")
                .build());

        users.add(User.builder()
                .id("u-spectator")
                .name("Chloe Bennett")
                .firstName("Chloe")
                .lastName("Bennett")
                .email("spectator@spotix.io")
                .password("SpotixSpectator2026!")
                .role(UserRole.SPECTATOR)
                .avatarUrl("https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80")
                .status("ACTIVE")
                .createdAt("2025-06-15T15:00:00Z")
                .lastLoginAt("2026-10-05T10:15:00Z")
                .build());
    }

    private void seedSports() {
        sports.add(Sport.builder()
                .id("sport-1")
                .name("Basketball")
                .slug("basketball")
                .category("Team")
                .icon("Flame")
                .description("High-octane full-court action with 5v5 team dynamics, slam dunks, and fastbreak scoring.")
                .minPlayers(5)
                .maxPlayers(12)
                .officialsRequired(3)
                .rules(List.of("4 quarters of 10/12 minutes", "24-second shot clock", "5 team fouls per quarter bonus penalty"))
                .imageUrl("https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80")
                .popularArenasCount(18)
                .upcomingTournamentsCount(14)
                .activePlayersCount(2450)
                .isActive(true)
                .build());

        sports.add(Sport.builder()
                .id("sport-2")
                .name("Football / Soccer")
                .slug("football")
                .category("Team")
                .icon("Trophy")
                .description("The world’s most popular pitch battle with 11v11 precision tactics, stamina, and dramatic finishes.")
                .minPlayers(11)
                .maxPlayers(18)
                .officialsRequired(4)
                .rules(List.of("2 halves of 45 minutes", "FIFA standard offside rules", "VAR and assistant referee review"))
                .imageUrl("https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80")
                .popularArenasCount(24)
                .upcomingTournamentsCount(22)
                .activePlayersCount(5200)
                .isActive(true)
                .build());

        sports.add(Sport.builder()
                .id("sport-3")
                .name("Cricket")
                .slug("cricket")
                .category("Team")
                .icon("Shield")
                .description("T20, One Day, and Super 8 league showdowns with powerful boundaries, swing bowling, and fielding heroics.")
                .minPlayers(11)
                .maxPlayers(16)
                .officialsRequired(2)
                .rules(List.of("T20: 20 overs per side", "Powerplay overs 1-6", "DRS and TV umpire reviews enabled"))
                .imageUrl("https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=80")
                .popularArenasCount(12)
                .upcomingTournamentsCount(9)
                .activePlayersCount(3800)
                .isActive(true)
                .build());

        sports.add(Sport.builder()
                .id("sport-4")
                .name("Volleyball")
                .slug("volleyball")
                .category("Team")
                .icon("Zap")
                .description("Electrifying 6v6 aerial battles featuring high spikes, diving digs, and lightning set pieces.")
                .minPlayers(6)
                .maxPlayers(12)
                .officialsRequired(2)
                .rules(List.of("Best of 3 or 5 sets to 25 points", "Deciding set to 15 points", "Libero rotation rules apply"))
                .imageUrl("https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&auto=format&fit=crop&q=80")
                .popularArenasCount(15)
                .upcomingTournamentsCount(8)
                .activePlayersCount(1650)
                .isActive(true)
                .build());

        sports.add(Sport.builder()
                .id("sport-5")
                .name("Badminton")
                .slug("badminton")
                .category("Racquet")
                .icon("Activity")
                .description("Rapid-fire shuttlecock clashes testing lightning reflexes, deceptive drops, and jump smashes.")
                .minPlayers(1)
                .maxPlayers(2)
                .officialsRequired(2)
                .rules(List.of("Best of 3 games to 21 points", "Rally point scoring system", "Sudden death at 29-29"))
                .imageUrl("https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80")
                .popularArenasCount(32)
                .upcomingTournamentsCount(19)
                .activePlayersCount(4100)
                .isActive(true)
                .build());
    }

    private void seedArenas() {
        arenas.add(Arena.builder()
                .id("arena-1")
                .name("Apex Grand Sports Complex")
                .location("Metro Central, Sector 48")
                .city("San Francisco, CA")
                .address("450 Innovation Parkway, San Francisco, CA 94107")
                .rating(4.9)
                .reviewCount(328)
                .sports(List.of("Basketball", "Volleyball", "Badminton", "Tennis"))
                .hourlyRate(75.0)
                .capacity(3500)
                .isIndoor(true)
                .facilities(List.of("Air Conditioned", "Pro Maple Hardwood", "LED Scoreboards", "Locker Rooms", "VIP Lounge", "Parking (500 cars)"))
                .images(List.of("https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1000&auto=format&fit=crop&q=80"))
                .description("Premier sports destination featuring FIBA-grade maple courts, Olympic lighting, broadcast-ready media setups.")
                .operatingHours(Arena.OperatingHours.builder().open("06:00 AM").close("11:00 PM").days("Mon - Sun").build())
                .managerId("u-arena")
                .managerName("David Chen")
                .contactPhone("+1 (555) 482-9011")
                .contactEmail("contact@apexgrand.com")
                .courtsCount(6)
                .status("ACTIVE")
                .build());

        arenas.add(Arena.builder()
                .id("arena-2")
                .name("Thunderdome Football Park")
                .location("Bay Area Sports Boulevard")
                .city("Oakland, CA")
                .address("1200 Velocity Way, Oakland, CA 94601")
                .rating(4.8)
                .reviewCount(240)
                .sports(List.of("Football / Soccer", "Kabaddi", "Athletics & Track"))
                .hourlyRate(120.0)
                .capacity(6500)
                .isIndoor(false)
                .facilities(List.of("FIFA Grade Artificial Turf", "Floodlights (2000 Lux)", "Player Dugouts", "Full Grandstands"))
                .images(List.of("https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1000&auto=format&fit=crop&q=80"))
                .description("State-of-the-art football stadium with all-weather synthetic pitch, electronic scoreboard, and player recovery zones.")
                .operatingHours(Arena.OperatingHours.builder().open("07:00 AM").close("10:30 PM").days("Mon - Sun").build())
                .managerId("u-arena")
                .managerName("David Chen")
                .contactPhone("+1 (555) 390-1122")
                .contactEmail("bookings@thunderdomefootball.com")
                .courtsCount(3)
                .status("ACTIVE")
                .build());
    }

    private void seedSlots() {
        arenaSlots.add(ArenaSlot.builder()
                .id("slot-1")
                .arenaId("arena-1")
                .arenaName("Apex Grand Sports Complex")
                .courtName("Court A (Main Arena)")
                .date("2026-10-06")
                .startTime("08:00 AM")
                .endTime("10:00 AM")
                .price(150.0)
                .status("AVAILABLE")
                .build());

        arenaSlots.add(ArenaSlot.builder()
                .id("slot-2")
                .arenaId("arena-1")
                .arenaName("Apex Grand Sports Complex")
                .courtName("Court A (Main Arena)")
                .date("2026-10-06")
                .startTime("10:00 AM")
                .endTime("12:00 PM")
                .price(150.0)
                .status("TOURNAMENT")
                .purpose("Spotix Championship QF")
                .build());

        arenaSlots.add(ArenaSlot.builder()
                .id("slot-3")
                .arenaId("arena-1")
                .arenaName("Apex Grand Sports Complex")
                .courtName("Court A (Main Arena)")
                .date("2026-10-06")
                .startTime("02:00 PM")
                .endTime("04:00 PM")
                .price(150.0)
                .status("BOOKED")
                .bookedBy("Samantha Ray")
                .purpose("Team Scrimmage")
                .build());
    }

    private void seedBookings() {
        bookings.add(Booking.builder()
                .id("book-101")
                .bookingNumber("SPX-BK-9801")
                .arenaId("arena-1")
                .arenaName("Apex Grand Sports Complex")
                .courtName("Court A (Main Arena)")
                .userId("u-team")
                .userName("Samantha Ray")
                .userEmail("manager@cyberknights.com")
                .sport("Basketball")
                .date("2026-10-06")
                .startTime("02:00 PM")
                .endTime("04:00 PM")
                .totalAmount(300.0)
                .purpose("Tournament Practice")
                .status("APPROVED")
                .createdAt("2026-10-04T11:20:00Z")
                .paymentStatus("PAID")
                .build());
    }

    private void seedTournaments() {
        tournaments.add(Tournament.builder()
                .id("tourn-1")
                .name("Apex Pacific Basketball Championship 2026")
                .sport("Basketball")
                .sportId("sport-1")
                .bannerUrl("https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&auto=format&fit=crop&q=80")
                .organizerId("u-organizer")
                .organizerName("Marcus Sterling")
                .organizerAvatar("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80")
                .location("San Francisco, CA")
                .venue("Apex Grand Sports Complex")
                .arenaId("arena-1")
                .startDate("2026-10-12")
                .endDate("2026-10-18")
                .registrationStartDate("2026-09-01")
                .registrationDeadline("2026-10-05")
                .maxTeams(16)
                .registeredTeamsCount(14)
                .entryFee(250.0)
                .prizePool("$25,000")
                .format("KNOCKOUT")
                .status("REGISTRATION_OPEN")
                .rules(List.of("FIBA standard rules apply", "Team rosters must have 5-12 players", "Official jerseys required"))
                .description("Flagship West Coast collegiate and club basketball invitational.")
                .scheduleQualityScore(96.4)
                .sponsorName("Red Bull Sports")
                .sponsorLogo("https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=150&auto=format&fit=crop&q=80")
                .build());
    }

    private void seedRegistrations() {
        teamRegistrations.add(TeamRegistration.builder()
                .id("reg-1")
                .tournamentId("tourn-1")
                .tournamentName("Apex Pacific Basketball Championship 2026")
                .teamId("team-1")
                .teamName("Cyber Knights")
                .teamLogo("https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&auto=format&fit=crop&q=80")
                .managerName("Samantha Ray")
                .managerContact("+1 (555) 782-3341")
                .appliedDate("2026-09-15")
                .status("APPROVED")
                .paymentStatus("PAID")
                .playersCount(10)
                .build());
    }

    private void seedTeams() {
        teams.add(Team.builder()
                .id("team-1")
                .name("Cyber Knights")
                .tag("CKN")
                .logoUrl("https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&auto=format&fit=crop&q=80")
                .sport("Basketball")
                .sportId("sport-1")
                .managerId("u-team")
                .managerName("Samantha Ray")
                .managerEmail("manager@cyberknights.com")
                .coachName("Frank Harrison")
                .foundedYear(2021)
                .city("San Francisco")
                .playerCount(10)
                .stats(Team.TeamStats.builder().matches(24).wins(19).losses(5).draws(0).points(38).winRate(79.2).build())
                .status("ACTIVE")
                .build());

        teams.add(Team.builder()
                .id("team-2")
                .name("Golden Gate Titans")
                .tag("GGT")
                .logoUrl("https://images.unsplash.com/photo-1546519638-68e109498ffc?w=150&auto=format&fit=crop&q=80")
                .sport("Basketball")
                .sportId("sport-1")
                .managerId("u-team-2")
                .managerName("Anthony Davis")
                .managerEmail("anthony@titans.com")
                .coachName("Steve Kerrigan")
                .foundedYear(2019)
                .city("Oakland")
                .playerCount(11)
                .stats(Team.TeamStats.builder().matches(26).wins(21).losses(5).draws(0).points(42).winRate(80.7).build())
                .status("ACTIVE")
                .build());
    }

    private void seedPlayers() {
        players.add(Player.builder()
                .id("player-1")
                .teamId("team-1")
                .teamName("Cyber Knights")
                .name("Jordan Rivera")
                .email("player@spotix.io")
                .phone("+1 (555) 234-5678")
                .position("Point Guard")
                .jerseyNumber(7)
                .avatarUrl("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80")
                .height("6'2\" (188 cm)")
                .weight("185 lbs (84 kg)")
                .dateOfBirth("2000-05-14")
                .status("ACTIVE")
                .stats(Player.PlayerStats.builder().matches(22).pointsOrGoals(420).assists(154).fouls(32).mvpAwards(6).performanceRating(9.4).build())
                .build());
    }

    private void seedOfficials() {
        officials.add(Official.builder()
                .id("off-1")
                .name("Rahul Kumar")
                .email("official@spotix.io")
                .phone("+1 (555) 443-8822")
                .avatarUrl("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80")
                .sportSpecializations(List.of("Basketball", "Volleyball"))
                .experienceYears(9)
                .certificationLevel("International")
                .certificationName("FIBA Grade 1 Senior Referee")
                .rating(4.9)
                .workloadScore(42)
                .matchesOfficiated(184)
                .availabilityStatus("AVAILABLE")
                .status("ACTIVE")
                .assignedBy("Super Admin")
                .suitabilityScore(96.0)
                .build());
    }

    private void seedMatches() {
        matches.add(Match.builder()
                .id("match-1")
                .tournamentId("tourn-1")
                .tournamentName("Apex Pacific Basketball Championship 2026")
                .sport("Basketball")
                .roundName("Quarter Final 1")
                .matchNumber(1)
                .teamA(MatchScoreTeam.builder().id("team-1").name("Cyber Knights").tag("CKN").logoUrl("https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&auto=format&fit=crop&q=80").score(88).fouls(12).timeoutsRemaining(2).periodScores(List.of(22, 24, 20, 22)).build())
                .teamB(MatchScoreTeam.builder().id("team-2").name("Golden Gate Titans").tag("GGT").logoUrl("https://images.unsplash.com/photo-1546519638-68e109498ffc?w=150&auto=format&fit=crop&q=80").score(84).fouls(14).timeoutsRemaining(1).periodScores(List.of(20, 22, 21, 21)).build())
                .date("2026-10-14")
                .time("06:00 PM")
                .arenaId("arena-1")
                .arenaName("Apex Grand Sports Complex")
                .court("Court A (Main Arena)")
                .status("LIVE")
                .currentPeriod("Q4 02:14")
                .periodTimeRemaining("02:14")
                .official(Match.AssignedOfficial.builder().id("off-1").name("Rahul Kumar").role("Lead Referee").suitabilityScore(96.0).build())
                .events(List.of(
                        MatchEvent.builder().id("ev-1").matchId("match-1").timestamp("2026-10-14T18:45:00Z").gameTime("Q4 02:40").type("SCORE").teamId("team-1").teamName("Cyber Knights").playerId("player-1").playerName("Jordan Rivera").points(3).description("Jordan Rivera drills a clutch 3-pointer from downtown!").build()
                ))
                .build());
    }

    private void seedNotifications() {
        notifications.add(NotificationItem.builder()
                .id("notif-1")
                .userId("u-admin")
                .title("New Tournament Registration")
                .message("Cyber Knights registered for Apex Pacific Basketball Championship 2026")
                .category("TOURNAMENT")
                .isRead(false)
                .createdAt(Instant.now().toString())
                .link("/tournaments/tourn-1")
                .build());
    }
}
