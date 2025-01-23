package com.que.que.Store;

import java.util.List;

import org.springframework.stereotype.Service;

import com.que.que.Store.Product.Product;
import com.que.que.Store.Product.ProductRepository;
import com.que.que.Store.Product.ProductCreationRequest;
import com.que.que.Store.Product.ProductType;
import com.que.que.User.User;
import com.que.que.User.UserRepository;
import com.que.que.User.BusinessUser.BusinessUser;
import com.que.que.User.BusinessUser.BusinessUserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StoreService {
    private final StoreRepository storeRepository;
    private final BusinessUserRepository businessUserRepository;
    private final UserRepository userRepository;
    private final ProductRepository repository;

    public Store createStore(long businessUserId) {
        BusinessUser businessUser = businessUserRepository.findById(businessUserId)
                .orElseThrow(() -> new IllegalStateException("Business user not found"));
        Store store = new Store(businessUser);
        storeRepository.save(store);
        return store;
    }

    public boolean hasStore(String businessName) {
        User user = userRepository.findByUsername(businessName)
                .orElseThrow(() -> new IllegalStateException("Business not found"));

        if (!(user instanceof BusinessUser)) {
            throw new IllegalStateException("Business not found");
        }

        Store store = storeRepository.findByBusinessUserId(user.getId()).orElse(null);
        return store != null && ((BusinessUser) user).getStatus() == StoreStatus.SETUP_COMPLETE;
    }

    public StoreStatus getStoreStatus(String email) {
        BusinessUser user = businessUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Business not found"));

        storeRepository.findByBusinessUserId(user.getId())
                .orElseThrow(() -> new IllegalStateException("Store not found"));

        return user.getStatus();
    }

    public void setupStore(
            String email,
            List<ProductCreationRequest> products,
            String accountName,
            String iban,
            String bank) {
        BusinessUser user = businessUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Business not found"));

        Store store = storeRepository.findByBusinessUserId(user.getId())
                .orElseThrow(() -> new IllegalStateException("Store not found"));

        if (user.getStatus() != StoreStatus.SETUP_PENDING) {
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

        user.setStatus(StoreStatus.SETUP_COMPLETE);
        businessUserRepository.save(user);
        storeRepository.save(store);
    }
}
