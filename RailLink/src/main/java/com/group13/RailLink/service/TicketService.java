package com.group13.RailLink.service;

import com.group13.RailLink.model.Ticket;
import com.group13.RailLink.repository.TicketRepository;
import com.group13.RailLink.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.group13.RailLink.model.User;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;
    
    @Autowired
    public TicketService(TicketRepository ticketRepository, UserRepository userRepository) {
        this.userRepository = userRepository;
        this.ticketRepository = ticketRepository;
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
}
