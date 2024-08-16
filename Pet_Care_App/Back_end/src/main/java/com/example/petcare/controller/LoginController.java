package com.example.petcare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.petcare.model.Login;
import com.example.petcare.service.LoginService;

@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;
    @PostMapping("/api/login-user")
     public Login addDetails(@RequestBody Login l) throws Exception
        {
            return loginService.addDetails(l);
        }
    
}
