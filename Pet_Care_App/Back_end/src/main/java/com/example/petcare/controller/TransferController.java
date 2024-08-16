package com.example.petcare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.petcare.model.Rescue;
import com.example.petcare.model.Transfer;
import com.example.petcare.service.TransferService;

import java.io.IOException;
import java.util.List;

@RestController
public class TransferController {
     @Autowired
     TransferService tService;

    @PostMapping("/api/Ownership-Transfer")
    public Transfer addDetails(@RequestPart("name") String name,
            @RequestPart("phoneNo") String phoneNo,
            @RequestPart("emailId") String emailId,
            @RequestPart("petName") String petName,
            @RequestPart("petBreed") String petBreed,
            @RequestPart("petAge") String petAge,
            @RequestPart("description") String description,
            @RequestPart("image") MultipartFile image) throws IOException{
        Transfer t = new Transfer();
        t.setName(name);
        t.setPhoneNo(phoneNo);
        t.setEmailId(emailId);
        t.setPetName(petName);
        t.setPetBreed(petBreed);
        t.setPetAge(petAge);
        t.setDescription(description);
        return tService.addDetails(t, image);
    }

    @GetMapping("/api/Ownership-Transfer")
    public List<Transfer> getAllTransfers() {
        return tService.getAllTransfers();
    }
}
