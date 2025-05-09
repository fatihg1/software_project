package com.group13.RailLink.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.group13.RailLink.model.Ticket;

import jakarta.transaction.Transactional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    // You can define additional query methods if needed, for example:
    Ticket findByTicketId(String ticketId);
    Ticket findByTicketIdAndSurname(String ticketId, String surname);
    List<Ticket> findByUserId(Long userId);


    @Query("SELECT t FROM Ticket t WHERE t.clerkEmail = ?1")
    List<Ticket> findByClerkEmail(String userEmail);

    @Modifying(clearAutomatically = true)
    @Transactional
    void deleteByTicketId(String ticketId);
}
