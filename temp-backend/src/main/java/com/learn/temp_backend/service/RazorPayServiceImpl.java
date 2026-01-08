package com.learn.temp_backend.service;

import java.math.BigDecimal;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

@Service
public class RazorPayServiceImpl implements RazorPayService {
	
	@Value("${razorpay.key}")
	private String keyId;
	
	@Value("${razorpay.secret}")
	private String keySecret;
	
	@Override
	public Order createOrder(BigDecimal amount) throws RazorpayException {
		RazorpayClient client = new RazorpayClient(keyId,keySecret);
		BigDecimal amountInPaise = amount.multiply(BigDecimal.valueOf(100));
		JSONObject options = new JSONObject();
		options.put("amount", amountInPaise.longValueExact());
		options.put("currency", "INR");
		options.put("receipt", "enroll_"+ System.currentTimeMillis());
		return client.orders.create(options);
	}

	@Override
	public boolean verifyPayment(String orderId, String paymentId, String signature) throws RazorpayException {
		JSONObject options = new JSONObject();
		options.put("razorpay_order_id", orderId);
		options.put("razorpay_payment_id", paymentId);
		options.put("razorpay_signature", signature);
		try {
			Utils.verifyPaymentSignature(options, keySecret);
			return true;
		} catch (Exception e) {
			System.out.println("payment failed "+e.getMessage());
			return false;
		}
	}
}
