package com.group13.RailLink.service;

import com.group13.RailLink.model.Announcement;
import com.group13.RailLink.repository.AnnouncementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnouncementService {

    private final AnnouncementRepository repo;

    public AnnouncementService(AnnouncementRepository repo) {
        this.repo = repo;
    }

    public List<Announcement> getAll() {
        return repo.findAll();
    }

    public Announcement add(Announcement a) {
        return repo.save(a);
    }

    public Announcement update(int id, Announcement updated) {
        updated.setId(id);
        return repo.save(updated);
    }

    public void delete(int id) {
        repo.deleteById(id);
    }
}
