package com.travelplanner.repository;

import com.travelplanner.model.TransportOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface TransportRepository extends JpaRepository<TransportOption, Long> {

    @Query("SELECT t FROM TransportOption t WHERE LOWER(t.source) = LOWER(:source) AND LOWER(t.destination) = LOWER(:destination)")
    List<TransportOption> findBySourceAndDestination(@Param("source") String source, @Param("destination") String destination);

    @Query("SELECT t FROM TransportOption t WHERE LOWER(t.source) = LOWER(:source) AND LOWER(t.destination) = LOWER(:destination) AND LOWER(t.type) = LOWER(:type)")
    List<TransportOption> findBySourceAndDestinationAndType(@Param("source") String source, @Param("destination") String destination, @Param("type") String type);

    @Query("SELECT DISTINCT t.source FROM TransportOption t ORDER BY t.source")
    List<String> findDistinctSources();

    @Query("SELECT DISTINCT t.destination FROM TransportOption t ORDER BY t.destination")
    List<String> findDistinctDestinations();
}
