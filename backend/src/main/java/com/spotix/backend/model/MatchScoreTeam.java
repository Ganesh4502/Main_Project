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
public class MatchScoreTeam {
    private String id;
    private String name;
    private String tag;
    private String logoUrl;
    private int score;
    private int fouls;
    private int timeoutsRemaining;
    private List<Integer> periodScores;
}
