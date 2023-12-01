package com.que.que.Registration.Token;

import java.time.LocalDate;

import com.que.que.User.AppUser;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class ConfirmationToken {
  @Id
  @SequenceGenerator(name = "confirmation_token_sequence", sequenceName = "confirmation_token_sequence", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "confirmation_token_sequence")
  private Long id;
  @Column(nullable = false)
  private String token;
  @Column(nullable = false)
  private LocalDate createdAt;
  @Column(nullable = false)
  private LocalDate expiresAt;
  private LocalDate confirmedAt;

  @ManyToOne
  @JoinColumn(nullable = false, name = "app_user_id")
  private AppUser appUser;

  public ConfirmationToken(String token, LocalDate createdAt, LocalDate expiredAt, LocalDate confirmedAt,
      AppUser appUser) {
    this.token = token;
    this.createdAt = createdAt;
    this.expiresAt = expiredAt;
    this.confirmedAt = confirmedAt;
    this.appUser = appUser;
  }
}
