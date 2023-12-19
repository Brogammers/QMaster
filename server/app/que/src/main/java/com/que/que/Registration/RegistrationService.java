package com.que.que.Registration;

import lombok.AllArgsConstructor;

import java.time.LocalDate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.que.que.Email.EmailSender;
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
  private final EmailSender emailSender;

  public String register(RegistrationRequest request) {
    boolean isValidEmail = emailValidator.test(request.getEmail());
    if (!isValidEmail) {
      throw new IllegalStateException("Not Functional");
    }
    if (request.getPassword() != request.getConfirmPassword()) {
      throw new IllegalStateException("Password do not match");
    }
    String token = appUserService.signUpUser(
        new AppUser(
            AppUserRole.USER,
            request.getFirstName(),
            request.getLastName(),
            request.getUsername(),
            LocalDate.now(),
            request.getDateOfBirth(),
            request.getCountryOfOrigin(),
            request.getPassword(),
            request.getEmail(),
            false,
            false));
    emailSender.send(request.getEmail(), "Hello!"); // TODO: Send email
    return token;
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
