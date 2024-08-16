package com.example.petcare.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "Transfer")
public class Transfer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phoneNo;
    private String emailId;
    private String petName;
  private String petBreed; 
  private String petAge; 
  private String description;
  
    @Lob
    private byte[] image;  

public byte[] getImage() {
        return image;
    }
    public void setImage(byte[] image) {
        this.image = image;
    }
public Long getId() {
    return id;
}
public void setId(Long id) {
    this.id = id;
}
public String getName() {
    return name;
}
public void setName(String name) {
    this.name = name;
}
public String getPhoneNo() {
    return phoneNo;
}
public void setPhoneNo(String phoneNo) {
    this.phoneNo = phoneNo;
}
public String getEmailId() {
    return emailId;
}
public void setEmailId(String emailId) {
    this.emailId = emailId;
}
public String getPetName() {
    return petName;
}
public void setPetName(String petName) {
    this.petName = petName;
}
public String getPetBreed() {
    return petBreed;
}
public void setPetBreed(String petBreed) {
    this.petBreed = petBreed;
}
public String getPetAge() {
    return petAge;
}
public void setPetAge(String petAge) {
    this.petAge = petAge;
}
public String getDescription() {
    return description;
}
public void setDescription(String description) {
    this.description = description;
} 
} 
