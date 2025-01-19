package com.que.que.Store;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import com.que.que.User.User;
import com.que.que.User.UserRepository;
import com.que.que.User.BusinessUser.BusinessUser;
import com.que.que.User.BusinessUser.BusinessUserRepository;

import lombok.AllArgsConstructor;

@Service
@Configuration
@AllArgsConstructor
public class StoreService {
    private final StoreRepository storeRepository;
    private final BusinessUserRepository businessUserRepository;
    private final UserRepository userRepository;

    public Store createStore(long businessUserId, String name, String description, String address, double latitude,
            double longitude) {
        // TODO: Add validation
        BusinessUser businessUser = businessUserRepository.findById(businessUserId)
                .orElseThrow(() -> new IllegalStateException("Business user with id " + businessUserId + " not found"));

        return storeRepository.save(
                new Store(
                        name,
                        address,
                        description,
                        businessUser,
                        longitude,
                        latitude));
    }

    public List<Store> getStoresByBusinessName(String businessName) {
        User businessUser = userRepository.findByUsername(businessName)
                .orElseThrow(() -> new IllegalStateException("Business with name " + businessName + " not found"));

        if (!(businessUser instanceof BusinessUser)) {
            throw new IllegalStateException("Business with name " + businessName + " not found");
        }
        List<Store> stores = storeRepository.findAllByBusinessUser((BusinessUser) businessUser);

        return stores;
    }
}
