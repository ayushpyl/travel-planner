package com.travelplanner.repository;

import com.travelplanner.model.TouristPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface TouristPlaceRepository extends JpaRepository<TouristPlace, Long> {

    @Query("SELECT tp FROM TouristPlace tp WHERE LOWER(tp.city) = LOWER(:city)")
    List<TouristPlace> findByCity(@Param("city") String city);

    @Query("SELECT tp FROM TouristPlace tp WHERE LOWER(tp.city) = LOWER(:city) AND tp.rating >= :minRating")
    List<TouristPlace> findByCityAndMinRating(@Param("city") String city, @Param("minRating") Double minRating);
}
