package com.group13.RailLink.controller;

import com.group13.RailLink.model.Announcement;
import com.group13.RailLink.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/announcements")
@CrossOrigin(origins = "http://localhost:3000")
public class AnnouncementController {

    @Autowired
    private AnnouncementService service;

    @GetMapping
    public List<Announcement> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Announcement add(@RequestBody Announcement a) {
        return service.add(a);
    }

    @PutMapping("/{id}")
    public Announcement update(@PathVariable int id, @RequestBody Announcement a) {
        return service.update(id, a);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        service.delete(id);
    }
}
