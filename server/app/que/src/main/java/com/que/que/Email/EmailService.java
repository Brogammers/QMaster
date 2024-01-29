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
  public void send(String to, String email, String subject, String token) {
    String htmlConfirmBack = "><button class='button'>Activate Account</button></a><p>If you did not create an account with QMaster, please ignore this email.</p></div><!-- Footer --><div class='footer'><p>Best,</p><p>The QMaster Team</p></div></div></body></html>";
    String htmlConfirmFront = "<!DOCTYPE html><html><head><title>Activate Your QMaster Account</title><style>@import url('https://fonts.googleapis.com/css2?family=Inter&family=Jost&family=Istok+Web&display=swap');body {background-color: #17222D;color: #444;font-family: 'Inter', sans-serif;}.container {background-color: #D9D9D9;margin: 0 auto;width: 80%;}.header, .footer {background-color: #34F5C5;color: #17222D;padding: 10px;text-align: center;font-family: 'Jost', sans-serif;}.content {margin: 20px 0;padding: 20px;font-family: 'Istok Web', sans-serif;}.button {background-color: #1DCDFE;border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;}</style></head><body><div class='container'><!-- Header --><div class='header'><h1>Activate Your QMaster Account</h1></div><!-- Content --><div class='content'><p>Hello,</p><p>Thank you for signing up for QMaster. We're excited to have you on board. To get started, please activate your account by clicking the button below.</p><a href=";
    try {
      MimeMessage mimeMessage = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
      helper.setTo(to);
      helper.setSubject(subject);
      helper.setFrom("fam@awadlouis.com");
      String htmlContent = "";
      if (token.length() <= 0) {
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
      } else {
        String url = "http://localhost:8080/api/v1/registration/confirm?token=" + token;
        htmlContent = htmlConfirmFront + url + htmlConfirmBack;
      }
      mimeMessage.setContent(htmlContent, "text/html");
      String url = "http://localhost:8080/api/v1/registration/confirm?token=" + token;
      mailSender.send(mimeMessage);
    } catch (MessagingException e) {
      LOGGER.error("Failed to send email", e);
      throw new IllegalStateException("Failed to send email");
    }
  }
}
