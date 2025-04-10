package com.group13.RailLink.service;

import com.group13.RailLink.DTO.JourneyDTO;
import com.group13.RailLink.model.Seferler;
import com.group13.RailLink.model.Train;
import com.group13.RailLink.model.Wagons;
import com.group13.RailLink.repository.TrainRepository;
import com.group13.RailLink.repository.WagonsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TrainService {
    private final TrainRepository trainRepository;
    private final SeferlerService seferlerService;
    private final WagonsRepository wagonsRepository;

    @Autowired
    public TrainService(TrainRepository trainRepository, SeferlerService seferlerService, WagonsRepository wagonsRepository) {
        this.trainRepository = trainRepository;
        this.seferlerService = seferlerService;
        this.wagonsRepository = wagonsRepository;
    }

    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }

    public Optional<Train> getTrainById(Integer id) {
        return trainRepository.findById(id);
    }

    public Train saveTrain(Train train) {
        return trainRepository.save(train);
    }

    public void deleteTrain(Integer id) {
        trainRepository.deleteById(id);
    }

    // Find train journey segments between departure and arrival stations
    public List<Train> findTrainJourneySegments(Integer seferId, String departure, String arrival) {
        Optional<Seferler> seferlerOpt = seferlerService.getSeferlerById(seferId);
        if (seferlerOpt.isPresent()) {
            Seferler seferler = seferlerOpt.get();
            List<String> stationsBetween = seferlerService.getStationsBetween(seferler, departure, arrival);
            return trainRepository.findTrainSegmentsBySeferIdAndStations(seferId, stationsBetween);
        }
        return Collections.emptyList();
    }

    // Calculate total journey duration and construct journey details
    public Map<String, Object> constructJourneyDetails(List<Train> trainSegments) {
        Map<String, Object> journeyDetails = new HashMap<>();
        if (trainSegments.isEmpty()) {
            return journeyDetails;
        }

        // Get first and last segments
        Train firstSegment = trainSegments.get(0);
        Train lastSegment = trainSegments.get(trainSegments.size() - 1);

        // Calculate total duration
        long totalDurationMinutes = trainSegments.stream()
                .mapToInt(Train::getDuration)
                .sum();

        journeyDetails.put("departureStation", firstSegment.getDepartureStation());
        journeyDetails.put("arrivalStation", lastSegment.getArrivalStation());
        journeyDetails.put("departureDateTime", firstSegment.getDepartureDateTime());
        journeyDetails.put("arrivalDateTime", lastSegment.getArrivalDateTime());
        journeyDetails.put("totalDuration", totalDurationMinutes);
        journeyDetails.put("segments", trainSegments);
        
        return journeyDetails;
    }

    //old method
    public List<Train> searchTrains(String departureStation, String arrivalStation, String dateString) {
        // Convert string to LocalDate
        LocalDate requestedDate = LocalDate.parse(dateString);

        // Find matching train routes
        List<Seferler> seferlerList = seferlerService.findRoutesBetweenStations(departureStation, arrivalStation);
        if (seferlerList.isEmpty()) {
            return List.of(); // No matching train routes
        }

        return seferlerList.stream()
                .flatMap(seferler -> trainRepository.findBySeferIdAndDepartureStationAndArrivalStation(
                        seferler.getId(), departureStation, arrivalStation).stream())
                .filter(train -> train.getDepartureDateTime().toLocalDate().equals(requestedDate)) // Match only the date part
                .collect(Collectors.toList());
    }

    public static String compareBinaryStrings(String s1, String s2) {
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < s1.length(); i++) {
            char c1 = s1.charAt(i);
            char c2 = s2.charAt(i);

            // İkisi de 0 ise sonuç 0, diğer durumlarda 1
            if (c1 == '0' && c2 == '0') {
                result.append('0');
            } else {
                result.append('1');
            }
        }

        return result.toString();
    }
    public static int countZeros(String binaryString) {
        int count = 0;
        for (char c : binaryString.toCharArray()) {
            if (c == '0') {
                count++;
            }
        }
        return count;
    }

    public Integer getMaxTrainId(){
        return trainRepository.findMaxTrainId();
    }

    public List<JourneyDTO> searchTrainsForThreeInputs(String departure, String arrival,LocalDate date) {

        // 1. Seferi bul
        List<Seferler> routes = seferlerService.findRoutesBetweenStations(departure, arrival);
        if (routes.isEmpty()) {
            return Collections.emptyList();
        }
        Seferler selectedRoute = routes.get(0); // varsayım: 1 tane sefer var

        // 2. Durak listesini al
        List<String> stations = seferlerService.getStationsBetween(selectedRoute, departure, arrival);

        List<Integer> TrainIdOfTheTrain = trainRepository.findTrainIdBySeferIdAndDepartureStationAndDate(selectedRoute.getId(),departure,date);

        if(TrainIdOfTheTrain.isEmpty()){
            return Collections.emptyList();
        }

        List<JourneyDTO> fullJourney = new ArrayList<>();

        // 3. Train segmentlerini sırayla topla
       
        for(int j = 0;j<TrainIdOfTheTrain.size();j++){
            JourneyDTO temporary = new JourneyDTO();
            temporary.id=j+1;
            temporary.setDepartureStation(departure);
            temporary.setArrivalStation(arrival);
            for(int i = 0;i<stations.size()-1;i++){
                int depIndex = i;
                int arrIndex = i+1;
                List<Train> temp = trainRepository.findByTrainIdAndDepartureStationAndArrivalStation(TrainIdOfTheTrain.get(j), stations.get(depIndex),stations.get(arrIndex) );
                if (!temp.isEmpty()) {  
                    if(temp.get(0).getDepartureStation().equals(departure)){
                        temporary.setDepartureDateTime(temp.get(0).getDepartureDateTime());
                    }
                    if(temp.get(0).getArrivalStation().equals(arrival)){
                        temporary.setArrivalDateTime(temp.get(0).getArrivalDateTime());
                    }
                    temporary.addToList(temp.get(0).getId());
                    if(temporary.getDuration()!=0)
                        temporary.setDuration(temp.get(0).getDuration()+temporary.getDuration()+10);
                    else{
                        temporary.setDuration(temp.get(0).getDuration()+temporary.getDuration());
                    }
                    temporary.setWagonsCount(temp.get(0).getWagonsCount());
                    temporary.setSeferId(temp.get(0).getSeferId());
                    for(int k = 0;k<temporary.getWagonsCount();k++){
                        if(i==0){
                            temporary.mergedWagonPrices.add(wagonsRepository.findByTrainIdAndWagonNumber(temp.get(0).getId(), k+1).get(0).getPrice());
                            temporary.mergedWagonSeats.add(wagonsRepository.findByTrainIdAndWagonNumber(temp.get(0).getId(), k+1).get(0).getSeats());
                            temporary.mergedWagonTypes.add(wagonsRepository.findByTrainIdAndWagonNumber(temp.get(0).getId(), k+1).get(0).getType());
                        }
                        else{
                            temporary.mergedWagonPrices.set(k,temporary.mergedWagonPrices.get(k)+wagonsRepository.findByTrainIdAndWagonNumber(temp.get(0).getId(), k+1).get(0).getPrice());
                            temporary.mergedWagonSeats.set(k,compareBinaryStrings(temporary.mergedWagonSeats.get(k), wagonsRepository.findByTrainIdAndWagonNumber(temp.get(0).getId(), k+1).get(0).getSeats()));
                        }
                    }
                }
            }
            temporary.setSeats(0);
            for(int l = 0;l<temporary.getWagonsCount();l++){
                temporary.setSeats(temporary.getSeats()+countZeros(temporary.mergedWagonSeats.get(l)));
            }
            temporary.maxPrice=Collections.max(temporary.mergedWagonPrices);
            temporary.minPrice=Collections.min(temporary.mergedWagonPrices);
            fullJourney.add(temporary);
        }



        return fullJourney;
    }



    
        public List<Wagons> updateSeatBookings(
            List<Map<String, Integer>> outboundSeats, 
            List<Map<String, Integer>> returnSeats, 
            List<Integer> outboundTrainIds, 
            List<Integer> returnTrainIds
            ) {
            
            List<Wagons> updatedWagons = new ArrayList<>();
            
            // Process outbound seat bookings
            for (Map<String, Integer> seat : outboundSeats) {
                int wagonNumber = seat.get("wagon");
                int seatNumber = seat.get("number");
                
                // For each outbound train ID, mark the seat as booked
                for (Integer trainId : outboundTrainIds) {
                    Wagons wagon = getWagonBySeatAndTrainId(wagonNumber, trainId);
                    if (wagon != null) {
                        // Update the seat status to booked
                        updateSeatStatus(wagon, seatNumber);
                        updatedWagons.add(wagon);
                    }
                }
            }
            
            // Process return seat bookings if it's a round trip
            if (!returnSeats.isEmpty() && !returnTrainIds.isEmpty()) {
                for (Map<String, Integer> seat : returnSeats) {
                    int wagonNumber = seat.get("wagon");
                    int seatNumber = seat.get("number");
                    
                    // For each return train ID, mark the seat as booked
                    for (Integer trainId : returnTrainIds) {
                        Wagons wagon = getWagonBySeatAndTrainId(wagonNumber, trainId);
                        if (wagon != null) {
                            // Update the seat status to booked
                            updateSeatStatus(wagon, seatNumber);
                            updatedWagons.add(wagon);
                        }
                    }
                }
            }
            
            
            return updatedWagons;
        }

        // Helper methods to implement:
        private Wagons getWagonBySeatAndTrainId(int wagonNumber, Integer trainId) {
            List<Wagons> ans = wagonsRepository.findByTrainIdAndWagonNumber(trainId, wagonNumber);
            if(ans.isEmpty())
                return null;
            return ans.get(0);
        }

        private void updateSeatStatus(Wagons wagon, int seatNumber) {
            // Get the current seats string from the wagon
            String currentSeatsString = wagon.getSeats();
            
            // Convert seatNumber to zero-based index
            int seatIndex = seatNumber - 1;
            
            // Validate that the seat index is within range
            if (seatIndex < 0 || seatIndex >= currentSeatsString.length()) {
                throw new IllegalArgumentException("Seat number " + seatNumber + " is out of range for wagon " + wagon.getId());
            }
            
            // Validate that the seat is available (is '0')
            if (currentSeatsString.charAt(seatIndex) == '1') {
                throw new IllegalStateException("Seat " + seatNumber + " in wagon " + wagon.getId() + " is already booked");
            }
            
            // Create a new seats string with the specified seat marked as booked ('1')
            StringBuilder updatedSeatsString = new StringBuilder(currentSeatsString);
            updatedSeatsString.setCharAt(seatIndex, '1');
            
            // Update the seats string in the wagon object
            wagon.setSeats(updatedSeatsString.toString());
            
            // Save the updated wagon to the database
            wagonsRepository.save(wagon);
        }
    
}
