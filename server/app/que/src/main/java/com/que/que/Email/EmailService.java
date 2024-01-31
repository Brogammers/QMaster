package com.que.que.Email;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailService implements EmailSender {
  private final static Logger LOGGER = LoggerFactory.getLogger(EmailService.class);
  private final JavaMailSender mailSender;

  @Override
  @Async
  public void send(String to, String email, String subject, String[] text) {
    try {
      MimeMessage mimeMessage = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
      helper.setTo(to);
      helper.setSubject(subject);
      helper.setFrom("fam@awadlouis.com");
      String htmlContent = "";
      StringBuilder contentBuilder = new StringBuilder();
      try {
        BufferedReader in = new BufferedReader(new FileReader(email));
        String str;
        while ((str = in.readLine()) != null) {
          contentBuilder.append(str);
        }
        in.close();
      } catch (IOException e) {
        System.err.println("HTML File Read Error: " + e.getMessage());
      }
      htmlContent = contentBuilder.toString();
      for (String t : text) {
      }
      mimeMessage.setContent(htmlContent, "text/html");
      mailSender.send(mimeMessage);
    } catch (MessagingException e) {
      LOGGER.error("Failed to send email", e);
      throw new IllegalStateException("Failed to send email");
    }
  }
}
