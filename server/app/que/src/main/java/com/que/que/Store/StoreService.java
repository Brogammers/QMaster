package com.que.que.Store;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.que.que.Location.Location;
import com.que.que.Location.LocationRepository;
import com.que.que.Partner.Partner;
import com.que.que.Partner.PartnerRepository;
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
    private final PartnerRepository partnerRepository;
    private final LocationRepository locationRepository;

    private Location getAndCheckLocation(long partnerId, long locationId) {
        Partner partner = partnerRepository.findById(partnerId)
                .orElseThrow(() -> new IllegalStateException("Business user not found"));

        Location location = locationRepository.findByIdAndPartner(locationId, partner)
                .orElseThrow(() -> new IllegalStateException("Location not found"));

        return location;
    }

    public void requestStore(String email, DocumentRequest[] documents, long locationId) {
        BusinessUser user = businessUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Business not found"));

        Location location = getAndCheckLocation(user.getPartner().getId(), locationId);

        if (location.getStoreStatus() != StoreStatus.NOT_REQUESTED) {
            throw new IllegalStateException("Invalid store status");
        }

        location.setStoreStatus(StoreStatus.PENDING);
        locationRepository.save(location);
    }

    public List<Location> getPendingStores() {
        return locationRepository.findByStoreStatus(StoreStatus.PENDING);
    }

    public Store createStore(long businessUserId, long locationId) {
        BusinessUser user = businessUserRepository.findById(businessUserId)
                .orElseThrow(() -> new IllegalStateException("Business user not found"));
        Location location = getAndCheckLocation(user.getPartner().getId(), locationId);

        // Check that there isnt a store already for this user
        boolean check = storeRepository.findByLocationId(location.getId())
                .isEmpty();
        if (!check) {
            throw new IllegalStateException("Store already exists");
        }

        Store store = new Store(location);
        storeRepository.save(store);
        return store;
    }

    private Store createStore(long locationId) {
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new IllegalStateException("Location not found"));

        // Check that there isnt a store already for this user
        boolean check = storeRepository.findByLocationId(location.getId())
                .isEmpty();
        if (!check) {
            throw new IllegalStateException("Store already exists");
        }

        Store store = new Store(location);
        storeRepository.save(store);
        return store;
    }

    public Store approveStore(long locationId) {
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new IllegalStateException("Location not found"));

        if (location.getStoreStatus() != StoreStatus.PENDING) {
            throw new IllegalStateException("Invalid store status");
        }

        location.setStoreStatus(StoreStatus.SETUP_PENDING);
        locationRepository.save(location);
        return createStore(locationId);
    }

    public boolean hasStore(String businessName, long locationId) {
        Partner partner = partnerRepository.findByName(businessName)
                .orElseThrow(() -> new IllegalStateException("Partner not found"));

        Location location = getAndCheckLocation(partner.getId(), locationId);

        Store store = storeRepository.findByLocationId(location.getId())
                .orElse(null);
        return store != null && location.getStoreStatus() == StoreStatus.SETUP_COMPLETE;
    }

    public StoreStatus getStoreStatus(String email, long locationId) {
        BusinessUser user = businessUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Business not found"));

        Location location = getAndCheckLocation(user.getPartner().getId(), locationId);

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

        Location location = getAndCheckLocation(user.getPartner().getId(), locationId);

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

    public Page<Store> getStores(int page, int perPage) {
        return storeRepository.findAll(PageRequest.of(page - 1, perPage));
    }
}
