package com.challenge.unsplash.services;

import com.challenge.unsplash.entities.Image;
import com.challenge.unsplash.entities.User;
import com.challenge.unsplash.repositories.ImageRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ImageService {
    
    final ImageRepository imageRepository;
    
    public ImageService(ImageRepository imageRepository){
        this.imageRepository = imageRepository;
    }
    
    public List<Image> findAll(){
        return imageRepository.findAll();
    }
    
    public Page<Image> findByUser(Pageable page, User user){
        return imageRepository.findByUser(page, user);
    }
    
    public Optional<Image> findById(Long id){
        return imageRepository.findById(id);
    }
    
    public Optional<Image> findByImageURL(String imageURL){
        return imageRepository.findByImageURL(imageURL);
    }
  
    @Transactional
    public Image save(Image image){
        return imageRepository.save(image);
    }
    
    @Transactional
    public void delete(Image image){
        imageRepository.delete(image);
    }
    
}
