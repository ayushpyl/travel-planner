package com.travelplanner.controller;

import com.travelplanner.model.TransportOption;
import com.travelplanner.service.TransportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transport")
public class TransportController {

    @Autowired
    private TransportService transportService;

    @GetMapping("/search")
    public ResponseEntity<List<TransportOption>> search(
            @RequestParam String source,
            @RequestParam String destination,
            @RequestParam(required = false) String type) {
        List<TransportOption> results = transportService.search(source, destination, type);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransportOption> getById(@PathVariable Long id) {
        TransportOption option = transportService.findById(id);
        if (option != null) {
            return ResponseEntity.ok(option);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/cities")
    public ResponseEntity<?> getCities() {
        var sources = transportService.getAllSources();
        var destinations = transportService.getAllDestinations();
        return ResponseEntity.ok(java.util.Map.of("sources", sources, "destinations", destinations));
    }
}
