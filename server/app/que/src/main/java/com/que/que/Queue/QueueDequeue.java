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
public class QueueDequeue {
    @Id
    @SequenceGenerator(name = "queue_dequeue_sequence", sequenceName = "queue_dequeue_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "queue_dequeue_sequence")
    private Long id;
    @ManyToOne
    @JoinColumn(nullable = false, name = "app_user_id")
    private final AppUser appUser;
    @Column(nullable = false)
    private final LocalDate actionDate;

    public QueueDequeue(AppUser appUser) {
        this.appUser = appUser;
        this.actionDate = LocalDate.now();
    }
}
