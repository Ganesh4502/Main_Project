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
public class AIFixtureResult {
    private double scheduleQuality;
    private FixtureMetrics metrics;
    private List<Match> matches;
    private String generatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FixtureMetrics {
        private int conflicts;
        private int arenaConflicts;
        private int restViolations;
        private int teamsScheduled;
        private int matchesCount;
        private double utilizationRate;
    }
}
