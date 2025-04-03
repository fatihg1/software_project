package com.group13.RailLink.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group13.RailLink.model.Seferler;
import com.group13.RailLink.service.seferlerService;

@RestController
@RequestMapping("/seferler")
@CrossOrigin(origins = "http://localhost:3000")
public class seferlerController {
    private final seferlerService seferler_service;

    @Autowired
    public seferlerController(seferlerService seferler_service){
        this.seferler_service = seferler_service;
    }

    @PostMapping
    public ResponseEntity<Seferler> createSefer(@RequestBody Seferler sefer){
        return ResponseEntity.ok(seferler_service.createSefer(sefer));
    }

    @GetMapping
    public ResponseEntity<List<Seferler>> getAllSeferler(){
        return ResponseEntity.ok(seferler_service.getAllSeferler());
    }

    @GetMapping("/seferler/{id}")
    public ResponseEntity<Seferler> getSeferById(@PathVariable Integer id){
        return ResponseEntity.ok(seferler_service.getSeferlerById(id));
    }
}
