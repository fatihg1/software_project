package com.group13.RailLink.controller;

import com.group13.RailLink.model.Finance;
import com.group13.RailLink.service.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.*;
import java.util.Map;


import java.util.List;

@RestController
@RequestMapping("/finance")
@CrossOrigin(origins = "http://localhost:5173")
@ComponentScan(basePackages = "com.group13.RailLink")
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

    @GetMapping("/revenue/monthly")
public Map<String, Double> getMonthlyRevenue() {
    return service.getMonthlyRevenue();
}

@GetMapping("/revenue/top-routes")
public Map<String, Double> getTopRoutesRevenue() {
    return service.getTopRoutesRevenue();
}

@GetMapping("/revenue/sales-trends")
public Map<String, Double> getMonthlySalesTrend() {
    return service.getMonthlySalesTrend();
}

@GetMapping("/revenue/scatter")
public List<Map<String, Object>> getRevenueVsSalesData() {
    return service.getRevenueVsSalesData();
}

}
