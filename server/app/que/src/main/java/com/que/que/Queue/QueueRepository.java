package com.que.que.Queue;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueueRepository extends JpaRepository<Queues, Long> {
    Optional<Queues> findByName(String name);

    List<Queues> findByNameContaining(String name);
}
