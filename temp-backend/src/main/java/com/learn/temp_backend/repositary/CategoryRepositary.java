package com.learn.temp_backend.repositary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.learn.temp_backend.entities.Category;

@CrossOrigin(origins = "http://localhost:5173/")
public interface CategoryRepositary extends JpaRepository<Category, Integer> {

}
