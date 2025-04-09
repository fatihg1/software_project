package com.group13.RailLink.service;

import com.group13.RailLink.model.Booking;
import com.group13.RailLink.model.Invoice;
import com.group13.RailLink.model.Ticket;
import com.group13.RailLink.model.Wagons;
import com.group13.RailLink.repository.BookingRepository;
import com.group13.RailLink.service.TrainService;
import com.group13.RailLink.service.InvoiceService;
import com.group13.RailLink.service.TicketService;
import com.group13.RailLink.DTO.FinalSeatUpdateDTO;
import com.group13.RailLink.model.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository repo;
    private final TrainService trainService;
    private final InvoiceService invoiceService;
    private final TicketService ticketService;
    private final UserService userService;

    public BookingService(BookingRepository repo, TrainService trainService,
                          InvoiceService invoiceService, TicketService ticketService,
                          UserService userService) {
        this.repo = repo;
        this.trainService = trainService;
        this.invoiceService = invoiceService;
        this.ticketService = ticketService;
        this.userService = userService;
    }

    public List<Booking> getAllBookings() {
        return repo.findAll();
    }

    public Booking addBooking(Booking booking) {
        return repo.save(booking);
    }

    public void deleteBooking(int id) {
        repo.deleteById(id);
    }

    public Booking updateBooking(int id, Booking updatedBooking) {
        updatedBooking.setId(id);
        return repo.save(updatedBooking);
    }

    /**
     * Complete the entire booking operation atomically.
     */
    @Transactional
    public Ticket completeBooking(
            FinalSeatUpdateDTO finalSeatUpdate,
            Ticket ticket,
            Invoice invoice) {

        // 1. Find or create user
        User user = userService.findOrCreateUser(ticket.getName(), ticket.getSurname());
        ticket.setName(user.getName());
        ticket.setSurname(user.getSurname());

        // 2. Update seat bookings
        List<Wagons> updatedWagons = trainService.updateSeatBookings(
                finalSeatUpdate.getOutboundSeats(),
                finalSeatUpdate.getReturnSeats(),
                finalSeatUpdate.getOutboundTrainIds(),
                finalSeatUpdate.getReturnTrainIds()
        );

        if (updatedWagons == null || updatedWagons.isEmpty()) {
            throw new RuntimeException("Seat booking failed");
        }

        // 3. Create invoice
        Invoice createdInvoice = invoiceService.createInvoice(invoice);
        if (createdInvoice == null) {
            throw new RuntimeException("Invoice creation failed");
        }

        // 4. Create ticket
        Ticket createdTicket = ticketService.createTicket(ticket);
        if (createdTicket == null) {
            throw new RuntimeException("Ticket creation failed");
        }

        // 5. Save booking
        Booking booking = new Booking();
        booking.setStatus("Confirmed");
        booking.setDate(ticket.getDate());
        booking.setUser(user.getName()); // ✅ updated from user object to string
        booking.setTrain(ticket.getWagonId().toString());

        repo.save(booking);

        return createdTicket;
    }
}
