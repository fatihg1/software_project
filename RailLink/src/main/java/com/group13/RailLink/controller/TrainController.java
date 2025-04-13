package com.group13.RailLink.controller;

import com.group13.RailLink.DTO.JourneyDTO;
import com.group13.RailLink.model.Seferler;
import com.group13.RailLink.model.Train;
import com.group13.RailLink.model.Wagons;
import com.group13.RailLink.service.SeferlerService;
import com.group13.RailLink.service.TrainService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/trains")
@CrossOrigin(origins = "http://localhost:5173")
public class TrainController {
    private final TrainService trainService;
    private final SeferlerService seferlerService;
    
    @Autowired
    public TrainController(TrainService trainService, SeferlerService seferlerService) {
        this.trainService = trainService;
        this.seferlerService = seferlerService;
    }
    
    @GetMapping
    public ResponseEntity<List<Train>> getAllTrains() {
        return ResponseEntity.ok(trainService.getAllTrains());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Train> getTrainById(@PathVariable Integer id) {
        return trainService.getTrainById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Train> createTrain(@RequestBody Train train) {
        return ResponseEntity.status(HttpStatus.CREATED).body(trainService.saveTrain(train));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Train> updateTrain(@PathVariable Integer id, @RequestBody Train train) {
        return trainService.getTrainById(id)
                .map(existingTrain -> {
                    train.setId(id);
                    return ResponseEntity.ok(trainService.saveTrain(train));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrain(@PathVariable Integer id) {
        if (!trainService.getTrainById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        trainService.deleteTrain(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/journey")
    public ResponseEntity<Map<String, Object>> findJourney(
            @RequestParam Integer seferId,
            @RequestParam String departure,
            @RequestParam String arrival) {
        
        // First check if the route contains these stations
        Optional<Seferler> seferler = seferlerService.getSeferlerById(seferId);
        if (!seferler.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        List<Train> segments = trainService.findTrainJourneySegments(seferId, departure, arrival);
        if (segments.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Map<String, Object> journeyDetails = trainService.constructJourneyDetails(segments);
        return ResponseEntity.ok(journeyDetails);
    }

    @GetMapping("/maxTrainId")
    public ResponseEntity<Integer> getMaxTrainId(){
        return ResponseEntity.ok(trainService.getMaxTrainId());
    }

    @GetMapping("/search")
    public ResponseEntity<List<JourneyDTO>> searchTrains(
        @RequestParam String departureStation,
        @RequestParam String arrivalStation,
        @RequestParam String date) {

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            // String'i LocalDate'e çevir
            LocalDate localDate = LocalDate.parse(date, formatter);
    
        List<JourneyDTO> trains = trainService.searchTrainsForThreeInputs(departureStation, arrivalStation, localDate);

        if (trains.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok(trains);
    }

    @PutMapping("/seatUpdate")
public ResponseEntity<?> updateSeatBookings(@RequestBody Map<String, Object> bookingData) {
    try {
        // Extract booking information from the request body
        Map<String, List<Map<String, Integer>>> selectedSeats = 
            (Map<String, List<Map<String, Integer>>>) bookingData.get("selectedSeats");
        List<Map<String, Integer>> outboundSeats = selectedSeats.get("outbound");
        List<Map<String, Integer>> returnSeats = selectedSeats.get("return");
        
        String tripType = (String) bookingData.get("tripType");
        List<Integer> outboundTrainIds = (List<Integer>) bookingData.get("outboundTrainIds");
        List<Integer> returnTrainIds = new ArrayList<>();
        
        if (tripType.equals("round-trip")) {
            returnTrainIds = (List<Integer>) bookingData.get("returnTrainIds");
        }
        
        
        // Process the booking
        List<Wagons> updatedWagons = trainService.updateSeatBookings(
            outboundSeats, 
            returnSeats, 
            outboundTrainIds, 
            returnTrainIds
        );
        
        return ResponseEntity.ok(updatedWagons);
    } catch (Exception e) {
        // Log the error for server-side debugging
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Error processing booking: " + e.getMessage());
    }
}

@GetMapping("/count")
public ResponseEntity<Integer> countDistinctTrains() {
    return ResponseEntity.ok(trainService.countDistinctTrains());
}

}
