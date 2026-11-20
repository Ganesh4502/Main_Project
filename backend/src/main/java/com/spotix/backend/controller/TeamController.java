package com.spotix.backend.controller;

import com.spotix.backend.model.Official;
import com.spotix.backend.model.Player;
import com.spotix.backend.model.Team;
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
public class TeamController {

    private final DataStore dataStore;

    public TeamController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    // TEAMS
    @GetMapping("/teams")
    public ResponseEntity<List<Team>> getTeams(@RequestParam(required = false) String sport) {
        List<Team> list = dataStore.teams.stream()
                .filter(t -> sport == null || t.getSport().equalsIgnoreCase(sport) || (t.getSportId() != null && t.getSportId().equalsIgnoreCase(sport)))
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/teams/{id}")
    public ResponseEntity<?> getTeamById(@PathVariable String id) {
        Optional<Team> team = dataStore.teams.stream().filter(t -> t.getId().equals(id)).findFirst();
        return team.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/teams")
    public ResponseEntity<Team> createTeam(@RequestBody Team team) {
        if (team.getId() == null) {
            team.setId("team-" + UUID.randomUUID().toString().substring(0, 8));
        }
        if (team.getStatus() == null) team.setStatus("ACTIVE");
        dataStore.teams.add(team);
        return ResponseEntity.ok(team);
    }

    // PLAYERS
    @GetMapping("/players")
    public ResponseEntity<List<Player>> getPlayers(@RequestParam(required = false) String teamId) {
        List<Player> list = dataStore.players.stream()
                .filter(p -> teamId == null || p.getTeamId().equals(teamId))
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/players/{id}")
    public ResponseEntity<?> getPlayerById(@PathVariable String id) {
        Optional<Player> player = dataStore.players.stream().filter(p -> p.getId().equals(id)).findFirst();
        return player.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/players")
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) {
        if (player.getId() == null) {
            player.setId("player-" + UUID.randomUUID().toString().substring(0, 8));
        }
        if (player.getStatus() == null) player.setStatus("ACTIVE");
        dataStore.players.add(player);
        return ResponseEntity.ok(player);
    }

    @DeleteMapping("/players/{id}")
    public ResponseEntity<?> deletePlayer(@PathVariable String id) {
        boolean removed = dataStore.players.removeIf(p -> p.getId().equals(id));
        return ResponseEntity.ok(Map.of("success", removed));
    }

    // OFFICIALS
    @GetMapping("/officials")
    public ResponseEntity<List<Official>> getOfficials(@RequestParam(required = false) String sport) {
        List<Official> list = dataStore.officials.stream()
                .filter(o -> sport == null || o.getSportSpecializations() != null && o.getSportSpecializations().stream().anyMatch(s -> s.equalsIgnoreCase(sport)))
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/officials/{id}")
    public ResponseEntity<?> getOfficialById(@PathVariable String id) {
        Optional<Official> off = dataStore.officials.stream().filter(o -> o.getId().equals(id)).findFirst();
        return off.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/officials")
    public ResponseEntity<Official> createOfficial(@RequestBody Official official) {
        if (official.getId() == null) {
            official.setId("off-" + UUID.randomUUID().toString().substring(0, 8));
        }
        if (official.getStatus() == null) official.setStatus("ACTIVE");
        if (official.getAvailabilityStatus() == null) official.setAvailabilityStatus("AVAILABLE");
        dataStore.officials.add(official);
        return ResponseEntity.ok(official);
    }

    @PatchMapping("/officials/{id}/availability")
    public ResponseEntity<?> updateOfficialAvailability(@PathVariable String id, @RequestBody Map<String, String> body) {
        String availabilityStatus = body.get("availabilityStatus");
        Optional<Official> offOpt = dataStore.officials.stream().filter(o -> o.getId().equals(id)).findFirst();
        if (offOpt.isPresent()) {
            Official off = offOpt.get();
            if (availabilityStatus != null) off.setAvailabilityStatus(availabilityStatus);
            return ResponseEntity.ok(off);
        }
        return ResponseEntity.notFound().build();
    }
}
