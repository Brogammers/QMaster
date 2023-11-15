package com.que.que.User;

import java.util.Optional;

import org.springframework.stereotype.Repository;

@Repository
@org.springframework.transaction.annotation.Transactional(readOnly = true)
public interface AppUserRepository {
  Optional<AppUser> findByEmail(String email);
}
