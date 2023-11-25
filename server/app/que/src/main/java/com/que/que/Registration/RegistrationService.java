package com.que.que.Registration;

import lombok.AllArgsConstructor;

import java.time.LocalDate;
import org.springframework.stereotype.Service;
import com.que.que.User.AppUser;
import com.que.que.User.AppUserService;
import com.que.que.User.AppUserRole;

@Service
@AllArgsConstructor
public class RegistrationService {

  private final AppUserService appUserService;
  private final EmailValidator emailValidator;

  public String register(RegistrationRequest request) {
    boolean isValidEmail = emailValidator.test(request.getEmail());
    if (!isValidEmail) {
      throw new IllegalStateException("Not Functional");
    }
    return appUserService.signUpUser(
        new AppUser(
            request.getFirstName(),
            request.getLastName(),
            LocalDate.now(),
            request.getDateOfBirth(),
            request.getCountryOfOrigin(),
            request.getPassword(),
            request.getEmail(),
            request.getUsername(),
            AppUserRole.USER,
            true,
            true));
  }
}
