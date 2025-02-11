package com.que.que.Queue;

import java.time.LocalDateTime;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.que.que.User.AppUser.AppUser;

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

@Entity
@Setter
@Getter
@JsonSerialize(using = QueueDequeueSerializer.class)
@NoArgsConstructor
public class QueueDequeue {
    @Id
    @SequenceGenerator(name = "queue_dequeue_sequence", sequenceName = "queue_dequeue_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "queue_dequeue_sequence")
    private Long id;
    @ManyToOne
    @JoinColumn(nullable = false, name = "app_user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AppUser appUser;
    @ManyToOne
    @JoinColumn(nullable = false, name = "queue_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Queues queue;

    @ManyToOne
    @JoinColumn(name = "queue_counter_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private QueueCounter queueCounter;

    @Column(nullable = false)
    private LocalDateTime actionDate;
    private QueueDequeueStatus queueDequeueStatus;
    private String comment;

    public QueueDequeue(AppUser appUser, Queues queue, QueueDequeueStatus queueDequeueStatus,
            QueueCounter queueCounter) {
        this.appUser = appUser;
        this.queue = queue;
        this.queueDequeueStatus = queueDequeueStatus;
        this.comment = "";
        this.actionDate = LocalDateTime.now();
        this.queueCounter = queueCounter;
    }

    public QueueDequeue(AppUser appUser, Queues queue, QueueDequeueStatus queueDequeueStatus, String comment,
            QueueCounter queueCounter) {
        this.appUser = appUser;
        this.queue = queue;
        this.queueDequeueStatus = queueDequeueStatus;
        this.comment = comment;
        this.actionDate = LocalDateTime.now();
        this.queueCounter = queueCounter;
    }
}
