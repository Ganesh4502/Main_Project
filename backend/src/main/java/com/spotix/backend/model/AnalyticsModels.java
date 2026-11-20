package com.spotix.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class AnalyticsModels {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DashboardKPIs {
        private int totalUsers;
        private int activeTournaments;
        private int registeredArenas;
        private int totalTeams;
        private int activeMatches;
        private int registeredOfficials;
        private double userGrowthPercent;
        private double tournamentGrowthPercent;
        private double arenaUtilizationPercent;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GrowthDataPoint {
        private String month;
        private int users;
        private int tournaments;
        private int bookings;
        private double revenue;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SportPopularityData {
        private String sport;
        private int players;
        private int tournaments;
        private String color;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ArenaUtilizationData {
        private String arena;
        private double utilizationRate;
        private double revenue;
    }
}
