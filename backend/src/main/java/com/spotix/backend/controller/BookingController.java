package com.spotix.backend.controller;

import com.spotix.backend.model.Booking;
import com.spotix.backend.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/bookings")
@CrossOrigin
public class BookingController {

    private final DataStore dataStore;

    public BookingController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getBookings(
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String arenaId) {

        List<Booking> list = dataStore.bookings.stream()
                .filter(b -> userId == null || b.getUserId().equals(userId))
                .filter(b -> arenaId == null || b.getArenaId().equals(arenaId))
                .collect(Collectors.toList());

        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable String id) {
        Optional<Booking> booking = dataStore.bookings.stream().filter(b -> b.getId().equals(id)).findFirst();
        return booking.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        if (booking.getId() == null) {
            booking.setId("book-" + UUID.randomUUID().toString().substring(0, 8));
        }
        if (booking.getBookingNumber() == null) {
            booking.setBookingNumber("SPX-BK-" + (1000 + dataStore.bookings.size() + 1));
        }
        if (booking.getCreatedAt() == null) {
            booking.setCreatedAt(Instant.now().toString());
        }
        if (booking.getStatus() == null) {
            booking.setStatus("APPROVED");
        }
        if (booking.getPaymentStatus() == null) {
            booking.setPaymentStatus("PAID");
        }

        dataStore.bookings.add(booking);
        return ResponseEntity.ok(booking);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        Optional<Booking> bookingOpt = dataStore.bookings.stream().filter(b -> b.getId().equals(id)).findFirst();
        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            if (status != null) booking.setStatus(status);
            return ResponseEntity.ok(booking);
        }
        return ResponseEntity.notFound().build();
    }
}
