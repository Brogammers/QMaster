package com.que.que.Location;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.que.que.User.BusinessUser.BusinessUser;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    @Query("SELECT l FROM Location l JOIN l.businessUsers bu WHERE bu = ?1")
    List<Location> findByBusinessUser(BusinessUser businessUser);

    @Query("SELECT l FROM Location l JOIN l.businessUsers bu WHERE l.id = ?1 AND bu = ?2")
    Optional<Location> findByIdAndBusinessUser(long id, BusinessUser businessUser);
}
