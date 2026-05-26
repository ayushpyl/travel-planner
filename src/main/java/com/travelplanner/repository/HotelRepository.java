package com.travelplanner.repository;

import com.travelplanner.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

    @Query("SELECT h FROM Hotel h WHERE LOWER(h.city) = LOWER(:city)")
    List<Hotel> findByCity(@Param("city") String city);

    @Query("SELECT h FROM Hotel h WHERE LOWER(h.city) = LOWER(:city) AND h.pricePerNight BETWEEN :minPrice AND :maxPrice")
    List<Hotel> findByCityAndPriceRange(@Param("city") String city, @Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice);

    @Query("SELECT h FROM Hotel h WHERE LOWER(h.city) = LOWER(:city) AND h.rating >= :minRating")
    List<Hotel> findByCityAndMinRating(@Param("city") String city, @Param("minRating") Double minRating);

    @Query("SELECT h FROM Hotel h WHERE LOWER(h.city) = LOWER(:city) AND h.pricePerNight BETWEEN :minPrice AND :maxPrice AND h.rating >= :minRating")
    List<Hotel> findByCityAndPriceRangeAndMinRating(@Param("city") String city, @Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice, @Param("minRating") Double minRating);
}
