package com.que.que.Store;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.que.que.User.BusinessUser.BusinessUser;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    List<Store> findAllByBusinessUser(BusinessUser businessUser);
}
