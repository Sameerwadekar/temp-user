package com.learn.temp_backend.dtos;

import java.math.BigDecimal;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDto {
	 	private int productId;
	    private String productName;
	    private BigDecimal price;
	    private int quantity;
	    private String productImage;
	    private BigDecimal totalPrice;
}
