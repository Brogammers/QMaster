package com.que.que.User;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import java.util.Collection;
import java.util.Collections;
import java.time.LocalDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.security.spec.KeySpec;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

@Entity
public class AppUser implements UserDetails {

  @Id
  @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
  private Long id;

  @Enumerated(EnumType.STRING)
  private AppUserRole appUserRole;
  private String firstName;
  private String lastName;
  private LocalDate dateOfRegistration;
  private LocalDate dateOfBirth;
  private String countryOfOrigin;
  private String password;
  private String email;
  private boolean locked = false;
  private boolean enabled = false;

  public AppUser(
      String firstName,
      String lastName,
      LocalDate dateOfRegistration,
      LocalDate dateOfBirth,
      String countryOfOrigin,
      String password,
      String email,
      String username,
      AppUserRole appUserRole,
      boolean locked,
      boolean enabled) {

    this.appUserRole = appUserRole;
    this.locked = locked;
    this.enabled = enabled;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfRegistration = dateOfRegistration;
    this.dateOfBirth = dateOfBirth;
    this.countryOfOrigin = countryOfOrigin;
    this.password = getSecureHash(password);
    this.email = getSecureHash(email);
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    SimpleGrantedAuthority authority = new SimpleGrantedAuthority(
        appUserRole.name());
    return Collections.singletonList(authority);
  }

  @Override
  public String getPassword() {
    return this.getUserPassword();
  }

  @Override
  public String getUsername() {
    return this.getUsername();
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

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  private static String getSecureHash(String s) {
    KeySpec spec = new PBEKeySpec(
        s.toCharArray(),
        Salts.getSaltByDay(LocalDate.now().getDayOfWeek().getValue() - 1),
        141551,
        265); // Gets hashing key using day of the week
    byte[] hash = null;
    try {
      SecretKeyFactory factory = SecretKeyFactory.getInstance(
          "PBKDF2WithHmacSHA1"); // Hashing algorithm
      hash = factory.generateSecret(spec).getEncoded();
    } catch (Exception e) {
      return null;
    }
    StringBuilder res = new StringBuilder();
    for (byte b : hash) {
      res.append(b + ":");
    }
    return res.toString();
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public LocalDate getDateOfRegistration() {
    return dateOfRegistration;
  }

  public void setDateOfRegistration(LocalDate dateOfRegistration) {
    this.dateOfRegistration = dateOfRegistration;
  }

  public LocalDate getDateOfBirth() {
    return dateOfBirth;
  }

  public String getUserPassword() {
    return this.password;
  }

  public void setDateOfBirth(LocalDate dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
  }

  public String getCountryOfOrigin() {
    return countryOfOrigin;
  }

  public void setCountryOfOrigin(String countryOfOrigin) {
    this.countryOfOrigin = countryOfOrigin;
  }

  public void setPassword(String password) {
    this.password = getSecureHash(password);
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = getSecureHash(email);
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    AppUser other = (AppUser) obj;
    if (lastName == null) {
      if (other.lastName != null)
        return false;
    } else if (!lastName.equals(other.lastName))
      return false;
    if (firstName == null) {
      if (other.firstName != null)
        return false;
    } else if (!firstName.equals(other.firstName))
      return false;
    if (dateOfRegistration == null) {
      if (other.dateOfRegistration != null)
        return false;
    } else if (!dateOfRegistration.equals(other.dateOfRegistration))
      return false;
    if (dateOfBirth == null) {
      if (other.dateOfBirth != null)
        return false;
    } else if (!dateOfBirth.equals(other.dateOfBirth))
      return false;
    if (countryOfOrigin == null) {
      if (other.countryOfOrigin != null)
        return false;
    } else if (!countryOfOrigin.equals(other.countryOfOrigin))
      return false;
    if (password.compareTo(other.password) != 0)
      return false;
    if (email.compareTo(other.email) != 0)
      return false;
    return true;
  }
}
