package com.group13.RailLink.repository;

import com.group13.RailLink.model.Finance;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanceRepository extends JpaRepository<Finance, Integer> {
    
    @Modifying(clearAutomatically = true)          
    @Transactional                                 
    void deleteByTicketId(String ticketId);
}
