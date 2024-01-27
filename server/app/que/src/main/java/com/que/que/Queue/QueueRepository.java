package com.que.que.Queue;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface QueueRepository extends JpaRepository<Queues, String> {
    Optional<Queues> finyByName(String name);

    @Query(value = "SELECT * FROM queue WHERE queue_slot = ?1, specific_slot = ?2")
    Optional<Queues> findByQueueSlotAndSpecificSlot(int queueSlot, int specificSlot);
}
