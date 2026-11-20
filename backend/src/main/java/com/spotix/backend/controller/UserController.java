package com.spotix.backend.controller;

import com.spotix.backend.model.User;
import com.spotix.backend.model.UserRole;
import com.spotix.backend.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final DataStore dataStore;

    public UserController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false) UserRole role) {
        if (role != null) {
            return ResponseEntity.ok(dataStore.users.stream()
                    .filter(u -> u.getRole() == role)
                    .collect(Collectors.toList()));
        }
        return ResponseEntity.ok(dataStore.users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        Optional<User> user = dataStore.users.stream().filter(u -> u.getId().equals(id)).findFirst();
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateUserStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        Optional<User> userOpt = dataStore.users.stream().filter(u -> u.getId().equals(id)).findFirst();
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (status != null) {
                user.setStatus(status);
            }
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        boolean removed = dataStore.users.removeIf(u -> u.getId().equals(id));
        return ResponseEntity.ok(Map.of("success", removed));
    }
}
