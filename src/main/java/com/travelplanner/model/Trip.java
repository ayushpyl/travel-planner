package com.travelplanner.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "trips")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String destination;

    @Column(name = "travel_date")
    private LocalDate travelDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    @Column(name = "num_days")
    private Integer numDays;

    @Column(name = "num_travelers")
    private Integer numTravelers = 1;

    // Selected options
    @Column(name = "transport_option_id")
    private Long transportOptionId;

    @Column(name = "hotel_id")
    private Long hotelId;

    // Cost breakdown
    @Column(name = "transport_cost")
    private Double transportCost = 0.0;

    @Column(name = "hotel_cost")
    private Double hotelCost = 0.0;

    @Column(name = "food_cost")
    private Double foodCost = 0.0;

    @Column(name = "local_transport_cost")
    private Double localTransportCost = 0.0;

    @Column(name = "attraction_cost")
    private Double attractionCost = 0.0;

    @Column(name = "total_cost")
    private Double totalCost = 0.0;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // Store attraction IDs as comma-separated string
    @Column(name = "attraction_ids", length = 500)
    private String attractionIds;

    @Column(name = "trip_name")
    private String tripName;

    public Trip() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }

    public LocalDate getReturnDate() { return returnDate; }
    public void setReturnDate(LocalDate returnDate) { this.returnDate = returnDate; }

    public Integer getNumDays() { return numDays; }
    public void setNumDays(Integer numDays) { this.numDays = numDays; }

    public Integer getNumTravelers() { return numTravelers; }
    public void setNumTravelers(Integer numTravelers) { this.numTravelers = numTravelers; }

    public Long getTransportOptionId() { return transportOptionId; }
    public void setTransportOptionId(Long transportOptionId) { this.transportOptionId = transportOptionId; }

    public Long getHotelId() { return hotelId; }
    public void setHotelId(Long hotelId) { this.hotelId = hotelId; }

    public Double getTransportCost() { return transportCost; }
    public void setTransportCost(Double transportCost) { this.transportCost = transportCost; }

    public Double getHotelCost() { return hotelCost; }
    public void setHotelCost(Double hotelCost) { this.hotelCost = hotelCost; }

    public Double getFoodCost() { return foodCost; }
    public void setFoodCost(Double foodCost) { this.foodCost = foodCost; }

    public Double getLocalTransportCost() { return localTransportCost; }
    public void setLocalTransportCost(Double localTransportCost) { this.localTransportCost = localTransportCost; }

    public Double getAttractionCost() { return attractionCost; }
    public void setAttractionCost(Double attractionCost) { this.attractionCost = attractionCost; }

    public Double getTotalCost() { return totalCost; }
    public void setTotalCost(Double totalCost) { this.totalCost = totalCost; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getAttractionIds() { return attractionIds; }
    public void setAttractionIds(String attractionIds) { this.attractionIds = attractionIds; }

    public String getTripName() { return tripName; }
    public void setTripName(String tripName) { this.tripName = tripName; }
}
