package com.spotix.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArenaSlot {
    private String id;
    private String arenaId;
    private String arenaName;
    private String courtName;
    private String date;
    private String startTime;
    private String endTime;
    private double price;
    @Builder.Default
    private String status = "AVAILABLE"; // AVAILABLE, BOOKED, TOURNAMENT, MAINTENANCE, BLOCKED
    private String bookedBy;
    private String purpose;
}
