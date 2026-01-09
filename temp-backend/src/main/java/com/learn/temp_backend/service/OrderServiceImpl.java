package com.learn.temp_backend.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.learn.temp_backend.dtos.AddressDto;
import com.learn.temp_backend.entities.Address;
import com.learn.temp_backend.entities.Cart;
import com.learn.temp_backend.entities.CartItem;
import com.learn.temp_backend.entities.OrderItem;
import com.learn.temp_backend.entities.Orders;
import com.learn.temp_backend.entities.PaymentStatus;
import com.learn.temp_backend.entities.User;
import com.learn.temp_backend.repositary.AddressRepositary;
import com.learn.temp_backend.repositary.CartRepositary;
import com.learn.temp_backend.repositary.OrderItemRepositary;
import com.learn.temp_backend.repositary.OrderRepositary;
import com.learn.temp_backend.repositary.UserRepositary;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService {
	@Autowired UserRepositary userRepositary;
	
	@Autowired OrderRepositary orderRepositary;
	
	@Autowired OrderItemRepositary orderItemRepositary;
	
	@Autowired CartRepositary cartRepositary;
	@Autowired private RazorPayService razorPayService;
	@Autowired private ModelMapper modelMapper;
	@Autowired private AddressRepositary addressRepositary;
	@Transactional
	@Override
	public Orders placeOrder(String userId, UserDetails userDetails,AddressDto addressDto) {

	    User user = userRepositary.findByEmail(userDetails.getUsername())
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    if (!user.getId().equals(userId)) {
	        throw new RuntimeException("Unauthorized");
	    }

	    Cart cart = user.getCart();
	    List<CartItem> cartItems = cart.getItems();

	    if (cartItems.isEmpty()) {
	        throw new RuntimeException("Cart is empty");
	    }
	    
//	    set Address
	    Address address = new Address();
	    Address orderAddress = modelMapper.map(addressDto, Address.class);
	    Address savedAddress = addressRepositary.save(orderAddress);
	    

	    // 1️⃣ Create & save ORDER first
	    Orders order = new Orders();
	    order.setUser(user);
	    order.setStatus("PAYMENT_PENDING");
	    order.setPaymentStatus(PaymentStatus.CREATED);
	    order.setAddress(savedAddress);

	    Orders savedOrder = orderRepositary.save(order); // ✅ ID GENERATED HERE

	    BigDecimal total = BigDecimal.ZERO;
	    List<OrderItem> orderItems = new ArrayList<>();

	    // 2️⃣ Create order items AFTER order exists
	    for (CartItem cartItem : cartItems) {

	        BigDecimal itemTotal =
	                cartItem.getProduct().getPrice()
	                        .multiply(BigDecimal.valueOf(cartItem.getQuantity()));

	        OrderItem orderItem = new OrderItem();
	        orderItem.setOrder(savedOrder); // ✅ NOW order_id EXISTS
	        orderItem.setProduct(cartItem.getProduct());
	        orderItem.setQuantity(cartItem.getQuantity());
	        orderItem.setPrice(itemTotal);

	        orderItems.add(orderItem);
	        total = total.add(itemTotal);
	    }

	    // 3️⃣ Update order with items + amount
	    savedOrder.setAmount(total);
	    savedOrder.setOrderItems(orderItems);

	    Orders finalOrder = orderRepositary.save(savedOrder);

	    // 4️⃣ Clear cart
	    cart.getItems().clear();
	    cartRepositary.save(cart);

	    return finalOrder;
	}

	
	@Transactional
	public Orders createPayment(int orderId) {

	    Orders order = orderRepositary.findById(orderId)
	            .orElseThrow(() -> new RuntimeException("Order not found"));

	    // Prevent duplicate payment creation
	    if (order.getRazorpayOrderId() != null) {
	        return order;
	    }

	    try {
	        // Create Razorpay Order using amount from DB
	        com.razorpay.Order razorpayOrder =
	                razorPayService.createOrder(order.getAmount());

	        order.setRazorpayOrderId(razorpayOrder.get("id"));
	        order.setStatus("PAYMENT_PENDING");

	        return orderRepositary.save(order);

	    } catch (Exception e) {
	        throw new RuntimeException("Failed to create Razorpay order");
	    }
	}

	@Override
	public List<Orders> getAllOrders() {
		List<Orders> allOrders = orderRepositary.findAll();
		return allOrders;
	}
	


	@Override
	public void confirmPayment(String orderId, String paymentId) {
		Orders order = orderRepositary.findByRazorpayOrderId(orderId).orElseThrow(()->new RuntimeException("order not found"));
		order.setRazorpayPaymentId(paymentId);
		order.setPaymentStatus(PaymentStatus.SUCCESS);
		order.setStatus("PAID");
		orderRepositary.save(order);
	}


	@Override
	public List<Orders> getUserOrderById(String userid, UserDetails userDetails) {
		User user = userRepositary.findByEmail(userDetails.getUsername()).orElseThrow(()->new RuntimeException("User not found"));
		if(!user.getId().equals(userid)) {
			throw new RuntimeException("unAuthorized");
		}
		return orderRepositary.findByUserId(userid);
	}


}
