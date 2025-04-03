package com.group13.RailLink.service;

import com.group13.RailLink.model.Salary;
import com.group13.RailLink.repository.SalaryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalaryService {

    private final SalaryRepository repo;

    public SalaryService(SalaryRepository repo) {
        this.repo = repo;
    }

    public List<Salary> getAllSalaries() {
        return repo.findAll();
    }

    public Salary addSalary(Salary salary) {
        return repo.save(salary);
    }

    public Salary updateSalary(int id, Salary updatedSalary) {
        updatedSalary.setId(id);
        return repo.save(updatedSalary);
    }
}
