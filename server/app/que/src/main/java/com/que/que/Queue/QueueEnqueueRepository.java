package com.que.que.Queue;

import org.springframework.data.domain.Pageable;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.que.que.User.AppUser.AppUser;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Repository
public interface QueueEnqueueRepository extends JpaRepository<QueueEnqueue, Long> {
    Page<QueueEnqueue> findByAppUser(AppUser appUser, Pageable page);

    Optional<QueueEnqueue> findByAppUserAndQueueAndQueueEnqueueStatus(AppUser appUser, Queues queue,
            QueueEnqueueStatus queueEnqueueStatus);

    ArrayList<QueueEnqueue> findByQueueAndQueueEnqueueStatus(Queues queue, QueueEnqueueStatus queueEnqueueStatus);

    ArrayList<QueueEnqueue> findByActionDateBetweenAndAppUserId(LocalDateTime from, LocalDateTime to, Long appUserId);
}
