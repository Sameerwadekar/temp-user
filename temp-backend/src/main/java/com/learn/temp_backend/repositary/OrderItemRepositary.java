package com.learn.temp_backend.repositary;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn.temp_backend.entities.OrderItem;

public interface OrderItemRepositary extends JpaRepository<OrderItem, Integer> {

}
