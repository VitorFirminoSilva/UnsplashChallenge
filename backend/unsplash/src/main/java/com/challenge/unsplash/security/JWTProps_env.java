package com.challenge.unsplash.security;

public interface JWTProps_env {
    public static final int TOKEN_EXPIRE = 600_000;
    public static final String TOKEN_PASSWORD = "password";
    public static final String HEADER_ATTR = "Authorization";
    public static final String ATTRIBUTE_PREFIX = "Bearer ";
}


/* Retirar o _env para rodar o serviço e adicionar o UID em TOKEN_PASSWORD */