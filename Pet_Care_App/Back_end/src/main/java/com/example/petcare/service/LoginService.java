package com.example.petcare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.petcare.repository.LoginRepo;
import com.example.petcare.repository.RegisterRepo;
import com.example.petcare.model.Login;

@Service
public class LoginService {

    @Autowired
    LoginRepo loginRepo;

    @Autowired
    RegisterRepo registerRepo;

    public Login addDetails(Login l) throws Exception {
        // Check if the email ID is registered
        if (registerRepo.findByEmailId(l.getEmailId()).isPresent()) {
            if (registerRepo.findByPassword(l.getPassword()).isPresent()) {
                return loginRepo.save(l);
            } else {
                throw new Exception("Invalid Password");
            }

        } else {
            throw new Exception("Email ID is not registered");
        }
    }
}
