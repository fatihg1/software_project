package com.group13.RailLink.service;

import com.group13.RailLink.model.Invoice;
import com.group13.RailLink.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    
    @Autowired
    public InvoiceService(InvoiceRepository invoiceRepository){
        this.invoiceRepository = invoiceRepository;
    }
    
    public Invoice createInvoice(Invoice invoice) {
        invoice.setTransactionDate(LocalDateTime.now());
        return invoiceRepository.save(invoice);
    }
    
    public Optional<Invoice> getInvoiceByTicketId(String ticketId) {
        return Optional.ofNullable(invoiceRepository.findByTicketId(ticketId));
    }
}
