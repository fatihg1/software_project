package com.group13.RailLink.controller;

import com.group13.RailLink.model.Finance;
import com.group13.RailLink.service.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/finance")
@CrossOrigin(origins = "http://localhost:3000")
public class FinanceController {

    @Autowired
    private FinanceService service;

    @GetMapping
    public List<Finance> getAll() {
        return service.getAllFinance();
    }

    @PostMapping
    public Finance addFinance(@RequestBody Finance finance) {
        return service.addFinance(finance);
    }
}
