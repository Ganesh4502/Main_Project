package com.spotix.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamRegistration {
    private String id;
    private String tournamentId;
    private String tournamentName;
    private String teamId;
    private String teamName;
    private String teamLogo;
    private String managerName;
    private String managerContact;
    private String appliedDate;
    @Builder.Default
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED, WITHDRAWN
    @Builder.Default
    private String paymentStatus = "PAID";
    private int playersCount;
}
