package com.group13.RailLink.service;

import com.group13.RailLink.model.Ticket;
import com.group13.RailLink.repository.TicketRepository;
import com.group13.RailLink.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.group13.RailLink.model.User;
import com.group13.RailLink.model.Train; // Import Train class
import com.group13.RailLink.repository.TrainRepository; // Import TrainRepository
import com.group13.RailLink.model.Wagons; // Import Wagons class
import com.group13.RailLink.repository.WagonsRepository; // Import WagonRepository

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TicketService {

    private final UserRepository userRepository;
    private final TrainRepository trainRepository; // Add TrainRepository dependency
    private final WagonsRepository wagonRepository; // Add WagonRepository dependency
    private final TicketRepository ticketRepository;
    @Autowired
    public TicketService(TicketRepository ticketRepository, UserRepository userRepository, TrainRepository trainRepository, WagonsRepository wagonRepository) {
        this.userRepository = userRepository; // Initialize UserRepository
        this.wagonRepository = wagonRepository; // Initialize WagonRepository
        this.ticketRepository = ticketRepository;
        this.trainRepository = trainRepository; // Initialize TrainRepository
    }

    public List<Ticket> getTicketsByUserId(Long userId) {
        return ticketRepository.findByUserId(userId);
    }

    // TicketService.java (Updated)
public Ticket createTicket(Ticket ticket) {
    // Find or create the user
    Optional<User> existingUser = userRepository.findByNameAndSurname(
        ticket.getName(), 
        ticket.getSurname()
    );

    User user = existingUser.orElseGet(() -> {
        User newUser = new User();
        newUser.setName(ticket.getName());
        newUser.setSurname(ticket.getSurname());
        newUser.setEmail(ticket.getEmail() != null ? ticket.getEmail() : "default@example.com"); // 👈 Ensure required fields
        newUser.setPhone(ticket.getPhone() != null ? ticket.getPhone() : "000-000-0000");
        return userRepository.save(newUser);
    });

    System.out.println("User ID: " + user.getId()); // Logging for verification
    ticket.setUserId(user.getId());
    return ticketRepository.save(ticket);
}

    // Get all tickets
    public List<Ticket> getAllTickets(){
        return ticketRepository.findAll();
    }
    
    // Get a ticket by primary key id
    public Optional<Ticket> getTicketById(Long id){
        return ticketRepository.findById(id);
    }
    
    // Get a ticket by its unique ticketId string
    public Ticket getTicketByTicketId(String ticketId){
        return ticketRepository.findByTicketId(ticketId);
    }
    
    // Save or update a ticket
    public Ticket saveTicket(Ticket ticket){
        return ticketRepository.save(ticket);
    }
    
    // Delete a ticket by primary key id
    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }

    public Ticket getTicketByTicketIdAndSurname(String ticketId, String surname) {
        return ticketRepository.findByTicketIdAndSurname(ticketId, surname);
    }
    
    // In TicketService.java
public List<Map<String, Object>> getEnhancedTicketsByUserId(Long userId) {
    List<Ticket> tickets = ticketRepository.findByUserId(userId);
    List<Map<String, Object>> enhancedTickets = new ArrayList<>();
    
    for (Ticket ticket : tickets) {
        Map<String, Object> enhancedTicket = new HashMap<>();
        
        // Add basic ticket information
        enhancedTicket.put("id", ticket.getId());
        enhancedTicket.put("ticketId", ticket.getTicketId());
        enhancedTicket.put("name", ticket.getName());
        enhancedTicket.put("surname", ticket.getSurname());
        enhancedTicket.put("seat", ticket.getSeat());
        enhancedTicket.put("date", ticket.getDate());
        enhancedTicket.put("refundRequested", ticket.isRefundRequested());
        enhancedTicket.put("departureStation", ticket.getDepartureStation());
        enhancedTicket.put("arrivalStation", ticket.getArrivalStation());
        enhancedTicket.put("departureDateTime", ticket.getDepartureDateTime());
        enhancedTicket.put("wagonType", ticket.getWagonType());
        enhancedTicket.put("wagonNumber", ticket.getWagonNumber());
        // Get wagon details using trainId and wagonNumber
        if (ticket.getTrainId() != null && ticket.getWagonNumber() != null) {
            List<Wagons> wagons = wagonRepository.findByTrainIdAndWagonNumber(
                ticket.getTrainId().intValue(),
                ticket.getWagonNumber()
            );
            if (!wagons.isEmpty()) {
                Wagons wagon = wagons.get(0);
                enhancedTicket.put("wagonType", wagon.getType());
                enhancedTicket.put("wagonNumber", ticket.getWagonNumber());
            }
        }
        enhancedTicket.put("id", ticket.getId());
        enhancedTicket.put("ticketId", ticket.getTicketId());
        enhancedTickets.add(enhancedTicket);
    }
    
    return enhancedTickets;
}
}
