package com.que.que.User.BusinessUser;

import java.util.HashSet;
import java.util.Set;

import com.que.que.Store.Store;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class OpeningHours {

    @Id
    @SequenceGenerator(name = "opening_hours_generator_sequence", sequenceName = "opening_hours_generator_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "opening_hours_generator_sequence")
    private Long id;

    @Column(nullable = false)
    private String day;

    @Column(nullable = false)
    private String openTime;

    @Column(nullable = false)
    private String closeTime;

    @ManyToMany
    private Set<Store> store = new HashSet<>();

    public OpeningHours(String day, String openTime, String closeTime) {
        this.day = day;
        this.openTime = openTime;
        this.closeTime = closeTime;
    }

    public void addStore(Store store) {
        this.store.add(store);
    }
}
