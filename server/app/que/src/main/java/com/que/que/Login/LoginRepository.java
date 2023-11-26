package com.que.que.Login;

import java.util.Optional;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface LoginRepository extends JpaRepository<LoginEntry, Long> {
  Optional<LoginEntry> findByEmail(String email);
}
