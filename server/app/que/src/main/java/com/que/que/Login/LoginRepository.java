package com.que.que.Login;

import java.util.Optional;
import org.springframework.stereotype.Repository;

import com.que.que.User.AppUser.AppUser;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface LoginRepository extends JpaRepository<LoginEntry, Long> {
  Optional<LoginEntry> findByAppUser(AppUser appUser);
}
