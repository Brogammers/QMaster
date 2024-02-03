package com.que.que.QueueList;

import java.util.List;

import org.springframework.stereotype.Service;

import com.que.que.Queue.QueueRepository;
import com.que.que.Queue.Queues;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class QueueListService {
    private final QueueRepository queueRepository;

    public List<Queues> findByNameContaining(String filter) {
        return queueRepository.findByNameContaining(filter);
    }

    public List<Queues> findAll() {
        return queueRepository.findAll();
    }
}