package com.travelplanner.controller;

import com.travelplanner.model.Review;
import com.travelplanner.service.ReviewService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<Review>> getReviews(
            @RequestParam(required = false) String entityType,
            @RequestParam(required = false) Long entityId) {
        if (entityType != null && entityId != null) {
            return ResponseEntity.ok(reviewService.getReviewsByEntity(entityType, entityId));
        } else if (entityType != null) {
            return ResponseEntity.ok(reviewService.getReviewsByType(entityType));
        }
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> addReview(@RequestBody Review review, HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            response.put("success", false);
            response.put("message", "Please login first");
            return ResponseEntity.status(401).body(response);
        }
        review.setUserId(userId);
        review.setUserName((String) session.getAttribute("userName"));
        Review saved = reviewService.addReview(review);
        response.put("success", true);
        response.put("review", saved);
        return ResponseEntity.ok(response);
    }
}
