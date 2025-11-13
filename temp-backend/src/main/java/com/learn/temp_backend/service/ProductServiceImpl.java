package com.learn.temp_backend.service;

import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.temp_backend.dtos.ProductDto;
import com.learn.temp_backend.entities.Product;
import com.learn.temp_backend.repositary.ProductRepositary;

@Service
public class ProductServiceImpl implements ProductService{

    private final ModelMapper modelMapper;
	@Autowired
	private ProductRepositary productRepositary;

    ProductServiceImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
	@Override
	public ProductDto addProduct(ProductDto productDto) {
		Product product = modelMapper.map(productDto, Product.class);
		Product saved = productRepositary.save(product);
		ProductDto savedDto = modelMapper.map(saved, ProductDto.class);
		return savedDto;
	}

	@Override
	public List<ProductDto> getAllProducts() {
		List<Product> products = productRepositary.findAll();
		List<ProductDto> list = products.stream().map((e)->modelMapper.map(e, ProductDto.class)).toList();
		return list;
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
