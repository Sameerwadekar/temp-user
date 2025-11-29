package com.learn.temp_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.temp_backend.dtos.AddToCartDto;
import com.learn.temp_backend.entities.Cart;
import com.learn.temp_backend.entities.Product;
import com.learn.temp_backend.entities.User;
import com.learn.temp_backend.repositary.ProductRepositary;
import com.learn.temp_backend.repositary.UserRepositary;

@Service
public class CartServiceImpl implements CartService{
	
	@Autowired private UserRepositary userRepositary;
	@Autowired private ProductRepositary productRepositary;

	@Override
	public Cart cartItems(AddToCartDto addToCartDto, String email) {
	User user = userRepositary.findByEmail(email).orElseThrow(()-> new RuntimeException("User not found"));
	Product product = productRepositary.findById(addToCartDto.getProductId()).orElseThrow(()->new RuntimeException("User not found"));
		return null;
	}

}
