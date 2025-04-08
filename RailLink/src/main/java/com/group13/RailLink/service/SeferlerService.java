package com.group13.RailLink.service;

import com.group13.RailLink.model.Seferler;
import com.group13.RailLink.repository.SeferlerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class SeferlerService {
    private final SeferlerRepository seferlerRepository;
    
    @Autowired
    public SeferlerService(SeferlerRepository seferlerRepository) {
        this.seferlerRepository = seferlerRepository;
    }
    
    public List<Seferler> getAllSeferler() {
        return seferlerRepository.findAll();
    }

    public List<String> getAllStations(){
        List<String> ans = new ArrayList<>();
        List<Seferler> seferler = seferlerRepository.findAll();
        for(int i = 0;i<seferler.size();i++){
            String stations = seferler.get(i).getStations();
            String[] allStations = stations.split("-");
            List<String> stationsList = Arrays.asList(allStations);
            for(int j = 0;j<stationsList.size();j++){
                if (!ans.contains(stationsList.get(j)))
                    ans.add(stationsList.get(j));
            }
        }
        return ans;
    }
    
    public Optional<Seferler> getSeferlerById(Integer id) {
        return seferlerRepository.findById(id);
    }
    
    public Seferler saveSeferler(Seferler seferler) {
        return seferlerRepository.save(seferler);
    }
    
    public void deleteSeferler(Integer id) {
        seferlerRepository.deleteById(id);
    }
    
    // Find route that contains both stations in the correct order
    public List<Seferler> findRoutesBetweenStations(String departure, String arrival) {
        return seferlerRepository.findByDepartureAndArrivalStations(departure, arrival);
    }
    
    // Get ordered list of stations between departure and arrival
    public List<String> getStationsBetween(Seferler seferler, String departure, String arrival) {
        String stations = seferler.getStations();
        
        // Extract all stations from the stations string
        String[] allStations = stations.split("-");
        List<String> stationsList = Arrays.asList(allStations);
        
        int departureIndex = stationsList.indexOf(departure);
        int arrivalIndex = stationsList.indexOf(arrival);
        
        // Return the sublist of stations between departure and arrival
        return stationsList.subList(departureIndex, arrivalIndex + 1);
    }

    public List<String> findStationStringsContaining(String keyword) {
        List<Seferler> seferlerList = seferlerRepository.findAll();
        List<String> matchingStationStrings = new ArrayList<>();

        for (Seferler sefer : seferlerList) {
            String stationStr = sefer.getStations();
            if (stationStr.toLowerCase().contains(keyword.toLowerCase())) {
                matchingStationStrings.add(stationStr);
            }
        }

        return matchingStationStrings;
    }

}
