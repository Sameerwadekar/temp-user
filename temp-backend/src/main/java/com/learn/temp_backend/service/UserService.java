package com.learn.temp_backend.service;

import com.learn.temp_backend.dtos.UserDto;

public interface UserService {
	UserDto createUser(UserDto userDto);
}
