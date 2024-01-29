package com.que.que.Email;

public interface EmailSender {
  void send(String to, String email, String subject, String token);
}
