package com.group13.RailLink.service;

import com.group13.RailLink.model.Finance;
import com.group13.RailLink.model.Ticket;
import com.group13.RailLink.repository.FinanceRepository;
import org.springframework.stereotype.Service;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.Map;
import java.util.TreeMap;
import java.util.LinkedHashMap;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.stream.Collectors;

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
        finance.setUser(ticket.getName());
        finance.setAmount(ticket.getPrice().doubleValue());
        finance.setType("Sale");
        finance.setDate(LocalDateTime.now());
        finance.setRoute(ticket.getDepartureStation() + " - " + ticket.getArrivalStation()); // ✔️ Bu güzergahı düzgün kurar
 //  güzergah ekleniyor
        return repo.save(finance);
    }
    

public Map<String, Double> getMonthlyRevenue() {
    return repo.findAll().stream()
        .filter(f -> f.getDate() != null && f.getType() != null)
        .collect(Collectors.groupingBy(
            f -> {
                try {
                    return f.getDate().getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
                } catch (Exception e) {
                    System.out.println("HATA (getMonth): " + f.getDate());
                    return "Invalid";
                }
            },
            TreeMap::new,
            Collectors.summingDouble(f -> f.getType().equalsIgnoreCase("Sale") ? f.getAmount() : -f.getAmount())
        ));
}

public Map<String, Double> getTopRoutesRevenue() {
    return repo.findAll().stream()
        .filter(f -> f.getType() != null && f.getType().equalsIgnoreCase("Sale") && f.getRoute() != null && !f.getRoute().isEmpty())
        .collect(Collectors.groupingBy(
            Finance::getRoute,
            Collectors.summingDouble(Finance::getAmount)
        ))
        .entrySet().stream()
        .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
        .limit(5)
        .collect(Collectors.toMap(
            Map.Entry::getKey, Map.Entry::getValue, (a, b) -> a, LinkedHashMap::new
        ));
}



public Map<String, Double> getMonthlySalesTrend() {
    return repo.findAll().stream()
        .filter(f -> f.getType().equalsIgnoreCase("Sale"))
        .collect(Collectors.groupingBy(
            f -> f.getDate().getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH),
            TreeMap::new,
            Collectors.summingDouble(Finance::getAmount)
        ));
}

public List<Map<String, Object>> getRevenueVsSalesData() {
    Map<String, List<Finance>> grouped = repo.findAll().stream()
        .filter(f -> f.getType().equalsIgnoreCase("Sale"))
        .collect(Collectors.groupingBy(Finance::getUser));

    List<Map<String, Object>> result = new ArrayList<>();
    for (var entry : grouped.entrySet()) {
        Map<String, Object> point = new HashMap<>();
        point.put("passengers", entry.getValue().size());
        point.put("revenue", entry.getValue().stream().mapToDouble(Finance::getAmount).sum());
        result.add(point);
    }

    return result;
}

}
