package com.learn.temp_backend.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.learn.temp_backend.dtos.AddToCartDto;
import com.learn.temp_backend.dtos.CartDto;
import com.learn.temp_backend.dtos.CartItemDto;
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
import lombok.experimental.var;

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
	    User user = userRepositary.findById(addToCartDto.getUserId())
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    Product product = productRepositary.findById(addToCartDto.getProductId())
	            .orElseThrow(() -> new RuntimeException("Product not found"));

	    Cart cart = cartRepositary.findByUser(user).orElseGet(() -> {
	        Cart newcart = new Cart();
	        newcart.setUser(user);
	        newcart.setItems(new ArrayList<>());   // IMPORTANT: initialize list
	        return cartRepositary.save(newcart);
	    });

	    Optional<CartItem> existingItem = cartItemRepositary.findByCartAndProduct(cart, product);

	    if (existingItem.isPresent()) {
	        CartItem cartItem = existingItem.get();
	        cartItem.setQuantity(cartItem.getQuantity() + addToCartDto.getQuantity());
	        cartItemRepositary.save(cartItem);
	    } else {
	        CartItem newitem = new CartItem();
	        newitem.setCart(cart);
	        newitem.setProduct(product);
	        newitem.setQuantity(addToCartDto.getQuantity());
	        cartItemRepositary.save(newitem);

	        cart.getItems().add(newitem);   // 🔥 MUST ADD THIS
	    }

	    return cartDto(cart);
	}


	@Override
	public CartDto getCartbyUser(String userId) {
	    User user = userRepositary.findById(userId)
	            .orElseThrow(() -> new RuntimeException("User not found"));
	    Cart cart = cartRepositary.findByUser(user)
	            .orElseThrow(() -> new RuntimeException("Cart not found"));
	    return cartDto(cart);
	}


	@Override
	public CartDto updateQuantity(long cartItemId, int quantity) {
		 CartItem item = cartItemRepositary.findById(cartItemId)
	                .orElseThrow(() -> new RuntimeException("Item not found"));
	        item.setQuantity(quantity);
	        cartItemRepositary.save(item);
	        return cartDto(item.getCart());
	}

	@Override
	public CartDto removeItem(long cartItemId) {
		 CartItem item = cartItemRepositary.findById(cartItemId)
	                .orElseThrow(() -> new RuntimeException("Item not found"));
	        Cart cart = item.getCart();
	        cartItemRepositary.delete(item);
	        cart.getItems().remove(item); 
	        return cartDto(cart);
	}
	@SuppressWarnings("deprecation")
	private CartDto cartDto(Cart cart) {

	    var itemsDto = cart.getItems().stream().map(item -> {
	        BigDecimal itemTotal = item.getProduct().getPrice()
	                .multiply(BigDecimal.valueOf(item.getQuantity()));

	        return new CartItemDto(
	                item.getProduct().getId(),
	                item.getProduct().getName(),
	                item.getProduct().getPrice(),
	                item.getQuantity(),
	                item.getProduct().getProductImage(),
	                itemTotal
	        );
	    }).collect(Collectors.toList());

	    BigDecimal total = itemsDto.stream()
	            .map(CartItemDto::getTotalPrice)
	            .reduce(BigDecimal.ZERO, BigDecimal::add);

	    CartDto dto = new CartDto();
	    dto.setCartId(cart.getId());
	    dto.setUserId(cart.getUser().getId());
	    dto.setItems(itemsDto);
	    dto.setCartTotal(total);
	    return dto;
	}

}
