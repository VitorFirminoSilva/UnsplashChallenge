
package com.challenge.unsplash.repositories;

import com.challenge.unsplash.entities.Image;
import com.challenge.unsplash.entities.User;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>, PagingAndSortingRepository<Image, Long>{
    
    Page<Image> findByUser(Pageable page, User user);
    
    Optional<Image> findByImageURL(String imageURL);
}
