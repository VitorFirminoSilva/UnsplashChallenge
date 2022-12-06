package com.challenge.unsplash.controllers;

import com.challenge.unsplash.dtos.ImageDTO;
import com.challenge.unsplash.entities.Image;
import com.challenge.unsplash.entities.User;
import com.challenge.unsplash.services.ImageService;
import com.challenge.unsplash.services.UserService;
import com.challenge.unsplash.util.StringGeneration;
import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/images")
public class ImageController {

    @Value("${local.path}")
    private String local_path;

    private final String folder = "uploads/";

    final ImageService imageService;
    final UserService userService;

    public ImageController(ImageService imageService, UserService userService) {
        this.imageService = imageService;
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Object> findByUser(@PathVariable(value = "userId") Long id) {
        Optional<User> userOptional = userService.findById(id);
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(imageService.findByUser(userOptional.get()));
    }

    @GetMapping(value = "/uploads/{imageURL}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<Object> returnImage(@PathVariable(value = "imageURL") String imageURL) {
        Optional<Image> imageOptional = imageService.findByImageURL(imageURL);
        if (!imageOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
        }

        File file = new File(local_path + folder + imageOptional.get().getImageURL());

        try {
            return ResponseEntity.status(HttpStatus.OK).body(Files.readAllBytes(file.toPath()));
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Image not found");
        }
    }

    @PostMapping
    public ResponseEntity<Object> create(@Valid ImageDTO imageDTO) {
        Optional<User> userOptional = userService.findById(imageDTO.getIdUser());
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        try {
            if (!imageDTO.getFile().isEmpty()) {
                
                String contentType = StringGeneration.contentTypeImage(imageDTO.getFile().getOriginalFilename());
                
                if(!contentType.equals("png") && !contentType.equals("jpeg") && !contentType.equals("jpg")){
                    return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("File dont's a image type");
                }
                
                String imageName = StringGeneration.hashNameGeneration(32);
                Optional<Image> imageOptional = imageService.findByImageURL(local_path + folder + imageName + "." +contentType);
                while(imageOptional.isPresent()){
                    imageName = local_path + folder + StringGeneration.hashNameGeneration(32);
                    imageOptional = imageService.findByImageURL(local_path + folder + imageName + "."  + contentType);
                }
                

                byte[] bytes = imageDTO.getFile().getBytes();
                Path path = Paths.get(local_path + folder + imageName + "."  + contentType);
                Files.write(path, bytes);

                var imageModel = new Image();
                imageModel.setLabel(imageDTO.getLabel());
                imageModel.setUser(userOptional.get());
                imageModel.setImageURL(imageName + "."  + contentType);

                return ResponseEntity.status(HttpStatus.CREATED).body(imageService.save(imageModel));

            } else {
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Image not found");
            }
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Path image error");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable(value = "id") Long id) {
        Optional<Image> imageOptional = imageService.findById(id);
        if (!imageOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
        }

        try {

            imageService.delete(imageOptional.get());

            File file = new File(local_path + folder + imageOptional.get().getImageURL());
            Files.delete(file.toPath());
            
            return ResponseEntity.status(HttpStatus.OK).body("Image deleted succesfully.");
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Image not found");
        }
    }

}
