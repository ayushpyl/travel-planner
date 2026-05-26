package com.travelplanner.controller;

import com.travelplanner.model.TouristPlace;
import com.travelplanner.service.TouristPlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/places")
public class TouristPlaceController {

    @Autowired
    private TouristPlaceService touristPlaceService;

    @GetMapping("/search")
    public ResponseEntity<List<TouristPlace>> search(@RequestParam String city) {
        List<TouristPlace> results = touristPlaceService.searchByCity(city);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TouristPlace> getById(@PathVariable Long id) {
        TouristPlace place = touristPlaceService.findById(id);
        if (place != null) {
            return ResponseEntity.ok(place);
        }
        return ResponseEntity.notFound().build();
    }
}
