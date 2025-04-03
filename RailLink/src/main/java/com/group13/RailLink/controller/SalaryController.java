package com.group13.RailLink.controller;

import com.group13.RailLink.model.Salary;
import com.group13.RailLink.service.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/salary")
@CrossOrigin(origins = "http://localhost:3000")
public class SalaryController {

    @Autowired
    private SalaryService service;

    @GetMapping
    public List<Salary> getAllSalaries() {
        return service.getAllSalaries();
    }

    @PostMapping
    public Salary addSalary(@RequestBody Salary salary) {
        return service.addSalary(salary);
    }

    @PutMapping("/{id}")
    public Salary updateSalary(@PathVariable int id, @RequestBody Salary salary) {
        return service.updateSalary(id, salary);
    }
}
