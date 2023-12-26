package com.que.que.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.Collections;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class AppUser implements UserDetails {

  @Id
  @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
  private Long id;

  @Enumerated(EnumType.STRING)
  private AppUserRole appUserRole;
  @Column(nullable = false)
  private String firstName;
  private String lastName;
  private String userName;
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
  @Column(nullable = false)
  private int queueId; // If queue id is -1 then there is no queue

  public AppUser(AppUserRole appUserRole, String firstName, String lastName, String username,
      LocalDateTime dateOfRegistration, LocalDate dateOfBirth, String countryOfOrigin, String password, String email,
      boolean locked, boolean enabled) {
    this.appUserRole = appUserRole;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = username;
    this.dateOfRegistration = dateOfRegistration;
    this.dateOfBirth = dateOfBirth;
    this.countryOfOrigin = countryOfOrigin;
    this.password = password;
    this.email = email;
    this.locked = locked;
    this.enabled = enabled;
    this.queueId = -1;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    SimpleGrantedAuthority authority = new SimpleGrantedAuthority(appUserRole.name());
    return Collections.singletonList(authority);
  }

  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public String getUsername() {
    return this.userName;
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
