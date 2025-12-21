package com.learn.temp_backend.dtos;
//import com.learn.foodapp.entities.Role;
import com.learn.temp_backend.validators.PasswordMatch;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@PasswordMatch
public class UserDto {
	private String id;
	@NotNull(message = "name should not be null")
	@NotBlank(message = "name should not be blank")
	@Size(min = 3)
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Name must contain only letters and spaces, no numbers allowed")
	private String name;
	@NotNull(message = "password should not be null")
	@NotBlank(message = "password should not be blank")
	private String password;
	private String confirmPassword;	
	@NotNull(message = "email should not be null")
	@NotBlank(message = "email shoukd not be blank")
	private String email;
	private String roleName;
}
