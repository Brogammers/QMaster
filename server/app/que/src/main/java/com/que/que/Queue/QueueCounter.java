package com.que.que.Queue;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class QueueCounter {

    @Id
    @SequenceGenerator(name = "queue_counter_sequence", sequenceName = "queue_counter_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "queue_counter_sequence")
    private Long id;

    @ManyToMany
    private Set<Queues> queues = new HashSet<>();

    @OneToMany(mappedBy = "queueCounter")
    private List<QueueDequeue> queueDequeues;

    private String name;

    public QueueCounter(String name) {
        this.name = name;
    }

    public void addQueue(Queues queue) {
        queues.add(queue);
    }

    public void addDequeue(QueueDequeue queueDequeue) {
        queueDequeues.add(queueDequeue);
    }
}
