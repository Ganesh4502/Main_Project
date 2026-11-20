package com.spotix.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String id;
    private String name;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private UserRole role;
    private String avatarUrl;
    @Builder.Default
    private String status = "ACTIVE";
    private String createdAt;
    private String lastLoginAt;
    private String organization;
}
