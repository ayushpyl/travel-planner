package com.travelplanner.service;

import com.travelplanner.model.Review;
import com.travelplanner.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByEntity(String entityType, Long entityId) {
        return reviewRepository.findByEntityTypeAndEntityIdOrderByCreatedAtDesc(entityType, entityId);
    }

    public List<Review> getReviewsByType(String entityType) {
        return reviewRepository.findByEntityTypeOrderByCreatedAtDesc(entityType);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAllByOrderByCreatedAtDesc();
    }
}
