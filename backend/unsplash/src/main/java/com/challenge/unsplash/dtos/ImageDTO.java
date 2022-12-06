
package com.challenge.unsplash.dtos;

import com.challenge.unsplash.entities.User;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public class ImageDTO {
    
    @NotNull
    private Long idUser;
    
    @NotBlank
    private String label;
    
    @NotNull
    private MultipartFile file;

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    } 
}
