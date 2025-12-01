package com.learn.temp_backend.repositary;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn.temp_backend.entities.Role;
import java.util.Optional;

import com.learn.temp_backend.entities.AppRole;


public interface RoleRepositary extends JpaRepository<Role, Integer>{
	Optional<Role> findByRoleName(AppRole roleName);
}
