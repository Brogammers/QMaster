package com.que.que.Location;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.que.que.Location.OpeningHours.OpeningHours;
import com.que.que.Partner.Partner;
import com.que.que.Queue.Queues;
import com.que.que.Store.Store;
import com.que.que.Store.StoreStatus;
import com.que.que.Store.Purchase.Purchase;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@JsonSerialize(using = LocationSerializer.class)
public class Location {

    @Id
    @SequenceGenerator(name = "location_generator_sequence", sequenceName = "loocation_generator_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "location_generator_sequence")
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

    @OneToMany(mappedBy = "location")
    private List<OpeningHours> openingHourss = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "partner_id", referencedColumnName = "id")
    private Partner partner;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "location")
    @JsonIgnore
    private List<Queues> queues = new ArrayList<>();

    @OneToMany(mappedBy = "location")
    private List<Purchase> purchases = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "store_id", referencedColumnName = "id")
    private Store store = null;

    private StoreStatus storeStatus = StoreStatus.NOT_REQUESTED;

    public Location(String name, String address, double latitude, double longitude, Partner partner) {
        this.name = name;
        this.address = address;
        this.description = "";
        this.latitude = latitude;
        this.longitude = longitude;
        this.partner = partner;
    }

    public Location(String name, String address, String description, double latitude,
            double longitude, Partner partner) {
        this.name = name;
        this.address = address;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.partner = partner;
    }

    public void addOpeningHours(OpeningHours openingHours) {
        this.openingHourss.add(openingHours);
    }

    public void addQueue(Queues queue) {
        this.queues.add(queue);
    }

    public void addPurchase(Purchase purchase) {
        this.purchases.add(purchase);
    }
}
