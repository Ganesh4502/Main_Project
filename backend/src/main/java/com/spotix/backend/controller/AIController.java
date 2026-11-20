package com.spotix.backend.controller;

import com.spotix.backend.model.*;
import com.spotix.backend.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/ai")
@CrossOrigin
public class AIController {

    private final DataStore dataStore;

    public AIController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @PostMapping("/fixtures/generate")
    public ResponseEntity<AIFixtureResult> generateFixtures(@RequestBody AIFixtureParams params) {
        String arenaId = (params.getArenaIds() != null && !params.getArenaIds().isEmpty())
                ? params.getArenaIds().get(0)
                : "arena-1";

        List<Match> generated = new ArrayList<>();
        int count = Math.max(params.getTeamsCount() / 2, 4);

        for (int i = 1; i <= count; i++) {
            Match match = Match.builder()
                    .id("ai-m-" + i)
                    .tournamentId(params.getTournamentId())
                    .tournamentName("Spotix AI Optimized Championship")
                    .sport("Basketball")
                    .roundName("Match " + i)
                    .matchNumber(i)
                    .teamA(MatchScoreTeam.builder()
                            .id("team-" + ((i * 2) - 1))
                            .name("Team Seed " + ((i * 2) - 1))
                            .tag("S" + ((i * 2) - 1))
                            .logoUrl("https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&auto=format&fit=crop&q=80")
                            .score(0)
                            .fouls(0)
                            .timeoutsRemaining(3)
                            .build())
                    .teamB(MatchScoreTeam.builder()
                            .id("team-" + (i * 2))
                            .name("Team Seed " + (i * 2))
                            .tag("S" + (i * 2))
                            .logoUrl("https://images.unsplash.com/photo-1546519638-68e109498ffc?w=150&auto=format&fit=crop&q=80")
                            .score(0)
                            .fouls(0)
                            .timeoutsRemaining(3)
                            .build())
                    .date(params.getStartDate() != null ? params.getStartDate() : "2026-10-12")
                    .time((9 + i) + ":00 AM")
                    .arenaId(arenaId)
                    .arenaName("Apex Grand Sports Complex")
                    .court("Court " + ((char) ('A' + (i % 3))))
                    .status("SCHEDULED")
                    .currentPeriod("Scheduled")
                    .periodTimeRemaining("00:00")
                    .build();

            generated.add(match);
        }

        AIFixtureResult result = AIFixtureResult.builder()
                .scheduleQuality(98.2)
                .metrics(AIFixtureResult.FixtureMetrics.builder()
                        .conflicts(0)
                        .arenaConflicts(0)
                        .restViolations(0)
                        .teamsScheduled(count * 2)
                        .matchesCount(count)
                        .utilizationRate(94.5)
                        .build())
                .matches(generated)
                .generatedAt(Instant.now().toString())
                .build();

        return ResponseEntity.ok(result);
    }

    @GetMapping("/matches/{matchId}/officials")
    public ResponseEntity<List<AIOfficialRecommendation>> getRecommendedOfficials(@PathVariable String matchId) {
        List<AIOfficialRecommendation> recommendations = List.of(
                AIOfficialRecommendation.builder()
                        .officialId("off-1")
                        .officialName("Rahul Kumar")
                        .officialAvatar("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80")
                        .suitabilityScore(96.8)
                        .metrics(AIOfficialRecommendation.RecommendationMetrics.builder()
                                .sportExpertise(98.0)
                                .experienceScore(94.0)
                                .availability(100.0)
                                .workloadScore(42.0)
                                .conflictRisk("Low")
                                .build())
                        .explanation("Certified FIBA Grade 1 official with 9+ years top-flight experience and optimal resting cadence.")
                        .build(),
                AIOfficialRecommendation.builder()
                        .officialId("off-2")
                        .officialName("Elena Moreau")
                        .officialAvatar("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80")
                        .suitabilityScore(91.4)
                        .metrics(AIOfficialRecommendation.RecommendationMetrics.builder()
                                .sportExpertise(92.0)
                                .experienceScore(88.0)
                                .availability(95.0)
                                .workloadScore(55.0)
                                .conflictRisk("Low")
                                .build())
                        .explanation("High referee ranking in collegiate championships with excellent rule enforcement index.")
                        .build()
        );

        return ResponseEntity.ok(recommendations);
    }
}
