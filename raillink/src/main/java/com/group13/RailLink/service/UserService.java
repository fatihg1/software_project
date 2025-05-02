package com.group13.RailLink.service;

import com.group13.RailLink.model.User;
import com.group13.RailLink.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final UserRepository repo;


    // 👇 Constructor'a SalaryService'i ekledik
    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    // 👇 Kullanıcı eklenince çalışan ise maaş da ekleniyor
    public User addUser(User user) {
        User savedUser = repo.save(user);
    
        return savedUser;
    }
    
    

    public boolean deleteUser(Integer id) {
        Optional<User> user = repo.findById(id);
        if (user.isPresent()) {
            String name = user.get().getName(); // name'e göre eşleştiriyoruz
            repo.deleteById(id);
            return true;
        }
        return false;
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
