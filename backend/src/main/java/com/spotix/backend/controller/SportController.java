package com.spotix.backend.controller;

import com.spotix.backend.model.Sport;
import com.spotix.backend.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/sports")
@CrossOrigin
public class SportController {

    private final DataStore dataStore;

    public SportController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping
    public ResponseEntity<List<Sport>> getAllSports() {
        return ResponseEntity.ok(dataStore.sports);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSportById(@PathVariable String id) {
        Optional<Sport> sport = dataStore.sports.stream().filter(s -> s.getId().equals(id) || s.getSlug().equalsIgnoreCase(id)).findFirst();
        return sport.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Sport> createSport(@RequestBody Sport sport) {
        if (sport.getId() == null) {
            sport.setId("sport-" + UUID.randomUUID().toString().substring(0, 8));
        }
        if (sport.getSlug() == null && sport.getName() != null) {
            sport.setSlug(sport.getName().toLowerCase().replaceAll("[^a-z0-9]", "-"));
        }
        dataStore.sports.add(sport);
        return ResponseEntity.ok(sport);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSport(@PathVariable String id, @RequestBody Sport updates) {
        Optional<Sport> sportOpt = dataStore.sports.stream().filter(s -> s.getId().equals(id)).findFirst();
        if (sportOpt.isPresent()) {
            Sport sport = sportOpt.get();
            if (updates.getName() != null) sport.setName(updates.getName());
            if (updates.getCategory() != null) sport.setCategory(updates.getCategory());
            if (updates.getDescription() != null) sport.setDescription(updates.getDescription());
            if (updates.getImageUrl() != null) sport.setImageUrl(updates.getImageUrl());
            if (updates.getRules() != null) sport.setRules(updates.getRules());
            return ResponseEntity.ok(sport);
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<?> toggleSportStatus(@PathVariable String id) {
        Optional<Sport> sportOpt = dataStore.sports.stream().filter(s -> s.getId().equals(id)).findFirst();
        if (sportOpt.isPresent()) {
            Sport sport = sportOpt.get();
            sport.setActive(!sport.isActive());
            return ResponseEntity.ok(sport);
        }
        return ResponseEntity.notFound().build();
    }
}
