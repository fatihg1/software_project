package com.group13.RailLink.DTO;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.group13.RailLink.model.Train;
import com.group13.RailLink.model.Wagons;

public class JourneyDTO {
    private String departureStation;
    private String arrivalStation;
    private int duration;
    private LocalDateTime departureDateTime;
    private LocalDateTime arrivalDateTime;
    private List<Integer> trainPrimaryIds;
    private int wagonsCount;
    private int seferId;
    public List<String> mergedWagonSeats;
    public List<Double> mergedWagonPrices;
    public List<String> mergedWagonTypes;
    private int seats;
    public double maxPrice;
    public double minPrice;
    

    public JourneyDTO(){
        this.trainPrimaryIds = new ArrayList<>();
        this.duration = 0;
        this.mergedWagonPrices = new ArrayList<>();
        this.mergedWagonSeats = new ArrayList<>();
        this.mergedWagonTypes = new ArrayList<>();
    }

    public void setSeats(int seats){
        this.seats=seats;
    }
    public int getSeats(){
        return seats;
    }

    public String getDepartureStation() {
        return departureStation;
    }
    
    public void setDepartureStation(String departureStation) {
        this.departureStation = departureStation;
    }
    
    public String getArrivalStation() {
        return arrivalStation;
    }
    
    public void setArrivalStation(String arrivalStation) {
        this.arrivalStation = arrivalStation;
    }
    
    public int getDuration() {
        return duration;
    }
    
    public void setDuration(int duration) {
        this.duration = duration;
    }
    
    public LocalDateTime getDepartureDateTime() {
        return departureDateTime;
    }
    
    public void setDepartureDateTime(LocalDateTime departureDateTime) {
        this.departureDateTime = departureDateTime;
    }
    
    public LocalDateTime getArrivalDateTime() {
        return arrivalDateTime;
    }
    
    public void setArrivalDateTime(LocalDateTime arrivalDateTime) {
        this.arrivalDateTime = arrivalDateTime;
    }
    
    public List<Integer> getTrainPrimaryIds() {
        return trainPrimaryIds;
    }
    
    public void setTrainPrimaryIds(List<Integer> trainPrimaryIds) {
        this.trainPrimaryIds = trainPrimaryIds;
    }
    
    public int getWagonsCount() {
        return wagonsCount;
    }
    
    public void setWagonsCount(int wagonsCount) {
        this.wagonsCount = wagonsCount;
    }
    
    public int getSeferId() {
        return seferId;
    }
    
    public void setSeferId(int seferId) {
        this.seferId = seferId;
    }
    public void addToList(Integer id){
        this.trainPrimaryIds.add(id);
    }
}
