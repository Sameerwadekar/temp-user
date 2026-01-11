package com.learn.temp_backend.security.oauth;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.learn.temp_backend.dtos.UserDto;
import com.learn.temp_backend.entities.User;
import com.learn.temp_backend.repositary.UserRepositary;
import com.learn.temp_backend.security.jwt.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@Component
public class OAuth2AuthenticationSuccessHandler
        extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired private UserRepositary userRepositary;
    
    @Autowired private ModelMapper modelMapper;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException{

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(email);

        String jwt = jwtUtils.generateTokenFromUsername(userDetails);
        
        User user = userRepositary.findByEmail(email).orElseThrow(()-> new RuntimeException("user not found"));
        
        
        UserDto auth2user = modelMapper.map(user, UserDto.class);
        
       
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("token", jwt);
        responseBody.put("userDto", auth2user);
        String redirectUrl =
        	    "http://localhost:5173/oauth2/success?token=" + jwt;

        	getRedirectStrategy().sendRedirect(request, response, redirectUrl);
        clearAuthenticationAttributes(request);
    }
}

