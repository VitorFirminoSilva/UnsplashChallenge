package com.challenge.unsplash.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/validate")
public class LoginController {
    
    @GetMapping()
    public ResponseEntity<Object> validate(){
        return ResponseEntity.status(HttpStatus.OK).body(""); 
    }
}

