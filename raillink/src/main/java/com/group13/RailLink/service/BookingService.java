package com.group13.RailLink.service;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.group13.RailLink.DTO.FinalSeatUpdateDTO;
import com.group13.RailLink.model.Booking;
import com.group13.RailLink.model.Invoice;
import com.group13.RailLink.model.Ticket;
import com.group13.RailLink.model.Train;
import com.group13.RailLink.model.Wagons;
import com.group13.RailLink.repository.BookingRepository;

@Service
public class BookingService {

    private final BookingRepository repo;
    private final TrainService trainService;
    private final InvoiceService invoiceService;
    private final TicketService ticketService;
    private final UserService userService;
    private final FinanceService financeService;

    public BookingService(BookingRepository repo, TrainService trainService,
                        InvoiceService invoiceService, @Lazy TicketService ticketService,
                        UserService userService, FinanceService financeService) {
        this.repo = repo;
        this.trainService = trainService;
        this.invoiceService = invoiceService;
        this.ticketService = ticketService; //  Lazy olarak çözülüyor
        this.userService = userService;
        this.financeService = financeService;
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
            Invoice invoice,
            Boolean isReturn) {
        if (!isReturn) {
            // No user handling — info comes directly from the ticket object
        }
        

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
        Train train = trainService.getTrainById(ticket.getTrainId().intValue()).orElseThrow();
        booking.setDate(train.getDepartureDateTime().toString());
        //  tam saatli formatta string olarak kaydeder
        booking.setUser(ticket.getName()); // direkt ticket'tan al

        booking.setTrain(ticket.getWagonNumber().toString());
        booking.setTicketId(createdTicket.getTicketId());
        repo.save(booking);

    //  Finance kaydı oluşturuluyor
    financeService.addSaleFromTicket(createdTicket);

    // Return the created ticket.
    return createdTicket;
}

public void deleteBookingsByTicketId(String ticketId) {
    repo.deleteByTicketId(ticketId);
}

}
