package com.que.que.Login;

import org.springframework.stereotype.Service;
import com.que.que.User.AppUserRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LoginService {
  private final AppUserRepository appUserRepository;

  private boolean checkIfValidUser(String email, String password) {
    // TODO
    return false;
  }

  public String loginUser(String email, String password) {
    // TODO
    return null;
  }
}
