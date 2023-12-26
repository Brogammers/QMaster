package com.que.que.Queue;

import java.time.LocalDateTime;

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
public class QueueDeletion {
    @Id
    @SequenceGenerator(name = "queue_deletion_sequence", sequenceName = "queue_deletion_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "queue_deletion_sequence")
    private Long id;
    @ManyToOne
    @JoinColumn(nullable = false, name = "app_user_id")
    private final AppUser appUser;
    @Column(nullable = false)
    private final LocalDateTime actionDate;

    public QueueDeletion(AppUser appUser) {
        this.appUser = appUser;
        this.actionDate = LocalDateTime.now();
    }
}
