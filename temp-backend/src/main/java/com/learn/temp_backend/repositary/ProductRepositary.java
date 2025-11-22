package com.learn.temp_backend.repositary;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.learn.temp_backend.entities.Category;
import com.learn.temp_backend.entities.Product;

@RepositoryRestResource(path = "product")
@CrossOrigin
public interface ProductRepositary extends JpaRepository<Product, Integer>{

		List<Product> findByAvailableTrue();
		List<Product> findByCategory_IdAndAvailableTrue(Integer categoryId);
}
