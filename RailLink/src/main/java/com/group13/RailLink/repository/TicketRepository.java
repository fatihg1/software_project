package com.group13.RailLink.repository;

import com.group13.RailLink.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    // You can define additional query methods if needed, for example:
    Ticket findByTicketId(String ticketId);
}
