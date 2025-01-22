package com.que.que.Location;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.que.que.User.BusinessUser.BusinessUser;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    List<Location> findAllByBusinessUser(BusinessUser businessUser);
}
