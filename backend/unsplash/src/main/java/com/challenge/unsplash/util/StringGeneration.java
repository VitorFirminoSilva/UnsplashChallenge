package com.challenge.unsplash.util;

import java.util.Random;

public class StringGeneration {
    
    public static String hashNameGeneration(int length){
        
        String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        StringBuilder sb = new StringBuilder();
        
        Random random = new Random();
        
        for (int i = 0; i < length; i++) {
            
            int index = random.nextInt(alphabet.length());
            
            char ramdomChar = alphabet.charAt(index);
            
            sb.append(ramdomChar);
        }
        
        return sb.toString();
    }
    
    public static String contentTypeImage(String imageName){
        String name = imageName.replace(".", ":");
        String[] vetorName = name.split(":");
        return vetorName[1];
    }
    
    
}
