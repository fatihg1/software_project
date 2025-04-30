package com.group13.RailLink.service;

import com.group13.RailLink.model.Wagons;
import com.group13.RailLink.repository.WagonsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class WagonsService {
    private final WagonsRepository wagonRepository;
    
    @Autowired
    public WagonsService(WagonsRepository wagonRepository) {
        this.wagonRepository = wagonRepository;
    }
    
    public List<Wagons> getAllWagons() {
        return wagonRepository.findAll();
    }
    
    public Optional<Wagons> getWagonById(Integer id) {
        return wagonRepository.findById(id);
    }
    
    public Wagons saveWagon(Wagons wagon) {
        return wagonRepository.save(wagon);
    }
    
    public void deleteWagon(Integer id) {
        wagonRepository.deleteById(id);
    }
    
    public List<Wagons> getWagonsByTrainId(Integer trainId) {
        return wagonRepository.findByTrainId(trainId);
    }
    
    // Get available seats for a specific train segment
    public Map<String, Object> getAvailableSeats(Integer trainId) {
        Map<String, Object> result = new HashMap<>();
        List<Wagons> wagons = wagonRepository.findByTrainId(trainId);
        
        List<Map<String, Object>> wagonDetails = new ArrayList<>();
        for (Wagons wagon : wagons) {
            Map<String, Object> wagonInfo = new HashMap<>();
            wagonInfo.put("wagonNumber", wagon.getWagonNumber());
            wagonInfo.put("type", wagon.getType());
            wagonInfo.put("price", wagon.getPrice());
            wagonInfo.put("seats", parseSeats(wagon.getSeats()));
            
            wagonDetails.add(wagonInfo);
        }
        
        result.put("trainId", trainId);
        result.put("wagons", wagonDetails);
        
        return result;
    }
    
    // Parse the seats string into a structured format
    private Map<String, Boolean> parseSeats(String seatsString) {
        Map<String, Boolean> seats = new HashMap<>();
        // Assuming seats format is like "1A:true,1B:false" where true means available
        
        String[] seatEntries = seatsString.split(",");
        for (String entry : seatEntries) {
            String[] parts = entry.split(":");
            if (parts.length == 2) {
                seats.put(parts[0], Boolean.parseBoolean(parts[1]));
            }
        }
        
        return seats;
    }
}