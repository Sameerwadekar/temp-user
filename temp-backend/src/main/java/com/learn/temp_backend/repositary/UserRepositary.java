package com.learn.temp_backend.repositary;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn.temp_backend.entities.User;

public interface UserRepositary extends JpaRepository<User, String> {

}
