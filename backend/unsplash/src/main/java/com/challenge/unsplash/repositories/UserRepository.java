package com.challenge.unsplash.repositories;

import com.challenge.unsplash.entities.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    
    boolean existsByEmail(String email);
    
    Optional<User> findByEmailAndPassword(String email, String password);
}
