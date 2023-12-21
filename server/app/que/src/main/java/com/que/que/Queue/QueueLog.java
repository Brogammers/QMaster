package com.que.que.Queue;

import java.time.LocalDate;

import com.que.que.User.AppUser;

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

@Entity
@Setter
@Getter
public class QueueLog {
    @Id
    @SequenceGenerator(name = "login_entry_sequence", sequenceName = "login_entry_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "login_entry_sequence")
    private Long id;
    @ManyToOne
    @JoinColumn(nullable = false, name = "app_user_id")
    private final AppUser appUser;
    @Column(nullable = false)
    private final LocalDate actionDate;
    @Column(nullable = false)
    private final Byte actionType; // 0 = queue creation, 1 = queue enqueuing, 2 = queue dequeuing

    public QueueLog(AppUser appUser, Byte actionType) {
        this.appUser = appUser;
        this.actionDate = LocalDate.now();
        this.actionType = actionType;
    }
}
