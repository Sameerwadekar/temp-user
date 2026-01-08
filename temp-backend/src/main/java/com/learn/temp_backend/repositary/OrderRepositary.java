package com.learn.temp_backend.repositary;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.learn.temp_backend.entities.Orders;

public interface OrderRepositary extends JpaRepository<Orders, Integer> {
	 Optional<Orders> findByRazorpayOrderId(String razorpayOrderId);
}
