package com.learn.temp_backend.repositary;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.learn.temp_backend.entities.Category;
import com.learn.temp_backend.entities.Product;

@CrossOrigin
public interface CategoryRepositary extends JpaRepository<Category, Integer> {

}
