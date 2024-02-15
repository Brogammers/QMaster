package com.que.que.Registration;

import com.que.que.Email.EmailSender;
import com.que.que.Registration.Token.ConfirmationToken;
import com.que.que.Registration.Token.ConfirmationTokenService;
import com.que.que.User.AppUser;
import com.que.que.User.AppUserRole;
import com.que.que.User.AppUserService;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
      throw new IllegalStateException("Email invalid");
    }
    if (!request.getPassword().equals(request.getConfirmPassword())) {
      throw new IllegalStateException("Password do not match");
    }
    String token = appUserService.signUpUser(
        new AppUser(
            AppUserRole.USER,
            request.getFirstName(),
            request.getLastName(),
            request.getUsername(),
            LocalDateTime.now(),
            request.getDateOfBirth(),
            request.getCountryOfOrigin(),
            request.getPassword(),
            request.getEmail(),
            false,
            false,
            (byte) 0));
    Map<String, String> context = new HashMap<>();
    context.put("name", request.getFirstName());
    context.put("token", token);
    emailSender.send(request.getEmail(), "src/main/resources/templates/Activation.html",
        "Confirm Email", context);
    return token;
  }

  @Transactional
  public void confirmToken(String token) {
    ConfirmationToken confirmationToken = confirmationTokenService.getToken(
        token);

    if (confirmationToken.getConfirmedAt() != null) {
      throw new IllegalStateException("Email already confirmed");
    }

    LocalDateTime expiredAt = confirmationToken.getExpiresAt();

    if (expiredAt.isBefore(LocalDateTime.now())) {
      throw new IllegalStateException("Token expired");
    }

    confirmationTokenService.setConfirmedAt(token);
    appUserService.enableAppUser(confirmationToken.getAppUser().getEmail());
  }
}
