package com.spotix.backend.controller;

import com.spotix.backend.model.Match;
import com.spotix.backend.model.MatchEvent;
import com.spotix.backend.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class MatchController {

    private final DataStore dataStore;

    public MatchController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping("/matches")
    public ResponseEntity<List<Match>> getMatches(
            @RequestParam(required = false) String tournamentId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String sport) {

        List<Match> list = dataStore.matches.stream()
                .filter(m -> tournamentId == null || m.getTournamentId().equals(tournamentId))
                .filter(m -> status == null || m.getStatus().equalsIgnoreCase(status))
                .filter(m -> sport == null || m.getSport().equalsIgnoreCase(sport))
                .collect(Collectors.toList());

        return ResponseEntity.ok(list);
    }

    @GetMapping("/matches/{id}")
    public ResponseEntity<?> getMatchById(@PathVariable String id) {
        Optional<Match> match = dataStore.matches.stream().filter(m -> m.getId().equals(id)).findFirst();
        return match.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping("/matches/{id}/score")
    public ResponseEntity<?> updateScore(
            @PathVariable String id,
            @RequestBody Map<String, Object> body) {

        String team = (String) body.get("team"); // "teamA" or "teamB"
        Integer points = body.get("points") instanceof Number ? ((Number) body.get("points")).intValue() : 1;
        String eventDesc = (String) body.get("eventDesc");

        Optional<Match> matchOpt = dataStore.matches.stream().filter(m -> m.getId().equals(id)).findFirst();
        if (matchOpt.isPresent()) {
            Match match = matchOpt.get();
            if ("teamA".equalsIgnoreCase(team) && match.getTeamA() != null) {
                match.getTeamA().setScore(match.getTeamA().getScore() + points);
            } else if ("teamB".equalsIgnoreCase(team) && match.getTeamB() != null) {
                match.getTeamB().setScore(match.getTeamB().getScore() + points);
            }

            if (eventDesc != null && !eventDesc.isBlank()) {
                if (match.getEvents() == null) match.setEvents(new ArrayList<>());
                MatchEvent event = MatchEvent.builder()
                        .id("ev-" + UUID.randomUUID().toString().substring(0, 8))
                        .matchId(id)
                        .timestamp(Instant.now().toString())
                        .gameTime(match.getCurrentPeriod() != null ? match.getCurrentPeriod() : "Live")
                        .type("SCORE")
                        .points(points)
                        .description(eventDesc)
                        .build();
                match.getEvents().add(event);
            }

            return ResponseEntity.ok(match);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/matches/{id}/events")
    public ResponseEntity<?> addEvent(@PathVariable String id, @RequestBody MatchEvent event) {
        Optional<Match> matchOpt = dataStore.matches.stream().filter(m -> m.getId().equals(id)).findFirst();
        if (matchOpt.isPresent()) {
            Match match = matchOpt.get();
            if (event.getId() == null) {
                event.setId("ev-" + UUID.randomUUID().toString().substring(0, 8));
            }
            if (event.getMatchId() == null) event.setMatchId(id);
            if (event.getTimestamp() == null) event.setTimestamp(Instant.now().toString());

            if (match.getEvents() == null) match.setEvents(new ArrayList<>());
            match.getEvents().add(event);
            return ResponseEntity.ok(match);
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/matches/{id}/status")
    public ResponseEntity<?> updateMatchStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        Optional<Match> matchOpt = dataStore.matches.stream().filter(m -> m.getId().equals(id)).findFirst();
        if (matchOpt.isPresent()) {
            Match match = matchOpt.get();
            if (status != null) match.setStatus(status);
            return ResponseEntity.ok(match);
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/matches/{matchId}/assign-official")
    public ResponseEntity<?> assignOfficial(@PathVariable String matchId, @RequestBody Map<String, String> body) {
        String officialId = body.get("officialId");
        String officialName = body.get("officialName");

        Optional<Match> matchOpt = dataStore.matches.stream().filter(m -> m.getId().equals(matchId)).findFirst();
        if (matchOpt.isPresent()) {
            Match match = matchOpt.get();
            match.setOfficial(Match.AssignedOfficial.builder()
                    .id(officialId)
                    .name(officialName)
                    .role("Lead Official")
                    .suitabilityScore(95.0)
                    .build());
            return ResponseEntity.ok(match);
        }
        return ResponseEntity.notFound().build();
    }
}
