package com.learn.temp_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learn.temp_backend.entities.Orders;
import com.learn.temp_backend.repositary.OrderRepositary;
import com.learn.temp_backend.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {
	@Autowired private OrderService orderService;
	
	@Autowired private OrderRepositary orderRepositary;
	
	@PostMapping("/place/{userId}")
	public ResponseEntity<Orders> placeOrder(@PathVariable String userId,@AuthenticationPrincipal UserDetails userDetails){
		Orders placedOrder = orderService.placeOrder(userId, userDetails);
		return new ResponseEntity<Orders>(placedOrder,HttpStatus.OK);
	}
}
