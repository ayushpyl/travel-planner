package com.travelplanner.controller;

import com.travelplanner.model.Trip;
import com.travelplanner.service.TripService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired
    private TripService tripService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createTrip(@RequestBody Trip trip, HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            response.put("success", false);
            response.put("message", "Please login first");
            return ResponseEntity.status(401).body(response);
        }
        trip.setUserId(userId);
        Trip saved = tripService.createTrip(trip);
        response.put("success", true);
        response.put("trip", saved);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<Trip>> getUserTrips(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(tripService.getUserTrips(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTrip(@PathVariable Long id) {
        Trip trip = tripService.findById(id);
        if (trip != null) {
            return ResponseEntity.ok(trip);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/calculate")
    public ResponseEntity<Trip> calculateCost(@RequestBody Trip trip) {
        Trip calculated = tripService.calculateCosts(trip);
        return ResponseEntity.ok(calculated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteTrip(@PathVariable Long id, HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            response.put("success", false);
            response.put("message", "Please login first");
            return ResponseEntity.status(401).body(response);
        }
        tripService.deleteTrip(id);
        response.put("success", true);
        response.put("message", "Trip deleted");
        return ResponseEntity.ok(response);
    }
}
