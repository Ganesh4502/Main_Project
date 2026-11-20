package com.spotix.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    private String id;
    private String bookingNumber;
    private String arenaId;
    private String arenaName;
    private String courtName;
    private String userId;
    private String userName;
    private String userEmail;
    private String sport;
    private String date;
    private String startTime;
    private String endTime;
    private double totalAmount;
    private String purpose;
    @Builder.Default
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED, CANCELLED, COMPLETED
    private String createdAt;
    @Builder.Default
    private String paymentStatus = "PAID"; // PAID, PENDING, REFUNDED
}
