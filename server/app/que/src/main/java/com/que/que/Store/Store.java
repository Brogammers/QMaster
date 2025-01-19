package com.que.que.Store;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.que.que.Queue.Queues;
import com.que.que.User.BusinessUser.BusinessUser;
import com.que.que.User.BusinessUser.OpeningHours;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Store {

    @Id
    @SequenceGenerator(name = "store_generator_sequence", sequenceName = "store_generator_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "store_generator_sequence")
    private Long id;

    @Column(nullable = false)
    private String name;
    private String description;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    @ManyToMany
    private Set<OpeningHours> openingHourss = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "business_user_id", nullable = false)
    private BusinessUser businessUser;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "store")
    private List<Queues> queues = new ArrayList<>();

    public Store(String name, String address, BusinessUser businessUser, double latitude, double longitude) {
        this.name = name;
        this.address = address;
        this.description = "";
        this.businessUser = businessUser;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Store(String name, String address, String description, BusinessUser businessUser, double latitude,
            double longitude) {
        this.name = name;
        this.address = address;
        this.description = description;
        this.businessUser = businessUser;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public void addOpeningHours(OpeningHours openingHours) {
        this.openingHourss.add(openingHours);
    }

    public void addQueue(Queues queue) {
        this.queues.add(queue);
    }
}
