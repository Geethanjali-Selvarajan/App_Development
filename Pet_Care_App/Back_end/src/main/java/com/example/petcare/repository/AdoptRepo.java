package com.example.petcare.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.petcare.model.Adopt;

public interface AdoptRepo extends JpaRepository<Adopt,Long>{
    
}
