package com.que.que.Queue;

import java.time.LocalDateTime;

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
public class QueueCreation {
    @Id
    @SequenceGenerator(name = "queue_creation_sequence", sequenceName = "queue_creation_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "queue_creation_sequence")
    private Long id;
    @ManyToOne
    @JoinColumn(nullable = false, name = "queue_id")
    private final Queues queue;
    @Column(nullable = false)
    private final LocalDateTime actionDate;

    public QueueCreation(Queues queue) {
        this.queue = queue;
        this.actionDate = LocalDateTime.now();
    }
}
