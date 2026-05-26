package com.travelplanner.service;

import com.travelplanner.model.Hotel;
import com.travelplanner.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public List<Hotel> search(String city, Double minPrice, Double maxPrice, Double minRating) {
        boolean hasPrice = (minPrice != null && maxPrice != null);
        boolean hasRating = (minRating != null);

        if (hasPrice && hasRating) {
            return hotelRepository.findByCityAndPriceRangeAndMinRating(city, minPrice, maxPrice, minRating);
        } else if (hasPrice) {
            return hotelRepository.findByCityAndPriceRange(city, minPrice, maxPrice);
        } else if (hasRating) {
            return hotelRepository.findByCityAndMinRating(city, minRating);
        }
        return hotelRepository.findByCity(city);
    }

    public Hotel findById(Long id) {
        return hotelRepository.findById(id).orElse(null);
    }
}
