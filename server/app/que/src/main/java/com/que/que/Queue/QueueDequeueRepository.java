package com.que.que.Queue;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.que.que.User.AppUser;

@Repository
public interface QueueDequeueRepository extends JpaRepository<QueueDequeue, Long> {
    Optional<QueueDequeue> findByAppUser(AppUser appUser);
}
