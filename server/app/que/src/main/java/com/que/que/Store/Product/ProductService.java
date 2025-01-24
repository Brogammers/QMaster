package com.que.que.Store.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.que.que.Location.Location;
import com.que.que.Location.LocationRepository;
import com.que.que.Store.Store;
import com.que.que.Store.StoreRepository;
import com.que.que.User.User;
import com.que.que.User.UserRepository;
import com.que.que.User.BusinessUser.BusinessUser;
import com.que.que.User.BusinessUser.BusinessUserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;
    private final UserRepository userRepository;
    private final BusinessUserRepository businessUserRepository;
    private final LocationRepository locationRepository;

    public Page<Product> getProductsByStoreName(String storeName, int pageNumber, int perPage, String email,
            long locationId) {
        if (storeName == null && email.isBlank()) {
            throw new IllegalStateException("Store name or email must be provided");
        }

        User businessUser;
        if (storeName != null) {
            businessUser = userRepository.findByUsername(storeName)
                    .orElseThrow(() -> new IllegalStateException("Business not found"));
        } else {
            businessUser = businessUserRepository.findByEmail(email)
                    .orElseThrow(() -> new IllegalStateException("Business not found"));
        }

        if (!(businessUser instanceof BusinessUser)) {
            throw new IllegalStateException("User is not a business");
        }

        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new IllegalStateException("Location not found"));

        if (location.getBusinessUser().getId() != businessUser.getId()) {
            throw new IllegalStateException("Location does not belong to business user");
        }

        Store store = storeRepository.findByLocationId(locationId)
                .orElseThrow(() -> new IllegalStateException("Store not found"));

        Pageable page = PageRequest.of(pageNumber - 1, perPage);
        return productRepository.findByStoreId(store.getId(), page);
    }

    public Product createProduct(String name, String description, double price, int quantity, String email,
            String type, long locationId) {
        BusinessUser businessUser = businessUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Business not found"));
        Store store = storeRepository.findByLocationId(locationId)
                .orElseThrow(() -> new IllegalStateException("Store not found"));
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new IllegalStateException("Location not found"));

        if (location.getBusinessUser().getId() != businessUser.getId()) {
            throw new IllegalStateException("Location does not belong to business user");
        }

        ProductType productType = ProductType.valueOf(type);
        Product product = new Product(name, description, price, quantity, store, productType);
        productRepository.save(product);

        return product;
    }

    public void deleteProduct(long productId, String email, long locationId) {
        BusinessUser businessUser = businessUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Business not found"));
        Store store = storeRepository.findByLocationId(locationId)
                .orElseThrow(() -> new IllegalStateException("Store not found"));
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new IllegalStateException("Location not found"));

        if (location.getBusinessUser().getId() != businessUser.getId()) {
            throw new IllegalStateException("Location does not belong to business user");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalStateException("Product not found"));

        if (product.getStore().getId() != store.getId()) {
            throw new IllegalStateException("Product not found");
        }

        productRepository.delete(product);
    }
}
