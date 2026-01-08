package com.learn.temp_backend.security.oauth;



import java.io.IOException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class OAuth2DebugSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {

        System.out.println("🔥 OAUTH2 SUCCESS HANDLER HIT 🔥");
        System.out.println("Authentication class: " + authentication.getClass());
        System.out.println("Principal: " + authentication.getPrincipal());

        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("OAuth2 success reached");
        response.getWriter().flush();
    }
}


