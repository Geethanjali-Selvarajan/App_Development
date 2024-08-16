package com.example.petcare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.petcare.model.Adopt;

import com.example.petcare.service.AdoptService;

@RestController
public class AdoptController {

    @Autowired
    AdoptService adoptSer;

    @PostMapping("/api/Adopt")
    public Adopt addDetails(@RequestBody Adopt a) {
        return adoptSer.addDetails(a);
    }

}
