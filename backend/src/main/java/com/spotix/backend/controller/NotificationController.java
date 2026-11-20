package com.spotix.backend.controller;

import com.spotix.backend.model.NotificationItem;
import com.spotix.backend.repository.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/notifications")
@CrossOrigin
public class NotificationController {

    private final DataStore dataStore;

    public NotificationController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping
    public ResponseEntity<List<NotificationItem>> getNotifications() {
        return ResponseEntity.ok(dataStore.notifications);
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable String id) {
        Optional<NotificationItem> notif = dataStore.notifications.stream().filter(n -> n.getId().equals(id)).findFirst();
        if (notif.isPresent()) {
            notif.get().setRead(true);
            return ResponseEntity.ok(notif.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/read-all")
    public ResponseEntity<?> markAllRead() {
        dataStore.notifications.forEach(n -> n.setRead(true));
        return ResponseEntity.ok(Map.of("success", true));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable String id) {
        boolean removed = dataStore.notifications.removeIf(n -> n.getId().equals(id));
        return ResponseEntity.ok(Map.of("success", removed));
    }
}
