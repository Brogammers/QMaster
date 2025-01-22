package com.que.que.Store.Purchase;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.que.que.Location.Location;
import com.que.que.Store.Store;
import com.que.que.Store.Product.Product;
import com.que.que.User.AppUser.AppUser;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Purchase {
    @Id
    @SequenceGenerator(name = "purchase_sequence", sequenceName = "purchase_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "purchase_sequence")
    private Long id;

    @ManyToMany
    private Set<Product> products = new HashSet<>();

    private double totalPrice;

    @ManyToOne
    @JoinColumn(name = "app_user_id", nullable = false)
    private AppUser user;

    @ManyToOne
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    public Purchase(double totalPrice, AppUser user, Store store, Location location) {
        this.totalPrice = totalPrice;
        this.user = user;
        this.store = store;
        this.location = location;
    }

    public Purchase(double totalPrice, AppUser user, Set<Product> products, Store store, Location location) {
        this.totalPrice = totalPrice;
        this.user = user;
        this.products = products;
        this.store = store;
        this.location = location;
    }

    public Purchase(double totalPrice, AppUser user, List<Product> products, Store store, Location location) {
        this.totalPrice = totalPrice;
        this.user = user;
        this.products.addAll(products);
        this.store = store;
        this.location = location;
    }

    public void addProduct(Product product) {
        this.products.add(product);
    }
}
