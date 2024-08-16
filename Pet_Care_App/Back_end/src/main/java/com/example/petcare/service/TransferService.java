package com.example.petcare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.petcare.model.Transfer;
import com.example.petcare.repository.TransferRepo;

import java.io.IOException;
import java.util.List;

@Service
public class TransferService {
    
    @Autowired
    TransferRepo tRepo;

    public Transfer addDetails(Transfer t,MultipartFile image)throws IOException {
          if (image != null && !image.isEmpty()) {
            byte[] imageBytes = image.getBytes();
            t.setImage(imageBytes);
        }
        return tRepo.save(t);
    }

    public List<Transfer> getAllTransfers() {
        return tRepo.findAll();
    }
}
