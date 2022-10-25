package com.challenge.unsplash.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.challenge.unsplash.details.UserDataDetails;
import com.challenge.unsplash.entities.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JWTAuthFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public JWTAuthFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;   
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        try {
            User user = new ObjectMapper().readValue(request.getInputStream(), User.class);
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), new ArrayList<>()));

        } catch (IOException ex) {
            throw new RuntimeException("Falha ao autenticar usuario", ex);
        }

    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        
        UserDataDetails userData = (UserDataDetails) authResult.getPrincipal();
        
        String accessToken = createJWTToken(userData);
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        response.getWriter().write("\"access_token\":" + accessToken);
        
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setStatus(401);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("\"error\": UsernamePasswordFailureException");
    }
    
    private String createJWTToken(UserDataDetails userData){
        String token = JWT.create()
                .withSubject(userData.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + JWTProps.TOKEN_EXPIRE))
                .sign(Algorithm.HMAC512(JWTProps.TOKEN_PASSWORD));
        return token;
    }
}
