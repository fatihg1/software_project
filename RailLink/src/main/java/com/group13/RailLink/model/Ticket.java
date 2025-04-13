package com.group13.RailLink.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Fields sent from the frontend
    private String name;
    private String surname;
    private String governmentId;
    private String phone;
    private String email;
    private LocalDate birthDate;
    private BigDecimal price;
    private String seat;
    @Column(name = "wagon_number")
    private Integer wagonNumber;
    private Long seferId;
    private Long userId;
    private Date date;
    private Boolean isRefundRequested = false;
    @Column(name = "departure_station")
    private String departureStation;
    @Column(name = "train_id")
    private Long trainId;
    @Column(name = "departure_date_time")
    private Date departureDateTime;
    @Column(name = "arrival_station")
    private String arrivalStation;
    private Long wagonId;
    // A unique ticket id to distinguish each ticket
    @Column(unique = true)
    private String ticketId;
    private String wagonType;
    public Ticket() {}

    public Ticket(String name, String surname, String governmentId, String phone, String email,
                  LocalDate birthDate, BigDecimal price, String seat, Integer wagonNumber, Long seferId,
                  Long userId, String ticketId, Long wagonId, Integer wagonType) {
        this.name = name;
        this.surname = surname;
        this.governmentId = governmentId;
        this.phone = phone;
        this.email = email;
        this.birthDate = birthDate;
        this.price = price;
        this.seat = seat;
        this.wagonNumber = wagonNumber;
        this.seferId = seferId;
        this.userId = userId;
        this.ticketId = ticketId;
        this.date = new Date(); // Set the current date
        this.isRefundRequested = false; // Default value for refund request
        this.wagonId = wagonId; // Set the wagon ID
        this.departureDateTime = new Date(); // Set the current date and time
        this.departureStation = ""; // Default value for departure station
        this.arrivalStation = ""; // Default value for arrival station
        this.trainId = null; // Default value for train ID
        this.wagonType = ""; // Default value for wagon type
    }

    // Getters and Setters
    public String getDate() {
        return date.toString();
    }
    public void setDate(Date date) {
        this.date = date;
    }
    public String getWagonType() {
        return wagonType;
    }
    public void setWagonType(String wagonType) {
        this.wagonType = wagonType;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getWagonId() {
        return wagonId;
    }
    public void setWagonId(Long wagonId) {
        this.wagonId = wagonId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }
    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getGovernmentId() {
        return governmentId;
    }
    public void setGovernmentId(String governmentId) {
        this.governmentId = governmentId;
    }

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public Date getDepartureDateTime() { return departureDateTime; }
    public void setDepartureDateTime(Date departureDateTime) { 
    this.departureDateTime = departureDateTime; 
}
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }
    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public BigDecimal getPrice() {
        return price;
    }
    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getSeat() {
        return seat;
    }
    public void setSeat(String seat) {
        this.seat = seat;
    }

    public Integer getWagonNumber() {
        return wagonNumber;
    }
    public void setWagonNumber(Integer wagonNumber) {
        this.wagonNumber = wagonNumber;
    }

    public Long getSeferId() {
        return seferId;
    }
    public void setSeferId(Long seferId) {
        this.seferId = seferId;
    }

    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTrainId() { return trainId; }
    public void setTrainId(Long trainId) { this.trainId = trainId; }

    public String getTicketId() {
        return ticketId;
    }
    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }
    public Boolean isRefundRequested() {
        return isRefundRequested;
    }
    public void setRefundRequested(Boolean refundRequested) {
        isRefundRequested = refundRequested;
    }
    public String getDepartureStation() { return departureStation; }
    public void setDepartureStation(String departureStation) { this.departureStation = departureStation; }

    public String getArrivalStation() { return arrivalStation; }
    public void setArrivalStation(String arrivalStation) { this.arrivalStation = arrivalStation; }
}
