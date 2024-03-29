package com.que.que.Registration.Token;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {
  private final ConfirmationTokenRepository confirmationTokenRepository;

  public void saveConfirmationToken(@NonNull ConfirmationToken confirmationToken) {
    confirmationTokenRepository.save(confirmationToken);
  }

  public ConfirmationToken getToken(String token) {
    ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(token)
        .orElseThrow(() -> new IllegalStateException("Token not found"));

    return confirmationToken;
  }

  public void setConfirmedAt(String token) {
    ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(token)
        .orElseThrow(() -> new IllegalStateException("Token not found"));
    confirmationToken.setConfirmedAt(LocalDateTime.now());
  }
}
