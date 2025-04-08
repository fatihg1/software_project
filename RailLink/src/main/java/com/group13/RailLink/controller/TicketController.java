package com.group13.RailLink.controller;

import com.group13.RailLink.model.Ticket;
import com.group13.RailLink.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {

    private final TicketService ticketService;
    
    @Autowired
    public TicketController(TicketService ticketService){
        this.ticketService = ticketService;
    }
    
    // GET: Retrieve all tickets
    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets(){
        List<Ticket> tickets = ticketService.getAllTickets();
        return ResponseEntity.ok(tickets);
    }
    
    // GET: Retrieve a ticket by its primary key id
    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable("id") Long id){
        return ticketService.getTicketById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // POST: Create a new ticket
    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket){
        // The ticket_id should be generated or validated here.
        // For example, you can generate a random unique string if not provided.
        if(ticket.getTicketId() == null || ticket.getTicketId().isEmpty()){
            ticket.setTicketId(generateUniqueTicketId());
        }
        Ticket savedTicket = ticketService.saveTicket(ticket);
        return ResponseEntity.ok(savedTicket);
    }
    
    // PUT: Update an existing ticket. This can be used for editing details.
    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable("id") Long id, @RequestBody Ticket ticketDetails){
        return ticketService.getTicketById(id)
                .map(ticket -> {
                    ticket.setName(ticketDetails.getName());
                    ticket.setSurname(ticketDetails.getSurname());
                    ticket.setGovernmentId(ticketDetails.getGovernmentId());
                    ticket.setPhone(ticketDetails.getPhone());
                    ticket.setEmail(ticketDetails.getEmail());
                    ticket.setBirthDate(ticketDetails.getBirthDate());
                    ticket.setPrice(ticketDetails.getPrice());
                    ticket.setSeat(ticketDetails.getSeat());
                    ticket.setWagonId(ticketDetails.getWagonId());
                    ticket.setSeferId(ticketDetails.getSeferId());
                    ticket.setUserId(ticketDetails.getUserId());
                    // Optionally update ticketId if needed
                    Ticket updatedTicket = ticketService.saveTicket(ticket);
                    return ResponseEntity.ok(updatedTicket);
                }).orElse(ResponseEntity.notFound().build());
    }
    
    // DELETE: Remove a ticket by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable("id") Long id){
        ticketService.deleteTicket(id);
        return ResponseEntity.noContent().build();
    }
    
    // Utility method to generate a unique ticket id (simple implementation)
    private String generateUniqueTicketId() {
        // Here you could use UUID or any other logic to generate a unique string.
        return "TKT-" + java.util.UUID.randomUUID().toString().replace("-", "").substring(0, 12).toUpperCase();
    }
}
