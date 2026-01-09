package com.learn.temp_backend.repositary;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn.temp_backend.entities.Address;

public interface AddressRepositary extends JpaRepository<Address, Integer> {

}
