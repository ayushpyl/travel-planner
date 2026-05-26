package com.travelplanner.service;

import com.travelplanner.model.TransportOption;
import com.travelplanner.repository.TransportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TransportService {

    @Autowired
    private TransportRepository transportRepository;

    public List<TransportOption> search(String source, String destination, String type) {
        if (type != null && !type.isEmpty()) {
            return transportRepository.findBySourceAndDestinationAndType(source, destination, type);
        }
        return transportRepository.findBySourceAndDestination(source, destination);
    }

    public TransportOption findById(Long id) {
        return transportRepository.findById(id).orElse(null);
    }

    public List<String> getAllSources() {
        return transportRepository.findDistinctSources();
    }

    public List<String> getAllDestinations() {
        return transportRepository.findDistinctDestinations();
    }
}
