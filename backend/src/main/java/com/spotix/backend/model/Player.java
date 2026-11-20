package com.spotix.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Player {
    private String id;
    private String teamId;
    private String teamName;
    private String name;
    private String email;
    private String phone;
    private String position;
    private int jerseyNumber;
    private String avatarUrl;
    private String height;
    private String weight;
    private String dateOfBirth;
    @Builder.Default
    private String status = "ACTIVE"; // ACTIVE, INJURED, SUSPENDED
    private PlayerStats stats;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PlayerStats {
        private int matches;
        private int pointsOrGoals;
        private int assists;
        private int fouls;
        private int mvpAwards;
        private double performanceRating;
    }
}
