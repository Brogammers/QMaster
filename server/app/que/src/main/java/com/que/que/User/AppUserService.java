package com.que.que.User;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

  private final AppUserRepository appUserRepository;
  private static final String USER_NOT_FOUND_MSG = "User with email %s was not found in the database";

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
    // TODO: Send confirmation token
    return "Registered!";
  }
}
