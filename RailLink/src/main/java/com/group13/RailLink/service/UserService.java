package com.group13.RailLink.service;

import com.group13.RailLink.model.User;
import com.group13.RailLink.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public User addUser(User user) {
        return repo.save(user);
    }

    public void deleteUser(int id) {
        repo.deleteById(id);
    }

    public User updateUser(int id, User updatedUser) {
        updatedUser.setId(id);
        return repo.save(updatedUser);
    }
}
