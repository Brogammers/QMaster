package com.que.que.Queue;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.que.que.Location.Location;
import com.que.que.Partner.Partner;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@JsonSerialize(using = QueuesSerialier.class)
public class Queues {
    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToOne
    @JoinColumn(nullable = false, name = "partner_id")
    private Partner partner;

    @Column(nullable = false)
    private int queueSlot;

    @Column(nullable = false)
    private int specificSlot;

    @Column(nullable = false)
    private int peopleInQueue;

    private int averageServiceTime;
    private int rating;
    private int maxQueueSize = 100;
    private boolean isActive = true;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @ManyToMany
    private Set<QueueCounter> queueCounters = new HashSet<>();

    public Queues(String name, Partner partner, int queueSlot, int specificSlot, Location location,
            int averageServiceTime, boolean isActive) {
        this.name = name;
        this.partner = partner;
        this.queueSlot = queueSlot;
        this.specificSlot = specificSlot;
        this.peopleInQueue = 0;
        this.rating = -1; // -1 if there are no ratings yet
        this.location = location;
        this.averageServiceTime = averageServiceTime;
        this.isActive = isActive;
    }

    public Queues(String name, Partner partner, int queueSlot, int specificSlot, int maxQueueSize,
            Location location,
            int averageServiceTime, boolean isActive) {
        this.name = name;
        this.partner = partner;
        this.queueSlot = queueSlot;
        this.specificSlot = specificSlot;
        this.peopleInQueue = 0;
        this.rating = -1; // -1 if there are no ratings yet
        this.maxQueueSize = maxQueueSize;
        this.location = location;
        this.averageServiceTime = averageServiceTime;
        this.isActive = isActive;
    }
}
