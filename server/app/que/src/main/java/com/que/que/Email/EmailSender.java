package com.que.que.Email;

import java.util.Map;

public interface EmailSender {
  void send(String to, String email, String subject, Map<String, String> texts);
}
