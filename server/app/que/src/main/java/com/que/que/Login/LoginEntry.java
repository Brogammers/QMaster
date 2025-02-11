package com.que.que.Login;

import java.time.LocalDateTime;

import com.que.que.User.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class LoginEntry {

  @Id
  @SequenceGenerator(name = "login_entry_sequence", sequenceName = "login_entry_sequence", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "login_entry_sequence")
  private Long id;
  @ManyToOne
  @JoinColumn(name = "user_id")
  private User appUser;

  @Column(nullable = false)
  private final LocalDateTime loginDate;

  public LoginEntry(User appUser) {
    this.appUser = appUser;
    this.loginDate = LocalDateTime.now();
  }

  public User getAppUser() {
    return this.appUser;
  }
}
