
package com.challenge.unsplash.repositories;

import com.challenge.unsplash.entities.Image;
import com.challenge.unsplash.entities.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>{
    
    List<Image> findByUser(User user);
    
    Optional<Image> findByImageURL(String imageURL);
}
