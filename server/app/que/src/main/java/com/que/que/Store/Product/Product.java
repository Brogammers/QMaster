package com.que.que.Store.Product;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.que.que.Store.Store;
import com.que.que.Store.Purchase.Purchase;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@JsonSerialize(using = ProductSerializer.class)
public class Product {

    @Id
    @SequenceGenerator(name = "product_sequence", sequenceName = "product_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_sequence")
    private Long id;

    @Column(nullable = false)
    private String name;
    private String description;
    @Column(nullable = false)
    private double price;
    @Column(nullable = false)
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @ManyToMany
    private Set<Purchase> purchases = new HashSet<>();

    private ProductType type;

    public Product(String name, double price, int quantity, Store store, ProductType type) {
        this.name = name;
        this.description = "";
        this.price = price;
        this.quantity = quantity;
        this.store = store;
        this.type = type;
    }

    public Product(String name, String description, double price, int quantity, Store store, ProductType type) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.store = store;
        this.type = type;
    }

    public void addPurchase(Purchase purchase) {
        this.purchases.add(purchase);
    }
}
