package com.spotix.backend.controller;

import com.spotix.backend.model.Arena;
import com.spotix.backend.model.ArenaSlot;
import com.spotix.backend.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class ArenaController {

    private final DataStore dataStore;

    public ArenaController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping("/arenas")
    public ResponseEntity<List<Arena>> getArenas(
            @RequestParam(required = false) String sport,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Boolean isIndoor) {

        List<Arena> list = dataStore.arenas.stream()
                .filter(a -> sport == null || a.getSports() != null && a.getSports().stream().anyMatch(s -> s.equalsIgnoreCase(sport)))
                .filter(a -> city == null || a.getCity().toLowerCase().contains(city.toLowerCase()))
                .filter(a -> isIndoor == null || a.isIndoor() == isIndoor)
                .collect(Collectors.toList());

        return ResponseEntity.ok(list);
    }

    @GetMapping("/arenas/{id}")
    public ResponseEntity<?> getArenaById(@PathVariable String id) {
        Optional<Arena> arena = dataStore.arenas.stream().filter(a -> a.getId().equals(id)).findFirst();
        return arena.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/arenas")
    public ResponseEntity<Arena> createArena(@RequestBody Arena arena) {
        if (arena.getId() == null) {
            arena.setId("arena-" + UUID.randomUUID().toString().substring(0, 8));
        }
        if (arena.getRating() == 0) arena.setRating(5.0);
        if (arena.getStatus() == null) arena.setStatus("ACTIVE");
        dataStore.arenas.add(arena);
        return ResponseEntity.ok(arena);
    }

    @GetMapping("/arenas/{arenaId}/slots")
    public ResponseEntity<List<ArenaSlot>> getArenaSlots(
            @PathVariable String arenaId,
            @RequestParam(required = false) String date) {

        List<ArenaSlot> slots = dataStore.arenaSlots.stream()
                .filter(s -> s.getArenaId().equals(arenaId))
                .filter(s -> date == null || s.getDate().equals(date))
                .collect(Collectors.toList());

        return ResponseEntity.ok(slots);
    }

    @PostMapping("/slots")
    public ResponseEntity<ArenaSlot> createSlot(@RequestBody ArenaSlot slot) {
        if (slot.getId() == null) {
            slot.setId("slot-" + UUID.randomUUID().toString().substring(0, 8));
        }
        if (slot.getStatus() == null) slot.setStatus("AVAILABLE");
        dataStore.arenaSlots.add(slot);
        return ResponseEntity.ok(slot);
    }

    @PatchMapping("/slots/{slotId}/status")
    public ResponseEntity<?> updateSlotStatus(@PathVariable String slotId, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        String purpose = body.get("purpose");

        Optional<ArenaSlot> slotOpt = dataStore.arenaSlots.stream().filter(s -> s.getId().equals(slotId)).findFirst();
        if (slotOpt.isPresent()) {
            ArenaSlot slot = slotOpt.get();
            if (status != null) slot.setStatus(status);
            if (purpose != null) slot.setPurpose(purpose);
            return ResponseEntity.ok(slot);
        }
        return ResponseEntity.notFound().build();
    }
}
