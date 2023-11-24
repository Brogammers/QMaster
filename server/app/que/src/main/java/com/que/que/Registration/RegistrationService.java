package com.que.que.Registration;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
        request.getUsername(),
        request.getEmail(),
        request.getPassword(),
        AppUserRole.USER
      )
    );
  }
}
