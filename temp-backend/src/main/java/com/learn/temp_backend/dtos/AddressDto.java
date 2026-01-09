package com.learn.temp_backend.dtos;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {

    private String fullName;
    private String phone;

    private String house;
    private String street;
    private String area;
    private String city;
    private String state;
    private String pincode;
}

