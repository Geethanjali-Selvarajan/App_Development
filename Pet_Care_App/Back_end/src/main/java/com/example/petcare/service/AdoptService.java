package com.example.petcare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.petcare.model.Adopt;
import com.example.petcare.repository.AdoptRepo;

@Service
public class AdoptService {
    
    @Autowired 
    AdoptRepo adopt;

    public Adopt addDetails(Adopt a)
    {
        return adopt.save(a);
    }
}
