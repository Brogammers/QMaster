package com.que.que.Store;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import com.que.que.User.BusinessUser.BusinessUserRepository;

import lombok.AllArgsConstructor;

@Service
@Configuration
@AllArgsConstructor
public class StoreService {
    private final StoreRepository storeRepository;
    private final BusinessUserRepository businessUserRepository;

    public Store createStore(long businessUserId, String name, String description, String location) {
        // TODO: Add validation
        var businessUser = businessUserRepository.findById(businessUserId)
                .orElseThrow(() -> new IllegalStateException("Business user with id " + businessUserId + " not found"));

        return storeRepository.save(
                new Store(
                        name,
                        location,
                        description,
                        businessUser));
    }
}
