package com.learn.temp_backend.controller;

import java.net.http.HttpClient;
import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learn.temp_backend.dtos.ProductDto;
import com.learn.temp_backend.service.ProductService;



@RestController
@RequestMapping("/products")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@PostMapping
	public ResponseEntity<ProductDto> addProduct(@RequestBody ProductDto productDto){
		ProductDto product = productService.addProduct(productDto);
		return new ResponseEntity<ProductDto>(product,HttpStatus.CREATED);
	}
	@GetMapping
	public ResponseEntity<List<ProductDto>> allProducts(){
		List<ProductDto> allProducts = productService.getAllProducts();
		return new ResponseEntity<List<ProductDto>>(allProducts,HttpStatus.OK);
	}
}
