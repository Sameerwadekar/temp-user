package com.learn.temp_backend.dtos;

import java.math.BigDecimal;
import java.util.List;

import com.learn.temp_backend.entities.CartItem;
import com.learn.temp_backend.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDto {
	 private Long cartId;
	 private Long userId;
	 private List<CartItemDto> items;
	 private BigDecimal cartTotal;
}
