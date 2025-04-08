package com.group13.RailLink.DTO;

import com.group13.RailLink.model.Booking;
import com.group13.RailLink.model.Invoice;
import com.group13.RailLink.model.Ticket;

// Updated BookingRequestDTO.java
public class BookingRequestDTO {
    //private Booking booking; // Removed Booking entity reference
    private FinalSeatUpdateDTO seatUpdate;
    private Ticket ticket;       // Changed from TicketDTO to Ticket entity
    private Invoice invoice;     // Changed from InvoiceDTO to Invoice entity

    // Getters & Setters
    public FinalSeatUpdateDTO getSeatUpdate() { return seatUpdate; }
    public void setSeatUpdate(FinalSeatUpdateDTO seatUpdate) { this.seatUpdate = seatUpdate; }

    public Ticket getTicket() { return ticket; }
    public void setTicket(Ticket ticket) { this.ticket = ticket; }

    public Invoice getInvoice() { return invoice; }
    public void setInvoice(Invoice invoice) { this.invoice = invoice; }
}
