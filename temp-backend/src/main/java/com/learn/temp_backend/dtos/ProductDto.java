package com.learn.temp_backend.dtos;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
	private int id;
	private String name;
	private BigDecimal price;
	private String description;
}
