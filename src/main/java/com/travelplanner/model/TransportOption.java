package com.travelplanner.model;

import jakarta.persistence.*;

@Entity
@Table(name = "transport_options")
public class TransportOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private String type; // FLIGHT, TRAIN, BUS

    @Column(nullable = false)
    private String provider;

    @Column(nullable = false)
    private Double price;

    @Column(name = "duration_hours")
    private Double durationHours;

    private Double rating;

    public TransportOption() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getDurationHours() { return durationHours; }
    public void setDurationHours(Double durationHours) { this.durationHours = durationHours; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
}
