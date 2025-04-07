package com.group13.RailLink.service;

import com.group13.RailLink.model.Ticket;
import com.group13.RailLink.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    
    @Autowired
    public TicketService(TicketRepository ticketRepository){
        this.ticketRepository = ticketRepository;
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
