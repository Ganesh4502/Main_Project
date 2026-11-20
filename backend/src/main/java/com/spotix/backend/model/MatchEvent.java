package com.spotix.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MatchEvent {
    private String id;
    private String matchId;
    private String timestamp;
    private String gameTime;
    private String type; // SCORE, FOUL, TIMEOUT, PERIOD_START, PERIOD_END, SUBSTITUTION, CARD, MATCH_END
    private String teamId;
    private String teamName;
    private String playerId;
    private String playerName;
    private Integer points;
    private String description;
}
