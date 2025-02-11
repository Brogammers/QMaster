package com.que.que.Login;

import com.que.que.Registration.EmailValidator;
import com.que.que.Security.JwtUtil;
import com.que.que.User.AdminUser.AdminUser;
import com.que.que.User.AdminUser.AdminUserRepository;
import com.que.que.User.AppUser.AppUser;
import com.que.que.User.AppUser.AppUserRepository;
import com.que.que.User.BusinessUser.BusinessUser;
import com.que.que.User.BusinessUser.BusinessUserRepository;

import lombok.AllArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LoginService {

  private final AppUserRepository appUserRepository;
  private final BusinessUserRepository businessUserRepository;
  private final AdminUserRepository adminUserRepository;
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
      String jwtToken = JwtUtil.generateToken(user.getEmail());

      Map<String, Object> object = new HashMap<>();
      object.put("email", email);
      object.put("phoneCode", user.getPhoneCode());
      object.put("phoneNumber", user.getPhoneNumber());
      object.put("userID", user.getId());
      object.put("firstName", user.getFirstName());
      object.put("lastName", user.getLastName());
      object.put("token", jwtToken);
      return object;
    } else {
      throw new IllegalStateException("User not found");
    }
  }

  public Map<String, Object> loginBusinessUser(String email, String password) {
    BusinessUser user = checkIfValidBusinessUser(email, password);
    if (user != null) {
      LoginEntry loginEntry = new LoginEntry(user);
      loginRepository.save(loginEntry);
      Map<String, Object> object = new HashMap<>();
      object.put("email", email);
      object.put("partnerName", user.getPartner().getName());
      object.put("userID", user.getId());
      object.put("firstName", user.getFirstName());
      object.put("lastName", user.getLastName());
      object.put("token", JwtUtil.generateToken(user.getEmail()));
      return object;
    } else {
      throw new IllegalStateException("User not found");
    }
  }

  public Map<String, Object> loginAdminUser(String email, String password) {
    AdminUser user = checkIfValidAdminUser(email, password);
    if (user != null) {
      LoginEntry loginEntry = new LoginEntry(user);
      loginRepository.save(loginEntry);
      Map<String, Object> object = new HashMap<>();
      object.put("email", email);
      object.put("userID", user.getId());
      object.put("firstName", user.getFirstName());
      object.put("lastName", user.getLastName());
      object.put("token", JwtUtil.generateToken(user.getEmail()));
      return object;
    } else {
      throw new IllegalStateException("User not found");
    }
  }

  private BusinessUser checkIfValidBusinessUser(String email, String password) {
    boolean isValidEmail = emailValidator.test(email);
    if (!isValidEmail) {
      throw new IllegalStateException(INVALID_LOGIN_MSG);
    }
    BusinessUser user = businessUserRepository
        .findByEmail(email).orElseThrow(() -> new IllegalStateException(INVALID_LOGIN_MSG));
    if (bCryptPasswordEncoder.matches(password, user.getPassword()) && user.isEnabled()) {
      return user;
    } else {
      new IllegalStateException(INVALID_LOGIN_MSG);
      return null;
    }
  }

  private AdminUser checkIfValidAdminUser(String email, String password) {
    boolean isValidEmail = emailValidator.test(email);
    if (!isValidEmail) {
      throw new IllegalStateException(INVALID_LOGIN_MSG);
    }
    AdminUser user = adminUserRepository
        .findByEmail(email).orElseThrow(() -> new IllegalStateException(INVALID_LOGIN_MSG));
    if (bCryptPasswordEncoder.matches(password, user.getPassword()) && user.isEnabled()) {
      return user;
    } else {
      new IllegalStateException(INVALID_LOGIN_MSG);
      return null;
    }
  }
}
