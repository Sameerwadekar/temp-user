package com.learn.temp_backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.learn.temp_backend.dtos.UserDto;
import com.learn.temp_backend.entities.User;
import com.learn.temp_backend.repositary.UserRepositary;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private UserRepositary userRepositary;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDto createUser(UserDto userDto) {
		User user = modelMapper.map(userDto, User.class);
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		User savedUser = userRepositary.save(user);
		UserDto userdto = modelMapper.map(savedUser, UserDto.class);
		return userdto;
	}

}
