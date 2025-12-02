package com.learn.temp_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.learn.temp_backend.dtos.AddToCartDto;
import com.learn.temp_backend.dtos.CartDto;
import com.learn.temp_backend.service.CartItemService;

@RestController
@RequestMapping("/cart")
@CrossOrigin

public class CartController {
	@Autowired private CartItemService cartItemService;
	
	@PostMapping("/add")
	public ResponseEntity<CartDto> addToCart(@RequestBody AddToCartDto request){
		CartDto addtoCart = cartItemService.addtoCart(request);
		return new ResponseEntity<CartDto>(addtoCart,HttpStatus.OK);
	}
	 @GetMapping("/{userId}")
	    public ResponseEntity<CartDto> getCart(@PathVariable String userId) {
	        return ResponseEntity.ok(cartItemService.getCartbyUser(userId));
	    }

	    @PutMapping("/update/{cartItemId}")
	    public ResponseEntity<CartDto> updateQuantity(
	            @PathVariable Long cartItemId,
	            @RequestParam int quantity
	    ) {
	        return ResponseEntity.ok(cartItemService.updateQuantity(cartItemId, quantity));
	    }

	    @DeleteMapping("/remove/{cartItemId}")
	    public ResponseEntity<CartDto> removeItem(@PathVariable Long cartItemId) {
	        return ResponseEntity.ok(cartItemService.removeItem(cartItemId));
	    }
}
