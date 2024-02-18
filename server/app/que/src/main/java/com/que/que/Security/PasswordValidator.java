package com.que.que.Security;

public class PasswordValidator {

  public boolean test(String password) {
    // Check if the password is at least 8 characters long
    if (password.length() < 8) {
      return false;
    }

    // Check if the password contains at least one uppercase letter, one lowercase
    // letter, and one digit
    boolean hasUppercase = false;
    boolean hasLowercase = false;
    boolean hasDigit = false;

    for (char c : password.toCharArray()) {
      if (Character.isUpperCase(c)) {
        hasUppercase = true;
      } else if (Character.isLowerCase(c)) {
        hasLowercase = true;
      } else if (Character.isDigit(c)) {
        hasDigit = true;
      }

      // Break early if all criteria are met
      if (hasUppercase && hasLowercase && hasDigit) {
        break;
      }
    }

    // Return true if all criteria are met
    return hasUppercase && hasLowercase && hasDigit;
  }
}
