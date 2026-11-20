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
public class Sport {
    private String id;
    private String name;
    private String slug;
    private String category;
    private String icon;
    private String description;
    private int minPlayers;
    private int maxPlayers;
    private int officialsRequired;
    private List<String> rules;
    private String imageUrl;
    private int popularArenasCount;
    private int upcomingTournamentsCount;
    private int activePlayersCount;
    @Builder.Default
    private boolean isActive = true;
}
