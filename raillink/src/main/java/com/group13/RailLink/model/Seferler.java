package com.group13.RailLink.model;

import java.util.Arrays;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "seferler")
public class Seferler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String stations;
    

    public Seferler(){}

    public int getId(){
        return id;
    }
    public void setId(int id){
        this.id = id;
    }
    public String getStations(){
        return stations;
    }
    public void setStations(String stations){
        this.stations = stations;
    }
    
    public List<String> getStationList() {
        return Arrays.asList(stations.split("-"));
    }
    
}
