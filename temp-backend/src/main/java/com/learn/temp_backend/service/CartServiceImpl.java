package com.learn.temp_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.temp_backend.dtos.AddToCartDto;
import com.learn.temp_backend.entities.Cart;
import com.learn.temp_backend.entities.CartItem;
import com.learn.temp_backend.entities.Product;
import com.learn.temp_backend.entities.User;
import com.learn.temp_backend.repositary.CartItemRepositary;
import com.learn.temp_backend.repositary.CartRepositary;
import com.learn.temp_backend.repositary.ProductRepositary;
import com.learn.temp_backend.repositary.UserRepositary;

@Service
public class CartServiceImpl implements CartService {

    @Autowired private UserRepositary userRepositary;
    @Autowired private ProductRepositary productRepositary;
    @Autowired private CartRepositary cartRepositary;
    @Autowired private CartItemRepositary cartItemRepositary;

    @Override
    public Cart addtoCart(AddToCartDto addToCartDto, String email) {

        User user = userRepositary.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepositary.findById(addToCartDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cart = cartRepositary.findByUser(user)
                .orElseGet(() -> cartRepositary.save(new Cart(user)));

        CartItem cartItem = cartItemRepositary.findByCartAndProduct(cart, product)
                .orElse(null);

        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + addToCartDto.getQuantity());
        } else {
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(addToCartDto.getQuantity());
        }

        cartItemRepositary.save(cartItem);
        return cartRepositary.save(cart);
    }
}

