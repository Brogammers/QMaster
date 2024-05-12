package com.que.que.User.BusinessUser;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.que.que.User.AppUser.AppUser;

@Transactional(readOnly = true)
@Repository
public interface BusinessUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmail(String email);
}
