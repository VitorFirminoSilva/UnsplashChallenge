package com.challenge.unsplash.controllers;

import com.challenge.unsplash.dtos.LoginDTO;
import com.challenge.unsplash.dtos.UserDTO;
import com.challenge.unsplash.entities.User;
import com.challenge.unsplash.services.UserService;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/user")
public class UserController {
    
    final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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
        if(userService.existsByEmail(userDTO.getEmail())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: user email is already in use!");
        }
        
        var userModel = new User();
        BeanUtils.copyProperties(userDTO, userModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(userModel));
    } 
    
    @PostMapping(value = "/login")
    public ResponseEntity<Object> login(@RequestBody @Valid LoginDTO loginDTO){
        if(!userService.existsByEmail(loginDTO.getEmail())){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: user email is not found!");
        }
        
        if(!userService.existsByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword())){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Erro: login error!");
        }
        
        var userModel = userService.findByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword());
        return ResponseEntity.status(HttpStatus.OK).body(userModel);
    } 
  
}