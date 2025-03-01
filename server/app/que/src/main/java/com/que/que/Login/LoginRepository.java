package com.que.que.Login;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.que.que.User.User;

@Repository
public interface LoginRepository extends JpaRepository<LoginEntry, Long> {
  Optional<LoginEntry> findByAppUser(User appUser);
}
