package com.group13.RailLink.controller;

import com.group13.RailLink.model.Wagons;
import com.group13.RailLink.service.WagonsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wagons")
@CrossOrigin(origins = "http://localhost:5173")
public class WagonsController {
    private final WagonsService wagonService;
    
    @Autowired
    public WagonsController(WagonsService wagonService) {
        this.wagonService = wagonService;
    }
    
    @GetMapping
    public ResponseEntity<List<Wagons>> getAllWagons() {
        return ResponseEntity.ok(wagonService.getAllWagons());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Wagons> getWagonById(@PathVariable Integer id) {
        return wagonService.getWagonById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Wagons> createWagon(@RequestBody Wagons wagon) {
        return ResponseEntity.status(HttpStatus.CREATED).body(wagonService.saveWagon(wagon));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Wagons> updateWagon(@PathVariable Integer id, @RequestBody Wagons wagon) {
        return wagonService.getWagonById(id)
                .map(existingWagon -> {
                    wagon.setId(id);
                    return ResponseEntity.ok(wagonService.saveWagon(wagon));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWagon(@PathVariable Integer id) {
        if (!wagonService.getWagonById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        wagonService.deleteWagon(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/train/{trainId}")
    public ResponseEntity<List<Wagons>> getWagonsByTrainId(@PathVariable Integer trainId) {
        List<Wagons> wagons = wagonService.getWagonsByTrainId(trainId);
        return ResponseEntity.ok(wagons);
    }
    
    @GetMapping("/train/{trainId}/seats")
    public ResponseEntity<Map<String, Object>> getTrainSeats(@PathVariable Integer trainId) {
        Map<String, Object> availableSeats = wagonService.getAvailableSeats(trainId);
        return ResponseEntity.ok(availableSeats);
    }
}