package com.learn.temp_backend.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import com.learn.temp_backend.entities.Cart;
import com.learn.temp_backend.entities.CartItem;
import com.learn.temp_backend.entities.OrderItem;
import com.learn.temp_backend.entities.Orders;
import com.learn.temp_backend.entities.User;
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
	@Override
	@Transactional
	public Orders placeOrder(String userId, UserDetails userDetails) {

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

	    Orders order = new Orders();
	    order.setUser(user);
	    order.setStatus("PENDING");

	    BigDecimal total = BigDecimal.ZERO;

	    List<OrderItem> orderItems = new ArrayList<>();

	    for (CartItem cartItem : cartItems) {

	        BigDecimal itemTotal =
	                cartItem.getProduct().getPrice()
	                        .multiply(BigDecimal.valueOf(cartItem.getQuantity()));

	        OrderItem orderItem = new OrderItem();
	        orderItem.setOrder(order);
	        orderItem.setProduct(cartItem.getProduct());
	        orderItem.setQuantity(cartItem.getQuantity());
	        orderItem.setPrice(itemTotal);

	        orderItems.add(orderItem);
	        total = total.add(itemTotal);
	    }

	    order.setAmount(total);
	    order.setOrderItems(orderItems);

	    Orders savedOrder = orderRepositary.save(order);

	    // 🔥 Clear cart
	    cart.getItems().clear();
	    cartRepositary.save(cart);

	    return savedOrder;
	}
}
