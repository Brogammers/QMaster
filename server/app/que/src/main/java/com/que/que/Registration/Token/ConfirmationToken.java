package com.que.que.Registration.Token;

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
  private LocalDateTime createdAt;
  @Column(nullable = false)
  private LocalDateTime expiresAt;
  private LocalDateTime confirmedAt;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User appUser;

  public ConfirmationToken(String token, LocalDateTime createdAt, LocalDateTime expiredAt, LocalDateTime confirmedAt,
      User appUser) {
    this.token = token;
    this.createdAt = createdAt;
    this.expiresAt = expiredAt;
    this.confirmedAt = confirmedAt;
    this.appUser = appUser;
  }

  public String toString() {
    return this.token;
  }

  public User getAppUser() {
    return this.appUser;
  }
}
