package com.que.que.Queue;

import java.time.LocalDateTime;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

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
@JsonSerialize(using = QueueDeletionSerializer.class)
public class QueueDeletion {
    @Id
    @SequenceGenerator(name = "queue_deletion_sequence", sequenceName = "queue_deletion_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "queue_deletion_sequence")
    private Long id;
    @ManyToOne
    @JoinColumn(nullable = false, name = "queue_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private final Queues queue;
    @Column(nullable = false)
    private final LocalDateTime actionDate;

    public QueueDeletion(Queues queue) {
        this.queue = queue;
        this.actionDate = LocalDateTime.now();
    }
}
