package com.learn.temp_backend.repositary;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn.temp_backend.entities.Orders;

public interface OrderRepositary extends JpaRepository<Orders, Integer> {

}
