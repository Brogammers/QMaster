package com.que.que.User;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.que.que.Security.PasswordValidator;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final PasswordValidator passwordValidator;

    public String resetPassword(long userId, String password, String newPassword, String confirmPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with id " + userId + " not found"));
        if (bCryptPasswordEncoder.matches(password, user.getPassword()) && user.isEnabled()) {
            if (passwordValidator.test(newPassword)) {
                if (newPassword.equals(confirmPassword)) {
                    user.setPassword(bCryptPasswordEncoder.encode(newPassword));
                    userRepository.save(user);
                    return "Password reset successfully";
                } else {
                    throw new IllegalStateException("Passwords do not match");
                }
            } else {
                throw new IllegalStateException("Password does not meet requirements");
            }
        } else {
            throw new IllegalStateException("Password is incorrect");
        }
    }
}
