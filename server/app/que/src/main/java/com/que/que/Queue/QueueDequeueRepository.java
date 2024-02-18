package com.que.que.Queue;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.que.que.User.AppUser;

@Repository
public interface QueueDequeueRepository extends JpaRepository<QueueDequeue, Long> {
  Page<QueueDequeue> findByAppUser(AppUser appUser, Pageable page);
}
