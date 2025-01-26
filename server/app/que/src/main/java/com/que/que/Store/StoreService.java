package com.que.que.Store;

import java.util.List;

import org.springframework.stereotype.Service;

import com.que.que.Location.Location;
import com.que.que.Location.LocationRepository;
import com.que.que.Store.Product.Product;
import com.que.que.Store.Product.ProductCreationRequest;
import com.que.que.Store.Product.ProductRepository;
import com.que.que.Store.Product.ProductType;
import com.que.que.User.BusinessUser.BusinessUser;
import com.que.que.User.BusinessUser.BusinessUserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StoreService {
    private final StoreRepository storeRepository;
    private final BusinessUserRepository businessUserRepository;
    private final ProductRepository repository;
    private final LocationRepository locationRepository;

    private Location getAndCheckLocation(long businessUserId, long locationId) {
        BusinessUser businessUser = businessUserRepository.findById(businessUserId)
                .orElseThrow(() -> new IllegalStateException("Business user not found"));

        Location location = locationRepository.findByIdAndBusinessUser(locationId, businessUser)
                .orElseThrow(() -> new IllegalStateException("Location not found"));

       
        return location;
    }

    public Store createStore(long businessUserId, long locationId) {

        Location location = getAndCheckLocation(businessUserId, locationId);

        Store store = new Store(location);
        storeRepository.save(store);
        return store;
    }

    public boolean hasStore(String businessName, long locationId) {
        BusinessUser user = businessUserRepository.findByUsername(businessName)
                .orElseThrow(() -> new IllegalStateException("Business not found"));

        Location location = getAndCheckLocation(user.getId(), locationId);

        Store store = storeRepository.findByLocationId(location.getId())
                .orElseThrow(() -> new IllegalStateException("Store not found"));
        return store != null && location.getStoreStatus() == StoreStatus.SETUP_COMPLETE;
    }

    public StoreStatus getStoreStatus(String email, long locationId) {
        BusinessUser user = businessUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Business not found"));

        Location location = getAndCheckLocation(user.getId(), locationId);

        storeRepository.findByLocationId(location.getId())
                .orElseThrow(() -> new IllegalStateException("Store not found"));

        return location.getStoreStatus();
    }

    public void setupStore(
            String email,
            List<ProductCreationRequest> products,
            String accountName,
            String iban,
            String bank,
            long locationId) {
        BusinessUser user = businessUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Business not found"));

        Location location = getAndCheckLocation(user.getId(), locationId);

        Store store = storeRepository.findByLocationId(location.getId())
                .orElseThrow(() -> new IllegalStateException("Store not found"));

        if (location.getStoreStatus() != StoreStatus.SETUP_PENDING) {
            throw new IllegalStateException("Invalid store status");
        }

        store.setAccountName(accountName);
        store.setIban(iban);
        store.setBank(bank);

        for (ProductCreationRequest productRequest : products) {
            ProductType type = ProductType.valueOf(productRequest.getType());
            Product product = new Product(productRequest.getName(), productRequest.getDescription(),
                    productRequest.getPrice(), productRequest.getQuantity(), store, type);
            repository.save(product);

            store.addProduct(product);
        }

        location.setStoreStatus(StoreStatus.SETUP_COMPLETE);
        locationRepository.save(location);
        storeRepository.save(store);
    }
}
