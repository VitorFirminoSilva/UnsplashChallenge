
package com.challenge.unsplash.dtos;

import com.challenge.unsplash.entities.User;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ImageDTO {
    
    @NotNull
    private Long idUser;
    
    @NotBlank
    private String label;

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
}
