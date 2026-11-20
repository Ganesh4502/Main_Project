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
public class Arena {
    private String id;
    private String name;
    private String location;
    private String city;
    private String address;
    private double rating;
    private int reviewCount;
    private List<String> sports;
    private double hourlyRate;
    private int capacity;
    private boolean isIndoor;
    private List<String> facilities;
    private List<String> images;
    private String description;
    private OperatingHours operatingHours;
    private String managerId;
    private String managerName;
    private String contactPhone;
    private String contactEmail;
    private int courtsCount;
    @Builder.Default
    private String status = "ACTIVE";

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OperatingHours {
        private String open;
        private String close;
        private String days;
    }
}
