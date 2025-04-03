package com.group13.RailLink.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "trains")
public class Train {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "sefer_id")
    private int seferId;

    @Column(name = "train_id")
    private int trainId;

    @Column(name = "departure_station")
    private String departureStation;
    
    @Column(name = "arrival_station")
    private String arrivalStation;
    
    @Column(name = "duration")
    private Integer duration;
    
    @Column(name = "departure_datetime")
    private LocalDateTime departureDateTime;
    
    @Column(name = "arrival_datetime")
    private LocalDateTime arrivalDateTime;
    
    @Column(name = "wagons_count")
    private int wagonsCount;

    public Train() {}

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSeferId() {
        return seferId;
    }

    public void setSeferId(int seferId) {
        this.seferId = seferId;
    }

    public int getTrainId(){
        return trainId;
    }

    public void setTrainId(int trainId){
        this.trainId = trainId;
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

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
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

    public int getWagonsCount() {
        return wagonsCount;
    }

    public void setWagonsCount(int wagonsCount) {
        this.wagonsCount = wagonsCount;
    }
}