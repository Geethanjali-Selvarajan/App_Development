package com.example.petcare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.petcare.model.Register;

import com.example.petcare.repository.RegisterRepo;

@Service
public class RegisterService {
    
       @Autowired
        RegisterRepo RegRep;

    public Register addDetails(Register r)
    {
        return RegRep.save(r);
    }
  
    
       
}

