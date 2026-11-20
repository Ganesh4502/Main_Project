package com.spotix.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIOfficialRecommendation {
    private String officialId;
    private String officialName;
    private String officialAvatar;
    private double suitabilityScore;
    private RecommendationMetrics metrics;
    private String explanation;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecommendationMetrics {
        private double sportExpertise;
        private double experienceScore;
        private double availability;
        private double workloadScore;
        private String conflictRisk;
    }
}
