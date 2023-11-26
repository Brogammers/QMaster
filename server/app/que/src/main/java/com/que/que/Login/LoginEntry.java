package com.que.que.Login;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
@Entity
public class LoginEntry {

  @Id
  @SequenceGenerator(name = "login_entry_sequence", sequenceName = "login_entry_sequence", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "login_entry_sequence")
  private Long id;
  @OneToOne
  @JoinColumn(nullable = false, name = "app_user_email")
  private String email;
  @Column(nullable = false)
  private String password;
}
