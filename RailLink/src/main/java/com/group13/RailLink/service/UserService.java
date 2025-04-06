package com.group13.RailLink.service;

import com.group13.RailLink.model.User;
import com.group13.RailLink.model.Salary;
import com.group13.RailLink.repository.UserRepository;
import com.group13.RailLink.service.SalaryService;
import org.springframework.stereotype.Service;

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
        // Kullanıcı zaten varsa, tekrar ekleme
        if (repo.findByName(user.getName()).isPresent()) {
            return null;
        }
    
        User savedUser = repo.save(user);
    
        // Sadece admin veya manager için maaş kaydı oluştur
        if (user.getRole().equalsIgnoreCase("manager") || user.getRole().equalsIgnoreCase("admin")) {
            Salary salary = new Salary();
            salary.setName(user.getName());
            salary.setRole(user.getRole());
            salary.setSalary(0); // Default maaş
            salary.setStatus("Unpaid");
            salaryService.addSalary(salary);
        }
    
        return savedUser;
    }
    

    public void deleteUser(int id) {
        repo.deleteById(id);
    }

    public User updateUser(int id, User updatedUser) {
        updatedUser.setId(id);
        return repo.save(updatedUser);
    }
}
