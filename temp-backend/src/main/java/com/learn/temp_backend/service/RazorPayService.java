package com.learn.temp_backend.service;

import java.math.BigDecimal;

import com.razorpay.Order;
import com.razorpay.RazorpayException;

public interface RazorPayService {
	Order createOrder(BigDecimal amount) throws RazorpayException;
	boolean verifyPayment(String orderId,String paymentId,String signature) throws RazorpayException;
}
