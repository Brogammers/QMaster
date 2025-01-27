package com.que.que.Location;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.que.que.Partner.Partner;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    List<Location> findByPartner(Partner partner);

    Optional<Location> findByIdAndPartner(Long id, Partner partner);
}
