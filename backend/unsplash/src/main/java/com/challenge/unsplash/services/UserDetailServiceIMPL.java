package com.challenge.unsplash.services;

import com.challenge.unsplash.details.UserDataDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetailServiceIMPL implements UserDetailsService{

    
    private final UserService userService;

    public UserDetailServiceIMPL(UserService userService) {
        this.userService = userService;
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       if(!userService.existsByUsername(username)){
            throw new UsernameNotFoundException("User email not found");
        }
       
       return new UserDataDetails(userService.findByUsername(username));
    }
    
}
