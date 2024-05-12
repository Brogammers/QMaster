package com.que.que.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import jakarta.persistence.Entity;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@JsonSerialize(using = AppUserSerializer.class)
public class AppUser extends User {

  public AppUser(
      AppUserRole appUserRole,
      String firstName,
      String lastName,
      String username,
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
    super(appUserRole, firstName, lastName, username, dateOfRegistration, dateOfBirth, countryOfOrigin, password, email,
        locked, enabled, phoneCode, phoneNumber, location);
  }

}
