package com.challenge.unsplash.security;

import com.challenge.unsplash.services.UserDetailServiceIMPL;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class JWTConfig{

    
    private final UserDetailServiceIMPL userDetailServiceIMPL;
    private final UserDetailsService userDetailsService;

    public JWTConfig(UserDetailServiceIMPL userDetailServiceIMPL, UserDetailsService userDetailsService) {
        this.userDetailServiceIMPL = userDetailServiceIMPL;
        this.userDetailsService = userDetailsService;
    }
    
    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(encoderPassword());
        return authProvider;
    }

    @Bean
    public PasswordEncoder encoderPassword() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration config = new CorsConfiguration();
        
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        config.setAllowCredentials(Boolean.TRUE);
        
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
     
    @Bean
    public SecurityFilterChain filterChains(HttpSecurity http) throws Exception {
        http.cors().configurationSource(corsConfigurationSource()).and()
                .csrf().disable()
                
                .formLogin().disable()
                .httpBasic().disable()
                
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                .antMatchers(HttpMethod.POST, "/user/create").permitAll()
                .anyRequest().authenticated()
                .and()
                .apply(new CustonDSL()).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return http.build();
    }
    
    
    public class CustonDSL extends AbstractHttpConfigurer<CustonDSL, HttpSecurity>{

        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager auth = builder.getSharedObject(AuthenticationManager.class);
            builder.addFilter(new JWTAuthFilter(auth))
            .addFilter(new JWTValidateFilter(auth));
        } 
    }
}
