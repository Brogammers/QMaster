package com.que.que.User;

import java.sql.Date;
import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class AppUser extends User implements UserDetails {

    private Long id;
    private AppUserRole appUserRole;
    private Boolean locked;
    private Boolean enabled;

    public AppUser(
            String name,
            Date dateOfRegistration,
            Date dateOfBirth,
            String countryOfOrigin,
            String password,
            String email,
            String username) {
        super(name, dateOfRegistration, dateOfBirth, countryOfOrigin, password, email, username);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(appUserRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return this.getUserPassword();
    }

    @Override
    public String getUsername() {
        return this.getUserUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

}
