package com.learn.temp_backend.service;

import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.temp_backend.dtos.ProductDto;
import com.learn.temp_backend.entities.Category;
import com.learn.temp_backend.entities.Product;
import com.learn.temp_backend.repositary.CategoryRepositary;
import com.learn.temp_backend.repositary.ProductRepositary;

@Service
public class ProductServiceImpl implements ProductService{

    private final ModelMapper modelMapper;
	@Autowired
	private ProductRepositary productRepositary;
	
	@Autowired
	private CategoryRepositary categoryRepositary;

    ProductServiceImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
	@Override
	public ProductDto addProduct(ProductDto productDto) {
		Category category = categoryRepositary.findById(productDto.getCategoryId()).orElseThrow(()->new RuntimeException("category id not found"));
		Product product = modelMapper.map(productDto, Product.class);
		product.setCategory(category);
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
		Product product = productRepositary.findById(id).orElseThrow(()-> new RuntimeException("Id not found"));
		ProductDto productDto = modelMapper.map(product, ProductDto.class);
		return productDto;
	}

	@Override
	public ProductDto updateProductbyId(int id, ProductDto productDto) {
		Product product = productRepositary.findById(id).orElseThrow(()->new RuntimeException("id not found"));
		Category category = categoryRepositary.findById(productDto.getCategoryId()).orElseThrow(()->new RuntimeException("category id not found"));
		product.setDescription(productDto.getDescription());
		product.setName(productDto.getName());
		product.setPrice(productDto.getPrice());
		product.setCategory(category);
		Product savedproduct = productRepositary.save(product);
		ProductDto savedDto = modelMapper.map(savedproduct, ProductDto.class);	
		return savedDto;
	}

	@Override
	public void deleteProduct(int id) {
		Product product = productRepositary.findById(id).orElseThrow(()-> new RuntimeException("id not found"));
		int pid = product.getId();
		productRepositary.deleteById(pid);
	}
	@Override
	public ProductDto assignCategory(int pid, int cid) {
		Product product = productRepositary.findById(pid).orElseThrow(()-> new RuntimeException("id not found"));
		Category category = categoryRepositary.findById(cid).orElseThrow(()-> new RuntimeException("id not found"));
		product.setCategory(category);
		Product savedProduct = productRepositary.save(product);
		ProductDto productDto = modelMapper.map(savedProduct, ProductDto.class);		
		return productDto;
	}

}
