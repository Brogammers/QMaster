package com.que.que.Partner;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.que.que.User.BusinessUser.BusinessCategory;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Long> {
    Optional<Partner> findByName(String name);

    Page<Partner> findByBusinessCategory(BusinessCategory businessCategory, Pageable page);
}
