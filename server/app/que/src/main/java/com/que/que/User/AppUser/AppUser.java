package com.que.que.User.AppUser;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.que.que.Store.Purchase.Purchase;
import com.que.que.User.User;
import com.que.que.User.UserRole;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@JsonSerialize(using = AppUserSerializer.class)
public class AppUser extends User {

  @OneToMany(mappedBy = "user")
  private List<Purchase> purchases = new ArrayList<>();

  public AppUser(
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
    super(
        UserRole.USER, firstName, lastName, dateOfRegistration, dateOfBirth, countryOfOrigin, password, email,
        locked, enabled, phoneCode, phoneNumber, location);
  }

}
