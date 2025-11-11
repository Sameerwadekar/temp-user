package com.learn.temp_backend.repositary;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn.temp_backend.entities.Product;

public interface ProductRepositary extends JpaRepository<Product, Integer>{

}
