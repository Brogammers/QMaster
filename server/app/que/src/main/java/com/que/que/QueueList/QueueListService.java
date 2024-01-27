package com.que.que.QueueList;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public interface QueueListService extends JpaRepository<Queues, Long> {
    public ArrayList<Queues> findByNameContaining(String name);

}
