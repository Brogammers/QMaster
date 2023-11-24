package com.que.que.User;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import java.sql.Date;
import java.util.Collection;
import java.util.Collections;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
public class AppUser extends User implements UserDetails {

  @Id
  @SequenceGenerator(
    name = "user_sequence",
    sequenceName = "user_sequence",
    allocationSize = 1
  )
  @GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "user_sequence"
  )
  private Long id;

  @Enumerated(EnumType.STRING)
  private AppUserRole appUserRole;

  private boolean locked = false;
  private boolean enabled = false;

  public AppUser(
    String firstName,
    String lastName,
    Date dateOfRegistration,
    Date dateOfBirth,
    String countryOfOrigin,
    String password,
    String email,
    String username,
    AppUserRole appUserRole,
    boolean locked,
    boolean enabled
  ) {
    super(
      firstName,
      lastName,
      dateOfRegistration,
      dateOfBirth,
      countryOfOrigin,
      password,
      email
    );
    this.appUserRole = appUserRole;
    this.locked = locked;
    this.enabled = enabled;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    SimpleGrantedAuthority authority = new SimpleGrantedAuthority(
      appUserRole.name()
    );
    return Collections.singletonList(authority);
  }

  @Override
  public String getPassword() {
    return this.getUserPassword();
  }

  @Override
  public String getUsername() {
    return this.getEmail();
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
