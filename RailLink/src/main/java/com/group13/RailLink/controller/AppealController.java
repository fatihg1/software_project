package com.group13.RailLink.controller;

import com.group13.RailLink.model.Appeal;
import com.group13.RailLink.service.AppealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appeals")
@CrossOrigin(origins = "http://localhost:5173")
public class AppealController {

    @Autowired
    private AppealService service;

    @GetMapping
    public List<Appeal> getAllAppeals() {
        return service.getAllAppeals();
    }

    @PostMapping
    public Appeal submitAppeal(@RequestBody Appeal appeal) {
        return service.addAppeal(appeal);
    }
}
