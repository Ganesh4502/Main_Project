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
public class AIFixtureParams {
    private String tournamentId;
    private int teamsCount;
    private String format;
    private List<String> arenaIds;
    private String startDate;
    private String endDate;
    private int matchDurationMinutes;
    private int restDurationMinutes;
    private boolean avoidConsecutiveMatches;
    private boolean balanceWeekendSlots;
}
