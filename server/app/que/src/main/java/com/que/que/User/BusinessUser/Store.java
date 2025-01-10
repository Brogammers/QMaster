package com.que.que.User.BusinessUser;

import java.util.List;

import com.que.que.Queue.Queues;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
    @SequenceGenerator(name = "store_generator", sequenceName = "store_generator_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "store_generator_sequence")
    private Long id;

    @Column(nullable = false)
    private String name;
    private String description;

    @Column(nullable = false)
    private String location;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "store")
    private List<OpeningHours> openingHours;

    @ManyToOne(optional = false)
    @JoinColumn(name = "business_user_id")
    private BusinessUser businessUser;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "store")
    private List<Queues> queues;

    public Store(String name, String location) {
        this.name = name;
        this.location = location;
        this.description = "";
    }

    public Store(String name, String location, String description) {
        this.name = name;
        this.location = location;
        this.description = description;
    }

    public void addOpeningHours(OpeningHours openingHours) {
        this.openingHours.add(openingHours);
    }

    public void addQueue(Queues queue) {
        this.queues.add(queue);
    }
}
