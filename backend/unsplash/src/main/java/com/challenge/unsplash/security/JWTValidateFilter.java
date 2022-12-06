package com.challenge.unsplash.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JWTValidateFilter extends BasicAuthenticationFilter{
    
    public JWTValidateFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        
        String attribute = request.getHeader(JWTProps.HEADER_ATTR);
        if(attribute == null){
            chain.doFilter(request, response);
            return;
        }
        
        if(!attribute.startsWith(JWTProps.ATTRIBUTE_PREFIX)){
            chain.doFilter(request, response);
            return;
        }
        
        String token = attribute.replace(JWTProps.ATTRIBUTE_PREFIX, "");
        try{
            UsernamePasswordAuthenticationToken authenticationToken = getAuthenticationToken(token);

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        
            chain.doFilter(request, response);
        }catch(TokenExpiredException ex){
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("ValidateTokenFailureException");
        } 
    }
    
    private UsernamePasswordAuthenticationToken getAuthenticationToken(String token){
        
        String user = JWT.require(Algorithm.HMAC512(JWTProps.TOKEN_PASSWORD)).build().verify(token).getSubject();
        
        if(user == null){
            return null;
        }
        
        return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
    }   
}
