package com.que.que.Login;

import com.que.que.Registration.EmailValidator;
import com.que.que.User.AppUser;
import com.que.que.User.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LoginService {

  private final AppUserRepository appUserRepository;
  private final EmailValidator emailValidator;
  private final LoginRepository loginRepository;

  private boolean checkIfValidUser(String email, String password) {
    boolean isValidEmail = emailValidator.test(email);
    if (!isValidEmail) return false;
    AppUser user = appUserRepository
      .findByEmail(email)
      .orElseThrow(() -> new IllegalStateException("User not found."));
    return user.isEnabled();
  }

  public void loginUser(String email, String password) {
    
    if (checkIfValidUser(email, password)) {
      loginRepository.save(appUserRepository.findByEmail(email).orElseThrow(() -> new IllegalStateException("User not found.")));
    }
  }
}
