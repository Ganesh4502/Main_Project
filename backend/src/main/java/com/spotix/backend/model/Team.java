package com.spotix.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Team {
    private String id;
    private String name;
    private String tag;
    private String logoUrl;
    private String sport;
    private String sportId;
    private String managerId;
    private String managerName;
    private String managerEmail;
    private String coachName;
    private int foundedYear;
    private String city;
    private int playerCount;
    private TeamStats stats;
    @Builder.Default
    private String status = "ACTIVE"; // ACTIVE, PENDING, SUSPENDED

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TeamStats {
        private int matches;
        private int wins;
        private int losses;
        private int draws;
        private int points;
        private double winRate;
    }
}
