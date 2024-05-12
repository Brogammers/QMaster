package com.que.que.Login;

import java.time.LocalDateTime;

import com.que.que.User.User;
import com.que.que.User.AppUser.AppUser;
import com.que.que.User.BusinessUser.BusinessUser;

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
  @JoinColumn(name = "app_user_id")
  private AppUser appUser;

  @ManyToOne
  @JoinColumn(name = "business_user_id")
  private BusinessUser businessUser;

  @Column(nullable = false)
  private final LocalDateTime loginDate;

  public LoginEntry(User appUser) {
    if (appUser instanceof BusinessUser)
      this.businessUser = (BusinessUser) appUser;
    else
      this.appUser = (AppUser) appUser;
    this.loginDate = LocalDateTime.now();
  }

  public User getAppUser() {
    if (this.appUser != null)
      return this.appUser;
    else
      return this.businessUser;
  }
}
