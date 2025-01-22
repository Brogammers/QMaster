package com.que.que.Store;

import org.springframework.stereotype.Service;

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
}
