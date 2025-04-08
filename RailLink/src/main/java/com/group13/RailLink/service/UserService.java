package com.group13.RailLink.service;

import com.group13.RailLink.model.User;
import com.group13.RailLink.model.Salary;
import com.group13.RailLink.repository.UserRepository;
import com.group13.RailLink.service.SalaryService;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;
    private final SalaryService salaryService;

    // 👇 Constructor'a SalaryService'i ekledik
    public UserService(UserRepository repo, SalaryService salaryService) {
        this.repo = repo;
        this.salaryService = salaryService;
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    // 👇 Kullanıcı eklenince çalışan ise maaş da ekleniyor
    public User addUser(User user) {
        return repo.save(user);
    }
    

    public void deleteUser(int id) {
        repo.deleteById(id);
    }
    
    @Transactional
    public User findOrCreateUser(String name, String surname) {
        // Check if user exists by name and surname
        User existingUser = repo.findByNameAndSurname(name, surname).orElse(null);
        if (existingUser != null) {
            return existingUser;
        }

        // Create new user if not found
        User newUser = new User();
        newUser.setName(name);
        newUser.setSurname(surname);
        return repo.save(newUser);
    }
    public User updateUser(int id, User updatedUser) {
        updatedUser.setId(Long.valueOf(id));
        return repo.save(updatedUser);
    }
}
