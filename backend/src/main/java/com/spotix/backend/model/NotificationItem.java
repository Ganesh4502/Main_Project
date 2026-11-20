package com.spotix.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationItem {
    private String id;
    private String userId;
    private String title;
    private String message;
    private String category; // TOURNAMENT, MATCH, BOOKING, TEAM, OFFICIAL, SYSTEM
    private boolean isRead;
    private String createdAt;
    private String link;
}
