package com.que.que.Registration.Token;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {
  private final ConfirmationTokenRepository confirmationTokenRepository;

  public void saveConfirmationToken(ConfirmationToken confirmationToken) {
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
    confirmationToken.setConfirmedAt(LocalDate.now());
  }
}
