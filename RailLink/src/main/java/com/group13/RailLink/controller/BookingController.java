package com.group13.RailLink.controller;

import com.group13.RailLink.model.Booking;
import com.group13.RailLink.model.Ticket;
import com.group13.RailLink.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.group13.RailLink.DTO.BookingRequestDTO; // Adjust the package path if necessary

import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

     @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<Ticket> completeBooking(@RequestBody BookingRequestDTO bookingRequest) {
        try {
            Ticket createdTicket = bookingService.completeBooking(//bookingRequest.getBooking(),
                bookingRequest.getSeatUpdate(),
                bookingRequest.getTicket(),
                bookingRequest.getInvoice()
            );
            return ResponseEntity.ok(createdTicket);
        } catch (Exception e) {
            System.err.println("Error during booking: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Autowired
    private BookingService service;

    @GetMapping
    public List<Booking> getAllBookings() {
        return service.getAllBookings();
    }

    @PostMapping("/add")
    public Booking addBooking(@RequestBody Booking booking) {
        return service.addBooking(booking);
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable int id) {
        service.deleteBooking(id);
    }

    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable int id, @RequestBody Booking booking) {
        return service.updateBooking(id, booking);
    }
}
