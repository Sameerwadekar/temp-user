package com.learn.temp_backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learn.temp_backend.entities.Orders;
import com.learn.temp_backend.repositary.OrderRepositary;
import com.learn.temp_backend.service.OrderService;
import com.learn.temp_backend.service.RazorPayService;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderController {
	@Autowired private OrderService orderService;
	
	@Autowired private OrderRepositary orderRepositary;
	
	@Autowired private RazorPayService razorPayService;
	
	
	
	@PostMapping("/place/{userId}")
	public ResponseEntity<Orders> placeOrder(@PathVariable String userId,@AuthenticationPrincipal UserDetails userDetails){
		Orders placedOrder = orderService.placeOrder(userId, userDetails);
		return new ResponseEntity<Orders>(placedOrder,HttpStatus.OK);
	}
	
	@PostMapping("/payment/{orderId}")
	public ResponseEntity<Orders> createPayment(@PathVariable int orderId) {
	    return ResponseEntity.ok(orderService.createPayment(orderId));
	}
	
	@PostMapping("/confirm")
	public ResponseEntity<String> confirmOrder(@RequestBody Map<String, String> payload) throws RazorpayException {
		
		boolean verified = razorPayService.verifyPayment(
				payload.get("razorpayOrderId"), 
				payload.get("razorpayPaymentId"), 
				payload.get("razorpaySignature"));
		
		if(!verified) {
			return ResponseEntity.badRequest().body("Payment verification failed");
		}
		orderService.confirmPayment(
				payload.get("razorpayOrderId"),
				payload.get("razorpayPaymentId"));
		return ResponseEntity.ok("Payment Succesfull ");
	}
	
	@GetMapping("/new-orders")
	public ResponseEntity<List<Orders>> allOrders(){
		return ResponseEntity.ok(orderService.getAllOrders());
	}
}
