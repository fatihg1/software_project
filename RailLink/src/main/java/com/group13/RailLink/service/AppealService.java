package com.group13.RailLink.service;

import com.group13.RailLink.model.Appeal;
import com.group13.RailLink.repository.AppealRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppealService {

    private final AppealRepository repo;

    public AppealService(AppealRepository repo) {
        this.repo = repo;
    }

    public List<Appeal> getAllAppeals() {
        return repo.findAll();
    }

    public Appeal addAppeal(Appeal appeal) {
        return repo.save(appeal);
    }
}
