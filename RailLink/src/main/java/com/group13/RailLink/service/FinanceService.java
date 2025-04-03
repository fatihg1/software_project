package com.group13.RailLink.service;

import com.group13.RailLink.model.Finance;
import com.group13.RailLink.repository.FinanceRepository;
import org.springframework.stereotype.Service;

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
}
