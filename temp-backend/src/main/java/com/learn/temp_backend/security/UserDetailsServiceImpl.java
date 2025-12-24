package com.learn.temp_backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.learn.temp_backend.entities.AuthProvider;
import com.learn.temp_backend.entities.User;
import com.learn.temp_backend.repositary.UserRepositary;

@Component
public class UserDetailsServiceImpl implements UserDetailsService  {
	
	@Autowired
	private UserRepositary userRepositary;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepositary.findByEmail(username).orElseThrow(()-> new RuntimeException("email not found"));
		return user;
	}
}
