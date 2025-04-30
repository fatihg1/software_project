package com.group13.RailLink.service;

import com.group13.RailLink.model.User;
import com.group13.RailLink.model.Salary;
import com.group13.RailLink.repository.UserRepository;
import com.group13.RailLink.service.SalaryService;


import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;


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
        User savedUser = repo.save(user);
    
        if (user.getRole() != null && (user.getRole().equalsIgnoreCase("admin") || user.getRole().equalsIgnoreCase("manager"))) {
            Salary salary = new Salary();
            salary.setName(user.getName());
            salary.setRole(user.getRole());
            salary.setSalary(0.0); // Varsayılan maaş
            salary.setStatus("Unpaid"); // Varsayılan durum
            salaryService.addSalary(salary);
        }
    
        return savedUser;
    }
    
    

    public boolean deleteUser(Integer id) {
        Optional<User> user = repo.findById(id);
        if (user.isPresent()) {
            String name = user.get().getName(); // name'e göre eşleştiriyoruz
            repo.deleteById(id);
            salaryService.deleteByName(name); // eşleşen salary kaydını da sil
            return true;
        }
        return false;
    }
    
    
    @Transactional
    public User findOrCreateUser(String name, String surname, String email, String phone) {
        // Check if user exists by name and surname
        User existingUser = repo.findByNameAndSurname(name, surname).orElse(null);
        if (existingUser != null) {
            return existingUser;
        }

        // Create new user if not found
        User newUser = new User();
        newUser.setName(name);
        newUser.setSurname(surname);
        newUser.setEmail(email);
        newUser.setPhone(phone);
        System.out.println("User has been created");
        return repo.save(newUser);
    }
    public User updateUser(int id, User updatedUser) {
        updatedUser.setId(Long.valueOf(id));
        return repo.save(updatedUser);
    }

    public User getUserByEmail(String email) {
        return repo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
