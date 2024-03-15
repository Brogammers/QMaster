package com.que.que.User;

import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.que.que.Email.EmailService;
import com.que.que.Registration.Token.ConfirmationToken;
import com.que.que.Registration.Token.ConfirmationTokenService;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

  private final AppUserRepository appUserRepository;
  private static final String USER_NOT_FOUND_MSG = "User with email %s was not found in the database";
  private final ConfirmationTokenService confirmationTokenService;
  private final EmailService emailService;
  private final BCryptPasswordEncoder passwordEncoder;

  @Override
  public UserDetails loadUserByUsername(String username)
      throws UsernameNotFoundException {
    return appUserRepository
        .findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException(
            String.format(USER_NOT_FOUND_MSG, username)));
  }

  public String signUpUser(AppUser appUser) {
    boolean userExists = appUserRepository
        .findByEmail(appUser.getEmail())
        .isPresent();
    if (userExists) {
      throw new IllegalStateException("Email is already in use.");
    }

    String encodedPassword = passwordEncoder.encode(appUser.getPassword());
    appUser.setPassword(encodedPassword);

    appUserRepository.save(appUser);

    String token = UUID.randomUUID().toString();
    ConfirmationToken confirmationToken = new ConfirmationToken(
        token,
        LocalDateTime.now(),
        LocalDateTime.now().plusDays(1),
        null,
        appUser);

    confirmationTokenService.saveConfirmationToken(confirmationToken);
    Map<String, String> context = new HashMap<>();
    context.put("name", appUser.getFirstName());
    // TODO: Disabled for now
    /* 
    emailService.send(appUser.getEmail(),
        "src/main/resources/templates/Hello.html", "Welcome!", context); // TODO: Send email
    */
    return confirmationToken.toString();
  }

  public void enableAppUser(String email) {
    AppUser appUser = appUserRepository.findByEmail(email)
        .orElseThrow(() -> new IllegalStateException("User was not found"));
    appUser.setEnabled(true);
  }
}
