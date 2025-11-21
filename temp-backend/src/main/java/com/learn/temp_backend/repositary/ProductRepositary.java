package com.learn.temp_backend.repositary;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.learn.temp_backend.entities.Product;

@RepositoryRestResource(path = "product")
public interface ProductRepositary extends JpaRepository<Product, Integer>{

		List<Product> findByAvailableTrue();
}
