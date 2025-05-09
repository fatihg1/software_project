package com.group13.RailLink.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import com.group13.RailLink.model.Booking;

import jakarta.transaction.Transactional;


@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    @Modifying(clearAutomatically = true)
    @Transactional
    void deleteByTicketId(String ticketId);

}
