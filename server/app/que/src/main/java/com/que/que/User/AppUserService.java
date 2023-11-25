package com.que.que.User;

import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.que.que.Registration.Token.ConfirmationToken;
import com.que.que.Registration.Token.ConfirmationTokenService;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

  private final AppUserRepository appUserRepository;
  private static final String USER_NOT_FOUND_MSG = "User with email %s was not found in the database";
  private final ConfirmationTokenService confirmationTokenService;

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

    appUserRepository.save(appUser);

    appUser.setPassword(appUser.getPassword());

    String token = UUID.randomUUID().toString();
    ConfirmationToken confirmationToken = new ConfirmationToken(
        token,
        LocalDate.now(),
        LocalDate.now().plusDays(2),
        null,
        appUser);

    confirmationTokenService.saveConfirmationToken(confirmationToken);

    // TODO: SEND EMAIL

    return "Registered!";
  }
}
