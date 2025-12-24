package com.learn.temp_backend.service;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import com.learn.temp_backend.entities.Orders;

public interface OrderService {
	Orders placeOrder(String userId,@AuthenticationPrincipal UserDetails userDetails);
	List<Orders> getAllOrders();
}
