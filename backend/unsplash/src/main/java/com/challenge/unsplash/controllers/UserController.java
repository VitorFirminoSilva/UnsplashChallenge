package com.challenge.unsplash.controllers;

import com.challenge.unsplash.dtos.UserDTO;
import com.challenge.unsplash.entities.User;
import com.challenge.unsplash.services.UserService;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/user")
public class UserController {
    
    final UserService userService;
    final PasswordEncoder encoder;

    public UserController(UserService userService, PasswordEncoder encoder) {
        this.userService = userService;
        this.encoder = encoder;
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable(value="id") Long id){
        Optional<User> userOptional = userService.findById(id);
        if(!userOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(userOptional.get()); 
    }
    
    @PostMapping
    public ResponseEntity<Object> create(@RequestBody @Valid UserDTO userDTO){
        if(userService.existsByUsername(userDTO.getUsername())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: user username is already in use!");
        }
        
        var userModel = new User();
        BeanUtils.copyProperties(userDTO, userModel);
        userModel.setPassword(encoder.encode(userDTO.getPassword()));
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(userModel));
    } 
}
