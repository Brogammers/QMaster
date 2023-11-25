package com.que.que.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
  Optional<AppUser> findByEmail(String email);
}
