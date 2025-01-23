package com.que.que.Queue;

import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.que.que.Location.Location;
import com.que.que.User.BusinessUser.BusinessUser;

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
    @JoinColumn(nullable = false, name = "business_user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BusinessUser creator;
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

    public Queues(String name, BusinessUser creator, int queueSlot, int specificSlot, Location location,
            int averageServiceTime, boolean isActive) {
        this.name = name;
        this.creator = creator;
        this.queueSlot = queueSlot;
        this.specificSlot = specificSlot;
        this.peopleInQueue = 0;
        this.rating = -1; // -1 if there are no ratings yet
        this.location = location;
        this.averageServiceTime = averageServiceTime;
        this.isActive = isActive;
    }

    public Queues(String name, BusinessUser creator, int queueSlot, int specificSlot, int maxQueueSize,
            Location location,
            int averageServiceTime, boolean isActive) {
        this.name = name;
        this.creator = creator;
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
