package com.group13.RailLink.repository;

import com.group13.RailLink.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    Invoice findByTicketId(String ticketId);
}
