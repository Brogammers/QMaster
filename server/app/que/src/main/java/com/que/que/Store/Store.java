package com.que.que.Store;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.que.que.Location.Location;
import com.que.que.Store.Product.Product;
import com.que.que.Store.Purchase.Purchase;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@JsonSerialize(using = StoreSerializer.class)
public class Store {
    @Id
    @SequenceGenerator(name = "store_sequence", sequenceName = "store_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "store_sequence")
    private Long id;

    @OneToMany(mappedBy = "store")
    private List<Product> products = new ArrayList<>();

    @OneToOne()
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;

    @OneToMany(mappedBy = "store")
    private List<Purchase> purchases = new ArrayList<>();

    private String accountName;
    private String iban;
    private String bank;

    public Store(Location location) {
        this.location = location;
    }

    public void addProduct(Product product) {
        this.products.add(product);
    }

    public void addPurchase(Purchase purchase) {
        this.purchases.add(purchase);
    }
}
