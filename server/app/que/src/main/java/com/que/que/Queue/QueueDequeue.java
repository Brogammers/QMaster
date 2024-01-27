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
public class QueueDequeue {
    @Id
    @SequenceGenerator(name = "queue_dequeue_sequence", sequenceName = "queue_dequeue_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "queue_dequeue_sequence")
    private Long id;
    @ManyToOne
    @JoinColumn(nullable = false, name = "app_user_id")
    private final AppUser appUser;
    @ManyToOne
    @JoinColumn(nullable = false, name = "queue_id")
    private final Queues queue;
    @Column(nullable = false)
    private final LocalDateTime actionDate;

    public QueueDequeue(AppUser appUser, Queues queue) {
        this.appUser = appUser;
        this.queue = queue;
        this.actionDate = LocalDateTime.now();
    }
}
