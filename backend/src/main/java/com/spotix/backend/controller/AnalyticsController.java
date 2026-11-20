package com.spotix.backend.controller;

import com.spotix.backend.model.AnalyticsModels;
import com.spotix.backend.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/analytics")
@CrossOrigin
public class AnalyticsController {

    private final DataStore dataStore;

    public AnalyticsController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping("/kpis")
    public ResponseEntity<AnalyticsModels.DashboardKPIs> getKPIs(@RequestParam(required = false) String role) {
        AnalyticsModels.DashboardKPIs kpis = AnalyticsModels.DashboardKPIs.builder()
                .totalUsers(14820)
                .activeTournaments(dataStore.tournaments.size())
                .registeredArenas(dataStore.arenas.size())
                .totalTeams(dataStore.teams.size() + 194)
                .activeMatches(dataStore.matches.size())
                .registeredOfficials(dataStore.officials.size() + 63)
                .userGrowthPercent(24.8)
                .tournamentGrowthPercent(18.2)
                .arenaUtilizationPercent(88.4)
                .build();
        return ResponseEntity.ok(kpis);
    }

    @GetMapping("/growth")
    public ResponseEntity<List<AnalyticsModels.GrowthDataPoint>> getGrowthTrends() {
        List<AnalyticsModels.GrowthDataPoint> data = List.of(
                AnalyticsModels.GrowthDataPoint.builder().month("May").users(5400).tournaments(12).bookings(310).revenue(18500.0).build(),
                AnalyticsModels.GrowthDataPoint.builder().month("Jun").users(7200).tournaments(18).bookings(460).revenue(27400.0).build(),
                AnalyticsModels.GrowthDataPoint.builder().month("Jul").users(9500).tournaments(24).bookings(680).revenue(39800.0).build(),
                AnalyticsModels.GrowthDataPoint.builder().month("Aug").users(11400).tournaments(29).bookings(820).revenue(48900.0).build(),
                AnalyticsModels.GrowthDataPoint.builder().month("Sep").users(13200).tournaments(34).bookings(990).revenue(61200.0).build(),
                AnalyticsModels.GrowthDataPoint.builder().month("Oct").users(14820).tournaments(38).bookings(1240).revenue(78500.0).build()
        );
        return ResponseEntity.ok(data);
    }

    @GetMapping("/sports-popularity")
    public ResponseEntity<List<AnalyticsModels.SportPopularityData>> getSportPopularity() {
        List<AnalyticsModels.SportPopularityData> data = List.of(
                AnalyticsModels.SportPopularityData.builder().sport("Football").players(5200).tournaments(22).color("#10B981").build(),
                AnalyticsModels.SportPopularityData.builder().sport("Badminton").players(4100).tournaments(19).color("#3B82F6").build(),
                AnalyticsModels.SportPopularityData.builder().sport("Cricket").players(3800).tournaments(9).color("#F59E0B").build(),
                AnalyticsModels.SportPopularityData.builder().sport("Tennis").players(2800).tournaments(11).color("#8B5CF6").build(),
                AnalyticsModels.SportPopularityData.builder().sport("Basketball").players(2450).tournaments(14).color("#06B6D4").build(),
                AnalyticsModels.SportPopularityData.builder().sport("Kabaddi").players(1950).tournaments(7).color("#EC4899").build()
        );
        return ResponseEntity.ok(data);
    }

    @GetMapping("/arena-utilization")
    public ResponseEntity<List<AnalyticsModels.ArenaUtilizationData>> getArenaUtilization() {
        List<AnalyticsModels.ArenaUtilizationData> data = List.of(
                AnalyticsModels.ArenaUtilizationData.builder().arena("Apex Grand Sports Complex").utilizationRate(94.0).revenue(32400.0).build(),
                AnalyticsModels.ArenaUtilizationData.builder().arena("Thunderdome Football Park").utilizationRate(89.0).revenue(41800.0).build(),
                AnalyticsModels.ArenaUtilizationData.builder().arena("Velocity Racquet Arena").utilizationRate(92.0).revenue(26100.0).build(),
                AnalyticsModels.ArenaUtilizationData.builder().arena("Olympus Cricket Oval").utilizationRate(78.0).revenue(19500.0).build()
        );
        return ResponseEntity.ok(data);
    }
}
