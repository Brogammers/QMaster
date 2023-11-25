package com.que.que.Registration;

import lombok.AllArgsConstructor;

import java.time.LocalDate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.que.que.Registration.Token.ConfirmationToken;
import com.que.que.Registration.Token.ConfirmationTokenService;
import com.que.que.User.AppUser;
import com.que.que.User.AppUserService;
import com.que.que.User.AppUserRole;

@Service
@AllArgsConstructor
public class RegistrationService {

  private final AppUserService appUserService;
  private final EmailValidator emailValidator;
  private final ConfirmationTokenService confirmationTokenService;

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

  @Transactional
  public String confirmToken(String token) {
    ConfirmationToken confirmationToken = confirmationTokenService.getToken(token);

    if (confirmationToken.getConfirmedAt() != null) {
      throw new IllegalStateException("Email already confirmed");
    }

    LocalDate expiredAt = confirmationToken.getExpiresAt();

    if (expiredAt.isBefore(LocalDate.now())) {
      throw new IllegalStateException("Token expired");
    }

    confirmationTokenService.setConfirmedAt(token);
    appUserService.enableAppUser(confirmationToken.getAppUser().getEmail());
    return "Confirmed!";
  }
}
