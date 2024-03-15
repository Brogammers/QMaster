package com.que.que.Queue;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.que.que.User.AppUser;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
public class Queues {
    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;
    @Column(nullable = false, unique = true)
    private String name;
    @ManyToOne
    @JoinColumn(nullable = false, name = "app_user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AppUser creator;
    @Column(nullable = false)
    private int queueSlot;
    @Column(nullable = false)
    private int specificSlot;
    @Column(nullable = false)
    private int peopleInQueue;
    private int rating;

    public Queues(String name, AppUser creator, int queueSlot, int specificSlot) {
        this.name = name;
        this.creator = creator;
        this.queueSlot = queueSlot;
        this.specificSlot = specificSlot;
        this.peopleInQueue = 0;
        this.rating = -1; // -1 if there are no ratings yet
    }

}
