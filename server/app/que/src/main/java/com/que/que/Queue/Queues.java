package com.que.que.Queue;

import com.que.que.User.AppUser;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Queues {
    @Id
    @Column(nullable = false, unique = true)
    private final String name;
    @ManyToOne
    @JoinColumn(nullable = false, name = "app_user_id")
    private final AppUser appUser;
    @Column(nullable = false)
    private final int queueSlot;
    @Column(nullable = false)
    private final int specificSlot;

    public Queues(AppUser appUser, String name, int queueSlot, int specificSlot) {
        this.appUser = appUser;
        this.name = name;
        this.queueSlot = queueSlot;
        this.specificSlot = specificSlot;
    }
}
