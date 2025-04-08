package com.group13.RailLink.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
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
    private Long wagonId;
    private Long seferId;
    private Long userId;
    private Date date = new Date();
    
    // A unique ticket id to distinguish each ticket
    @Column(unique = true)
    private String ticketId;

    public Ticket() {}

    public Ticket(String name, String surname, String governmentId, String phone, String email,
                  LocalDate birthDate, BigDecimal price, String seat, Long wagonId, Long seferId,
                  Long userId, String ticketId) {
        this.name = name;
        this.surname = surname;
        this.governmentId = governmentId;
        this.phone = phone;
        this.email = email;
        this.birthDate = birthDate;
        this.price = price;
        this.seat = seat;
        this.wagonId = wagonId;
        this.seferId = seferId;
        this.userId = userId;
        this.ticketId = ticketId;
        this.date = new Date(); // Set the current date
    }

    // Getters and Setters
    public String getDate() {
        return date.toString();
    }
    public void setDate(Date date) {
        this.date = date;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
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

    public Long getWagonId() {
        return wagonId;
    }
    public void setWagonId(Long wagonId) {
        this.wagonId = wagonId;
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

    public String getTicketId() {
        return ticketId;
    }
    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }
}
