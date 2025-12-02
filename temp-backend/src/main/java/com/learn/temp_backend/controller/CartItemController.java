package com.learn.temp_backend.controller;

import com.learn.temp_backend.dtos.CartDto;
import com.learn.temp_backend.service.CartItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart-item")
public class CartItemController {

    private final CartItemService cartItemService;

    public CartItemController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @PutMapping("/{cartItemId}/quantity")
    public ResponseEntity<CartDto> updateQuantity(
            @PathVariable Long cartItemId,
            @RequestParam int quantity
    ) {
        return ResponseEntity.ok(cartItemService.updateQuantity(cartItemId, quantity));
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<CartDto> removeItem(@PathVariable Long cartItemId) {
        return ResponseEntity.ok(cartItemService.removeItem(cartItemId));
    }
}
