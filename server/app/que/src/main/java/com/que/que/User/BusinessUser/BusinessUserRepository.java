package com.que.que.User.BusinessUser;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@Repository
public interface BusinessUserRepository extends JpaRepository<BusinessUser, Long> {
    Optional<BusinessUser> findByEmail(String email);

    Optional<BusinessUser> findByUsername(String username);

    @Query("SELECT b FROM BusinessUser b JOIN b.businessCategories bc WHERE bc.id = :category")
    Page<BusinessUser> findAllByBusinessCategory(@Param("category") long category,
            Pageable pageable);
}
