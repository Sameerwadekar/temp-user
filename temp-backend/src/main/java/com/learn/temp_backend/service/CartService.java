package com.learn.temp_backend.service;



import com.learn.temp_backend.dtos.AddToCartDto;
import com.learn.temp_backend.entities.Cart;


public interface CartService {
	Cart cartItems(AddToCartDto addToCartDto,String email);
}
