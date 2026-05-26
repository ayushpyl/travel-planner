package com.travelplanner.repository;

import com.travelplanner.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByEntityTypeAndEntityIdOrderByCreatedAtDesc(String entityType, Long entityId);
    List<Review> findByEntityTypeOrderByCreatedAtDesc(String entityType);
    List<Review> findAllByOrderByCreatedAtDesc();
}
