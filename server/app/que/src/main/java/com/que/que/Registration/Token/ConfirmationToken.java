package com.que.que.Registration.Token;

import java.time.LocalDateTime;

import com.que.que.User.User;
import com.que.que.User.AppUser.AppUser;
import com.que.que.User.BusinessUser.BusinessUser;

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
  private LocalDateTime createdAt;
  @Column(nullable = false)
  private LocalDateTime expiresAt;
  private LocalDateTime confirmedAt;

  @ManyToOne
  @JoinColumn(name = "app_user_id")
  private AppUser appUser;

  @ManyToOne
  @JoinColumn(name = "business_user_id")
  private BusinessUser businessUser;

  public ConfirmationToken(String token, LocalDateTime createdAt, LocalDateTime expiredAt, LocalDateTime confirmedAt,
      User appUser) {
    this.token = token;
    this.createdAt = createdAt;
    this.expiresAt = expiredAt;
    this.confirmedAt = confirmedAt;
    if (appUser instanceof BusinessUser)
      this.businessUser = (BusinessUser) appUser;
    else
      this.appUser = (AppUser) appUser;
  }

  public String toString() {
    return this.token;
  }
}
