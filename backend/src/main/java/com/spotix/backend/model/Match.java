package com.spotix.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Match {
    private String id;
    private String tournamentId;
    private String tournamentName;
    private String sport;
    private String roundName;
    private int matchNumber;
    private MatchScoreTeam teamA;
    private MatchScoreTeam teamB;
    private String date;
    private String time;
    private String arenaId;
    private String arenaName;
    private String court;
    @Builder.Default
    private String status = "SCHEDULED"; // SCHEDULED, READY, LIVE, COMPLETED, POSTPONED, CANCELLED
    private String currentPeriod;
    private String periodTimeRemaining;
    private AssignedOfficial official;
    private String winnerTeamId;
    private List<MatchEvent> events;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AssignedOfficial {
        private String id;
        private String name;
        private String role;
        private Double suitabilityScore;
    }
}
