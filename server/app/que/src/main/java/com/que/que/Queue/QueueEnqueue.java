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
import lombok.Setter;

@Entity
@Setter
@Getter
@JsonSerialize(using = QueueEnqueueSerializer.class)
public class QueueEnqueue {

    @Id
    @SequenceGenerator(name = "queue_enequeue_sequence", sequenceName = "queue_enequeue_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "queue_enequeue_sequence")
    private Long id;
    @ManyToOne
    @JoinColumn(nullable = false, name = "app_user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private final AppUser appUser;
    @ManyToOne
    @JoinColumn(nullable = false, name = "queue_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private final Queues queue;
    @Column(nullable = false)
    private final LocalDateTime actionDate;
    private QueueEnqueueStatus queueEnqueueStatus;
    private String comment;

    public QueueEnqueue(AppUser appUser, Queues queue, QueueEnqueueStatus queueEnqueueStatus, String comment) {
        this.appUser = appUser;
        this.queue = queue;
        this.actionDate = LocalDateTime.now();
        this.queueEnqueueStatus = queueEnqueueStatus;
        this.comment = comment;
    }

    public QueueEnqueue(AppUser appUser, Queues queue, QueueEnqueueStatus queueEnqueueStatus) {
        this.appUser = appUser;
        this.queue = queue;
        this.actionDate = LocalDateTime.now();
        this.queueEnqueueStatus = queueEnqueueStatus;
        this.comment = "";
    }

    public QueueEnqueue() {
        this(null, null, null);
    }
}
