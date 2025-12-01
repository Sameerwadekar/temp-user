package com.learn.temp_backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.learn.temp_backend.dtos.AddToCartDto;
import com.learn.temp_backend.dtos.CartDto;
import com.learn.temp_backend.entities.Cart;
import com.learn.temp_backend.entities.CartItem;
import com.learn.temp_backend.entities.Product;
import com.learn.temp_backend.entities.User;
import com.learn.temp_backend.repositary.CartItemRepositary;
import com.learn.temp_backend.repositary.CartRepositary;
import com.learn.temp_backend.repositary.ProductRepositary;
import com.learn.temp_backend.repositary.UserRepositary;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CartItemServiceImpl implements CartItemService {
	
	private final UserRepositary userRepositary;
	private final CartItemRepositary cartItemRepositary;
	private final CartRepositary cartRepositary;
	private final ProductRepositary productRepositary;
	

	@Override
	public CartDto addtoCart(AddToCartDto addToCartDto) {
		User user = userRepositary.findById(addToCartDto.getUserId()).orElseThrow(()-> new RuntimeException("User not found"));
		Product product = productRepositary.findById(addToCartDto.getProductId()).orElseThrow(()-> new RuntimeException("Product not found"));
		Cart cart = cartRepositary.findByUser(user).orElseGet(()->{
			Cart newcart = new Cart();
			newcart.setUser(user);
			return cartRepositary.save(newcart);
		});
		Optional<CartItem> existingItem = cartItemRepositary.findByCartAndProduct(cart, product);
		
		if(existingItem.isPresent()) {
			CartItem cartItem = existingItem.get();
			cartItem.setQuantity(cartItem.getQuantity()+addToCartDto.getQuantity());;
			cartItemRepositary.save(cartItem);
		} else {
			CartItem newitem = new CartItem();
			newitem.setCart(cart);
			newitem.setProduct(product);
			newitem.setQuantity(addToCartDto.getQuantity());
			cartItemRepositary.save(newitem);
		}
		return null;
	}

	@Override
	public CartDto getCartbyUser(long UserId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CartDto updateQuantity(long cartItemId, int qunatity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CartDto removeItem(long cartItemId) {
		// TODO Auto-generated method stub
		return null;
	}

}
