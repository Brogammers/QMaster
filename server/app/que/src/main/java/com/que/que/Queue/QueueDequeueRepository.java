package com.que.que.Queue;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueueDequeueRepository extends JpaRepository<QueueDequeue, Long> {
}
