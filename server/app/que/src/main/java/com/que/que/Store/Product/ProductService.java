package com.que.que.Store.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.que.que.Store.Store;
import com.que.que.Store.StoreRepository;
import com.que.que.User.User;
import com.que.que.User.UserRepository;
import com.que.que.User.BusinessUser.BusinessUser;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;
    private final UserRepository userRepository;

    public Page<Product> getProductsByStoreName(String storeName, int pageNumber, int perPage) {
        User businessUser = userRepository.findByUsername(storeName)
                .orElseThrow(() -> new IllegalStateException("Business not found"));
        if (!(businessUser instanceof BusinessUser)) {
            throw new IllegalStateException("User is not a business");
        }
        Store store = storeRepository.findByBusinessUserId(businessUser.getId())
                .orElseThrow(() -> new IllegalStateException("Store not found"));

        Pageable page = PageRequest.of(pageNumber - 1, perPage);
        return productRepository.findByStoreId(store.getId(), page);
    }

    public Product createProduct(String name, String description, double price, int quantity, String storeName) {
        User businessUser = userRepository.findByUsername(storeName)
                .orElseThrow(() -> new IllegalStateException("Business not found"));
        if (!(businessUser instanceof BusinessUser)) {
            throw new IllegalStateException("User is not a business");
        }
        Store store = storeRepository.findByBusinessUserId(businessUser.getId())
                .orElseThrow(() -> new IllegalStateException("Store not found"));

        Product product = new Product(name, description, price, quantity, store);
        productRepository.save(product);

        return product;
    }
}
