package com.challenge.unsplash;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class UnsplashChallengeApplication {

    public static void main(String[] args) {
        SpringApplication.run(UnsplashChallengeApplication.class, args);
    }

    @GetMapping("/")
    public String index() {
        return "Unsplash API online";
    }
}
