package com.spotix.backend.controller;

import com.spotix.backend.model.Match;
import com.spotix.backend.model.TeamRegistration;
import com.spotix.backend.model.Tournament;
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
public class TournamentController {

    private final DataStore dataStore;

    public TournamentController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping("/tournaments")
    public ResponseEntity<List<Tournament>> getTournaments(
            @RequestParam(required = false) String sport,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String organizerId,
            @RequestParam(required = false) String search) {

        List<Tournament> list = dataStore.tournaments.stream()
                .filter(t -> sport == null || t.getSport().equalsIgnoreCase(sport) || (t.getSportId() != null && t.getSportId().equalsIgnoreCase(sport)))
                .filter(t -> status == null || t.getStatus().equalsIgnoreCase(status))
                .filter(t -> organizerId == null || t.getOrganizerId().equalsIgnoreCase(organizerId))
                .filter(t -> search == null || t.getName().toLowerCase().contains(search.toLowerCase()) || t.getLocation().toLowerCase().contains(search.toLowerCase()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(list);
    }

    @GetMapping("/tournaments/{id}")
    public ResponseEntity<?> getTournamentById(@PathVariable String id) {
        Optional<Tournament> t = dataStore.tournaments.stream().filter(item -> item.getId().equals(id)).findFirst();
        return t.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/tournaments")
    public ResponseEntity<Tournament> createTournament(@RequestBody Tournament tournament) {
        if (tournament.getId() == null) {
            tournament.setId("tourn-" + UUID.randomUUID().toString().substring(0, 8));
        }
        if (tournament.getStatus() == null) {
            tournament.setStatus("REGISTRATION_OPEN");
        }
        if (tournament.getRegisteredTeamsCount() == 0) {
            tournament.setRegisteredTeamsCount(0);
        }
        dataStore.tournaments.add(tournament);
        return ResponseEntity.ok(tournament);
    }

    @PatchMapping("/tournaments/{id}/status")
    public ResponseEntity<?> updateTournamentStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        Optional<Tournament> tOpt = dataStore.tournaments.stream().filter(item -> item.getId().equals(id)).findFirst();
        if (tOpt.isPresent()) {
            Tournament t = tOpt.get();
            if (status != null) t.setStatus(status);
            return ResponseEntity.ok(t);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/tournaments/{tournamentId}/registrations")
    public ResponseEntity<List<TeamRegistration>> getTournamentRegistrations(@PathVariable String tournamentId) {
        List<TeamRegistration> list = dataStore.teamRegistrations.stream()
                .filter(r -> r.getTournamentId().equals(tournamentId))
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PatchMapping("/registrations/{regId}/status")
    public ResponseEntity<?> updateRegistrationStatus(@PathVariable String regId, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        Optional<TeamRegistration> regOpt = dataStore.teamRegistrations.stream().filter(r -> r.getId().equals(regId)).findFirst();
        if (regOpt.isPresent()) {
            TeamRegistration reg = regOpt.get();
            if (status != null) reg.setStatus(status);
            return ResponseEntity.ok(reg);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/tournaments/{tournamentId}/fixtures")
    public ResponseEntity<List<Match>> getTournamentFixtures(@PathVariable String tournamentId) {
        List<Match> fixtures = dataStore.matches.stream()
                .filter(m -> m.getTournamentId().equals(tournamentId))
                .collect(Collectors.toList());
        return ResponseEntity.ok(fixtures);
    }
}
