package com.group13.RailLink.service;

import com.group13.RailLink.model.Booking;
import com.group13.RailLink.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository repo;

    public BookingService(BookingRepository repo) {
        this.repo = repo;
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
}
