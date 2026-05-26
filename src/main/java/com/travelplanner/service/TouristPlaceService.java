package com.travelplanner.service;

import com.travelplanner.model.TouristPlace;
import com.travelplanner.repository.TouristPlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TouristPlaceService {

    @Autowired
    private TouristPlaceRepository touristPlaceRepository;

    public List<TouristPlace> searchByCity(String city) {
        return touristPlaceRepository.findByCity(city);
    }

    public TouristPlace findById(Long id) {
        return touristPlaceRepository.findById(id).orElse(null);
    }

    public List<TouristPlace> findByIds(List<Long> ids) {
        return touristPlaceRepository.findAllById(ids);
    }
}
