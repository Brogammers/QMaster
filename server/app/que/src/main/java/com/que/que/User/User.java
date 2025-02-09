package com.que.que.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;

    @Column(nullable = false)
    private String firstName;

    private UserRole userRole;

    private String lastName;

    @Column(nullable = false)
    private String phoneCode;
    @Column(nullable = false)
    private String phoneNumber;

    private LocalDateTime dateOfRegistration;
    private LocalDate dateOfBirth;
    private String countryOfOrigin;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private boolean locked = false;

    @Column(nullable = false)
    private boolean enabled = false;
    private String location;

    public User(
            UserRole userRole,
            String firstName,
            String lastName,
            LocalDateTime dateOfRegistration,
            LocalDate dateOfBirth,
            String countryOfOrigin,
            String password,
            String email,
            boolean locked,
            boolean enabled,
            String phoneCode,
            String phoneNumber,
            String location) {
        this.userRole = userRole;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfRegistration = dateOfRegistration;
        this.dateOfBirth = dateOfBirth;
        this.countryOfOrigin = countryOfOrigin;
        this.password = password;
        this.email = email;
        this.locked = locked;
        this.enabled = enabled;
        this.phoneCode = phoneCode;
        this.phoneNumber = phoneNumber;
        this.location = location;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(
                userRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !this.locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

}
