package com.challenge.unsplash;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@RestController
public class UnsplashChallengeApplication {

        
	public static void main(String[] args) {
		SpringApplication.run(UnsplashChallengeApplication.class, args);
	}
        
        @GetMapping("/")
        public String index(){
            return "Unsplash API online";
        }
        
        @Bean
        public PasswordEncoder getPasswordEncoder(){
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            return encoder;
        }

}
