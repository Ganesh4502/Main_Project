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
public class Tournament {
    private String id;
    private String name;
    private String sport;
    private String sportId;
    private String bannerUrl;
    private String organizerId;
    private String organizerName;
    private String organizerAvatar;
    private String location;
    private String venue;
    private String arenaId;
    private String startDate;
    private String endDate;
    private String registrationStartDate;
    private String registrationDeadline;
    private int maxTeams;
    private int registeredTeamsCount;
    private double entryFee;
    private String prizePool;
    private String format; // KNOCKOUT, LEAGUE, ROUND_ROBIN, GROUP_STAGE
    @Builder.Default
    private String status = "DRAFT"; // DRAFT, REGISTRATION_OPEN, REGISTRATION_CLOSED, PUBLISHED, LIVE, COMPLETED, CANCELLED
    private List<String> rules;
    private String description;
    private Double scheduleQualityScore;
    private String sponsorName;
    private String sponsorLogo;
}
