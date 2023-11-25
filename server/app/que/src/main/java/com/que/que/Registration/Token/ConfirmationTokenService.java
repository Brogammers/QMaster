package com.que.que.Registration.Token;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {
  private final ConfirmationTokenRepository confirmationTokenRepository;

  public void saveConfirmationToken(ConfirmationToken confirmationToken) {
    confirmationTokenRepository.save(confirmationToken);
  }
}
