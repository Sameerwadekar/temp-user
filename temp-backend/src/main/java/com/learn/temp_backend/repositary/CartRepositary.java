package com.learn.temp_backend.repositary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.learn.temp_backend.entities.Cart;
import com.learn.temp_backend.entities.User;

import java.util.Optional;

@RepositoryRestResource(path = "cart")
@CrossOrigin
public interface CartRepositary extends JpaRepository<Cart, Long>{
	Optional<Cart> findByUser(User user);
}
