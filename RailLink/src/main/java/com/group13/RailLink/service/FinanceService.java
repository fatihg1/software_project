package com.group13.RailLink.service;

import com.group13.RailLink.model.Finance;
import com.group13.RailLink.model.Ticket;
import com.group13.RailLink.repository.FinanceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FinanceService {

    private final FinanceRepository repo;

    public FinanceService(FinanceRepository repo) {
        this.repo = repo;
    }

    public List<Finance> getAllFinance() {
        return repo.findAll();
    }

    public Finance addFinance(Finance finance) {
        return repo.save(finance);
    }

    // Ticket üzerinden Sale işlemini finance tablosuna kaydeder
public Finance addSaleFromTicket(Ticket ticket) {
    Finance finance = new Finance();
    finance.setUser(ticket.getName()); // İstersen User ID üzerinden de yapabiliriz
    finance.setAmount(ticket.getPrice().doubleValue());
    finance.setType("Sale");
    finance.setDate(LocalDateTime.now());
    return repo.save(finance);
}

}
