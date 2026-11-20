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
public class Official {
    private String id;
    private String name;
    private String email;
    private String phone;
    private String avatarUrl;
    private List<String> sportSpecializations;
    private int experienceYears;
    private String certificationLevel; // National, International, State, Associate
    private String certificationName;
    private double rating;
    private int workloadScore; // percentage 0-100%
    private int matchesOfficiated;
    @Builder.Default
    private String availabilityStatus = "AVAILABLE"; // AVAILABLE, UNAVAILABLE, PARTIALLY_AVAILABLE, ON_DUTY
    @Builder.Default
    private String status = "ACTIVE"; // ACTIVE, INACTIVE, PENDING_VERIFICATION
    private String assignedBy;
    private Double suitabilityScore;
}
