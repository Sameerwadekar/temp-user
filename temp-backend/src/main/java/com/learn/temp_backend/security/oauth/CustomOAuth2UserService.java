package com.learn.temp_backend.security.oauth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.learn.temp_backend.entities.AppRole;
import com.learn.temp_backend.entities.AuthProvider;
import com.learn.temp_backend.entities.Role;
import com.learn.temp_backend.entities.User;
import com.learn.temp_backend.repositary.RoleRepositary;
import com.learn.temp_backend.repositary.UserRepositary;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepositary userRepository;
    
    @Autowired RoleRepositary roleRepositary;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request)
            throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(request);

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String providerId = oAuth2User.getName();

        User user = userRepository.findByEmail(email).orElse(null);
        Role role = roleRepositary.findByRoleName(AppRole.ROLE_USER).orElseThrow(()->new RuntimeException("Role Not Found"));

        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setName(name);
            user.setProvider(AuthProvider.GOOGLE);
            user.setProviderId(providerId);
            user.setPassword(null);
    		user.setRole(role);
            userRepository.save(user);
        }

        return oAuth2User;
    }
}

