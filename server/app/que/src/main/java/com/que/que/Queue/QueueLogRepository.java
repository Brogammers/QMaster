package com.que.que.Queue;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.que.que.User.AppUser;

@Repository
public interface QueueLogRepository extends JpaRepository<QueueLog, Long> {
    Optional<QueueLog> findByAppUser(AppUser appUser);
}
