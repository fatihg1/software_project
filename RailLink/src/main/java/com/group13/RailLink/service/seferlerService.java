package com.group13.RailLink.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.group13.RailLink.model.Seferler;
import com.group13.RailLink.repository.seferlerRepo;



@Service
public class seferlerService {

    private final seferlerRepo seferler_repo;

    public seferlerService(seferlerRepo seferler_repo){
        this.seferler_repo = seferler_repo;
    }

    public Seferler createSefer(Seferler sefer){
        return seferler_repo.save(sefer);
    }

    public List<Seferler> getAllSeferler(){
        return seferler_repo.findAll();
    }

    public Seferler getSeferlerById(Integer id){
        return seferler_repo.findById(id)
            .orElseThrow(()->new RuntimeException("sefer not found with id: " + id));
    }

}
