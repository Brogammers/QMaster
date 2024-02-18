package com.que.que.Login;

import com.que.que.Registration.EmailValidator;
import com.que.que.User.AppUser;
import com.que.que.User.AppUserRepository;
import lombok.AllArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LoginService {

  private final AppUserRepository appUserRepository;
  private final EmailValidator emailValidator;
  private final LoginRepository loginRepository;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;
  private final String INVALID_LOGIN_MSG = "Password or Username are incorrect";

  private AppUser checkIfValidUser(String email, String password) {
    boolean isValidEmail = emailValidator.test(email);
    if (!isValidEmail) {
      throw new IllegalStateException(INVALID_LOGIN_MSG);
    }
    AppUser user = appUserRepository
        .findByEmail(email).orElseThrow(() -> new IllegalStateException(INVALID_LOGIN_MSG));
    if (bCryptPasswordEncoder.matches(password, user.getPassword()) && user.isEnabled()) {
      return user;
    } else {
      new IllegalStateException(INVALID_LOGIN_MSG);
      return null;
    }
  }

  public Map<String, Object> loginUser(String email, String password) {
    AppUser user = checkIfValidUser(email, password);
    if (user != null) {
      LoginEntry loginEntry = new LoginEntry(user);
      loginRepository.save(loginEntry);
      System.out.println("Logged in!");
      Map<String, Object> object = new HashMap<>();
      object.put("email", email);
      object.put("username", user.getUsername());
      object.put("userID", user.getId());
      object.put("first-name", user.getFirstName());
      object.put("last-name", user.getLastName());
      return object;
    } else {
      throw new IllegalStateException("User not found");
    }
  }
}
