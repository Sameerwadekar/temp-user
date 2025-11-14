package com.learn.temp_backend.repositary;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn.temp_backend.entities.Category;

public interface CategoryRepositary extends JpaRepository<Category, Integer> {

}
