package com.group13.RailLink.service;

import com.group13.RailLink.model.Booking;
import com.group13.RailLink.model.Invoice;
import com.group13.RailLink.model.Ticket;
import com.group13.RailLink.model.Wagons;
import com.group13.RailLink.repository.BookingRepository;
import com.group13.RailLink.service.TrainService;  // ensure you have access to seat booking logic
import com.group13.RailLink.service.InvoiceService; // if you have one for creating invoices
import com.group13.RailLink.service.TicketService;  // if you have one for creating tickets
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.group13.RailLink.DTO.FinalSeatUpdateDTO; // Assuming you have a DTO for seat updates
import java.util.List;
import com.group13.RailLink.model.User; // Ensure this is the correct package for the User class

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

    // This is your original addBooking method (if needed)
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
     * If any step (seat booking, invoice creation/download, ticket creation) fails,
     * the transaction is rolled back and nothing is written to the database.
     *
     * @param booking         The booking object (with user, train, date, etc.)
     * @param finalSeatUpdate The seat update details (from the frontend)
     * @param ticket          The ticket data to be saved (including generated ticketId)
     * @param invoice         The invoice data to be saved (also using the ticketId)
     * @return The created Booking object, with status set to "Confirmed" on success.
     */
    @Transactional
public Ticket completeBooking(//Booking booking, 
                              FinalSeatUpdateDTO finalSeatUpdate, 
                              Ticket ticket, 
                              Invoice invoice) {
    User user = userService.findOrCreateUser(ticket.getName(), ticket.getSurname(), ticket.getEmail(), ticket.getPhone());
    ticket.setName(user.getName());
    ticket.setSurname(user.getSurname());
    ticket.setEmail(user.getEmail());
    ticket.setPhone(user.getPhone());
    // 1. Update the seat bookings.
    List<Wagons> updatedWagons = trainService.updateSeatBookings(
            finalSeatUpdate.getOutboundSeats(),
            finalSeatUpdate.getReturnSeats(),
            finalSeatUpdate.getOutboundTrainIds(),
            finalSeatUpdate.getReturnTrainIds()
    );
    if (updatedWagons == null || updatedWagons.isEmpty()) {
        throw new RuntimeException("Seat booking failed");
    }
    
    // 2. Create the invoice in the database.
    Invoice createdInvoice = invoiceService.createInvoice(invoice);
    if (createdInvoice == null) {
        throw new RuntimeException("Invoice creation failed");
    }
    
    // 3. Create the ticket in the database.
    Ticket createdTicket = ticketService.createTicket(ticket);
    if (createdTicket == null) {
        throw new RuntimeException("Ticket creation failed");
    }
    
    Booking booking = new Booking();
    booking.setStatus("Confirmed");
    booking.setDate(ticket.getDate());  
    booking.setUser(user);  // Assuming ticket has user info
    booking.setTrain(ticket.getWagonNumber().toString()); // Assuming ticket has train info
    repo.save(booking);

    // Return the created ticket.
    return createdTicket;
}
}
