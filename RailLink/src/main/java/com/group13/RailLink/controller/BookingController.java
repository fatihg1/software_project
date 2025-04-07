package com.group13.RailLink.controller;

import com.group13.RailLink.model.Booking;
import com.group13.RailLink.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingService service;

    @GetMapping
    public List<Booking> getAllBookings() {
        return service.getAllBookings();
    }

    @PostMapping
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
