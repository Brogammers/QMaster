package com.que.que.Queue;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.que.que.User.AppUser;

public interface QueueDeletionRepository extends JpaRepository<QueueDeletion, Long> {
}
