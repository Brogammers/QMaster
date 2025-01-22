package com.que.que.Store;

import java.util.List;

import com.que.que.Store.Product.Product;
import com.que.que.Store.Purchase.Purchase;
import com.que.que.User.BusinessUser.BusinessUser;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Store {
    @Id
    @SequenceGenerator(name = "store_sequence", sequenceName = "store_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "store_sequence")
    private Long id;

    @OneToMany(mappedBy = "store")
    private List<Product> products;

    @OneToOne()
    @JoinColumn(name = "business_user_id", referencedColumnName = "id")
    private BusinessUser businessUser;

    @OneToMany(mappedBy = "store")
    private List<Purchase> purchases;

    public Store(BusinessUser businessUser) {
        this.businessUser = businessUser;
    }

    public void addProduct(Product product) {
        this.products.add(product);
    }

    public void addPurchase(Purchase purchase) {
        this.purchases.add(purchase);
    }
}
