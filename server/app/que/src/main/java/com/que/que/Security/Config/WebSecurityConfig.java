package com.que.que.Security.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

import com.que.que.User.AppUserService;
import lombok.AllArgsConstructor;

// @PreAuthorize("hasRole('ADMIN')")

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig {

    private final AppUserService appUserService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .authorizeHttpRequests((authz) -> {
                    authz

                            .anyRequest().permitAll();
                }).csrf().disable();
        return http.build();

        /*
         * http
         * .csrf((csrf) -> csrf
         * .csrfTokenRepository(new HttpSessionCsrfTokenRepository()))
         * .formLogin((authz) -> {
         * authz
         * .loginPage("/api/v1/login").permitAll();
         * })
         * .logout((authz) -> {
         * authz.permitAll();
         * })
         * .authorizeHttpRequests((authz) -> {
         * authz
         * .requestMatchers("/api/v1/registration").permitAll()
         * .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
         * .anyRequest().authenticated();
         * });
         * 
         * return http.build();
         */
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(appUserService);
        return provider;
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http
                .getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(daoAuthenticationProvider());
        return authenticationManagerBuilder.build();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails user = User.withUsername("root")
                .password(bCryptPasswordEncoder.encode("123456789"))
                .roles("ADMIN")
                .build();
        return new InMemoryUserDetailsManager(user);
    }

}
