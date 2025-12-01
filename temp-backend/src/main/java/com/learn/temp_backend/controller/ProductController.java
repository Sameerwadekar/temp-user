package com.learn.temp_backend.controller;

import java.net.http.HttpClient;
import java.util.List;

import org.apache.catalina.connector.Response;
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
import org.springframework.web.bind.annotation.RestController;

import com.learn.temp_backend.dtos.ProductDto;
import com.learn.temp_backend.repositary.ProductRepositary;
import com.learn.temp_backend.service.ProductService;


@RestController
@RequestMapping("/products")
@CrossOrigin
public class ProductController {

    private final ProductRepositary productRepositary;
	@Autowired
	private ProductService productService;

    ProductController(ProductRepositary productRepositary) {
        this.productRepositary = productRepositary;
    }
	
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
	@GetMapping("/{id}")
	public ResponseEntity<ProductDto> getProductById(@PathVariable int id){
		ProductDto productById = productService.getProductById(id);
		return new ResponseEntity<ProductDto>(productById,HttpStatus.OK);
	}
	@PutMapping("/{id}")
	public ResponseEntity<ProductDto> updateProduct(@PathVariable int id,@RequestBody ProductDto productDto){
		ProductDto updatedProductbyId = productService.updateProductbyId(id, productDto);
		return new ResponseEntity<ProductDto>(updatedProductbyId, HttpStatus.OK);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable int id){
		productService.deleteProduct(id);
		return new ResponseEntity<String>("Product Deleted",HttpStatus.OK);
	}
	@PutMapping("/{pid}/category/{cid}")
	public ResponseEntity<ProductDto> assignCategoty(@PathVariable int pid, @PathVariable int cid){
		ProductDto productDto = productService.assignCategory(pid, cid);
		return new ResponseEntity<ProductDto>(productDto,HttpStatus.OK);
	}
}
