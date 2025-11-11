package com.learn.temp_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.temp_backend.dtos.ProductDto;
import com.learn.temp_backend.repositary.ProductRepositary;

@Service
public class ProductServiceImpl implements ProductService{
	@Autowired
	private ProductRepositary productRepositary;
	@Override
	public ProductDto addProduct(ProductDto productDto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ProductDto> getAllProducts() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ProductDto getProductById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ProductDto updateProductbyId(int id, ProductDto productDto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteProduct(int id) {
		// TODO Auto-generated method stub
		
	}

}
