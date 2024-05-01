package com.que.que.Queue;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.que.que.User.AppUser.AppUser;

import java.util.ArrayList;
import java.time.LocalDateTime;

@Repository
public interface QueueDequeueRepository extends JpaRepository<QueueDequeue, Long> {
  Page<QueueDequeue> findByAppUser(AppUser appUser, Pageable page);

  ArrayList<QueueDequeue> findByActionDateBetweenAndQueueAndQueueDequeueStatus(LocalDateTime from, LocalDateTime to,
      Queues queue, QueueDequeueStatus queueDequeueStatus);
}
