package com.travelplanner.service;

import com.travelplanner.model.*;
import com.travelplanner.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private TransportService transportService;

    @Autowired
    private HotelService hotelService;

    @Autowired
    private TouristPlaceService touristPlaceService;

    // Estimated daily costs
    private static final double FOOD_COST_PER_DAY = 800.0;       // ₹800/day
    private static final double LOCAL_TRANSPORT_PER_DAY = 500.0;  // ₹500/day

    public Trip createTrip(Trip trip) {
        calculateCosts(trip);
        return tripRepository.save(trip);
    }

    public Trip calculateCosts(Trip trip) {
        double transportCost = 0;
        double hotelCost = 0;
        double foodCost = 0;
        double localTransportCost = 0;
        double attractionCost = 0;
        int days = trip.getNumDays() != null ? trip.getNumDays() : 1;
        int travelers = trip.getNumTravelers() != null ? trip.getNumTravelers() : 1;

        // Transport cost
        if (trip.getTransportOptionId() != null) {
            TransportOption transport = transportService.findById(trip.getTransportOptionId());
            if (transport != null) {
                transportCost = transport.getPrice() * travelers * 2; // Round trip
            }
        }

        // Hotel cost
        if (trip.getHotelId() != null) {
            Hotel hotel = hotelService.findById(trip.getHotelId());
            if (hotel != null) {
                int nights = Math.max(days - 1, 1);
                hotelCost = hotel.getPricePerNight() * nights;
            }
        }

        // Food cost
        foodCost = FOOD_COST_PER_DAY * days * travelers;

        // Local transport cost
        localTransportCost = LOCAL_TRANSPORT_PER_DAY * days * travelers;

        // Attraction entry fees
        if (trip.getAttractionIds() != null && !trip.getAttractionIds().isEmpty()) {
            List<Long> attractionIdList = Arrays.stream(trip.getAttractionIds().split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .map(Long::parseLong)
                    .collect(Collectors.toList());
            List<TouristPlace> attractions = touristPlaceService.findByIds(attractionIdList);
            for (TouristPlace place : attractions) {
                if (place.getEntryFee() != null) {
                    attractionCost += place.getEntryFee() * travelers;
                }
            }
        }

        trip.setTransportCost(transportCost);
        trip.setHotelCost(hotelCost);
        trip.setFoodCost(foodCost);
        trip.setLocalTransportCost(localTransportCost);
        trip.setAttractionCost(attractionCost);
        trip.setTotalCost(transportCost + hotelCost + foodCost + localTransportCost + attractionCost);

        return trip;
    }

    public List<Trip> getUserTrips(Long userId) {
        return tripRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Trip findById(Long id) {
        return tripRepository.findById(id).orElse(null);
    }

    public Trip saveTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    public void deleteTrip(Long id) {
        tripRepository.deleteById(id);
    }
}
