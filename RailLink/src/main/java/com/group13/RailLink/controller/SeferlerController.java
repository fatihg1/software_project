package com.group13.RailLink.controller;

import com.group13.RailLink.model.Seferler;
import com.group13.RailLink.service.SeferlerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


// SeferlerController.java
@RestController
@RequestMapping("/api/seferler")
@CrossOrigin(origins = "http://localhost:5173")
public class SeferlerController {
    private final SeferlerService seferlerService;
    
    @Autowired
    public SeferlerController(SeferlerService seferlerService) {
        this.seferlerService = seferlerService;
    }
    
    @GetMapping
    public ResponseEntity<List<Seferler>> getAllSeferler() {
        return ResponseEntity.ok(seferlerService.getAllSeferler());
    }

    @GetMapping("/stations")
    public ResponseEntity<List<String>> getAllstations(){
        return ResponseEntity.ok(seferlerService.getAllStations());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Seferler> getSeferlerById(@PathVariable Integer id) {
        return seferlerService.getSeferlerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Seferler> createSeferler(@RequestBody Seferler seferler) {
        return ResponseEntity.status(HttpStatus.CREATED).body(seferlerService.saveSeferler(seferler));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Seferler> updateSeferler(@PathVariable Integer id, @RequestBody Seferler seferler) {
        return seferlerService.getSeferlerById(id)
                .map(existingSeferler -> {
                    seferler.setId(id);
                    return ResponseEntity.ok(seferlerService.saveSeferler(seferler));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeferler(@PathVariable Integer id) {
        if (!seferlerService.getSeferlerById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        seferlerService.deleteSeferler(id);
        return ResponseEntity.noContent().build();
    }

    //first step find the sefer
    @GetMapping("/search")
    public ResponseEntity<List<Seferler>> searchRoutes(
            @RequestParam String departure, 
            @RequestParam String arrival) {
        List<Seferler> routes = seferlerService.findRoutesBetweenStations(departure, arrival);
        return ResponseEntity.ok(routes);
    }

    @GetMapping("/stationCenter")
    public ResponseEntity<List<String>> searchTrainLines(
        @RequestParam String station) {
            List<String> lines = seferlerService.findStationStringsContaining(station);
            return ResponseEntity.ok(lines);
    }
}