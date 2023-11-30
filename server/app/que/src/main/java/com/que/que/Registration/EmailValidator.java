package com.que.que.Registration;

import java.util.function.Predicate;
import org.springframework.stereotype.Service;

@Service
public class EmailValidator implements Predicate<String> {

  @Override
  public boolean test(String s) {
    if (
      s.charAt(0) == '@' || s.length() <= 5 || s.charAt(0) == '.'
    ) return false;
    if (!s.contains("@") || !s.contains(".com")) return false;
    if (
      s.indexOf("@") > s.indexOf(".com") ||
      Math.abs(s.indexOf("@") - s.indexOf(".com")) == 1
    ) return false;
    return true;
  }
}
