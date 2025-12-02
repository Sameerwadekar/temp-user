package com.learn.temp_backend.service;

import com.learn.temp_backend.dtos.AddToCartDto;
import com.learn.temp_backend.dtos.CartDto;

public interface CartItemService {
	CartDto addtoCart(AddToCartDto addToCartDto);
	CartDto getCartbyUser(String UserId);
	CartDto updateQuantity(long cartItemId,int qunatity);
	CartDto removeItem(long cartItemId);
}
