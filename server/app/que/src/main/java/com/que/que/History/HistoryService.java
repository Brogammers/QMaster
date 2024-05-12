package com.que.que.History;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.que.que.Queue.QueueDequeue;
import com.que.que.Queue.QueueDequeueRepository;
import com.que.que.Queue.QueueEnqueue;
import com.que.que.Queue.QueueEnqueueRepository;
import com.que.que.Queue.QueueService;
import com.que.que.Queue.Queues;
import com.que.que.User.AppUser.AppUser;
import com.que.que.User.AppUser.AppUserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class HistoryService {
    private final QueueService queueService;
    private final QueueEnqueueRepository queueEnqueueRepository;
    private final QueueDequeueRepository queueDequeueRepository;
    private final AppUserRepository appUserRepository;

    public Map<String, Object> getUserHistory(Long id, int pageNumber, int pageSize) {
        AppUser appUser = appUserRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Could not find user with such id"));
        Pageable page = PageRequest.of(pageNumber, pageSize);
        Page<QueueEnqueue> historyQueue = queueEnqueueRepository.findByAppUser(appUser, page);
        Page<QueueDequeue> historyDequeue = queueDequeueRepository.findByAppUser(appUser, page);
        Map<String, Object> map = new HashMap<>();
        map.put("enqueuings", historyQueue);
        map.put("dequeuings", historyDequeue);
        return map;
    }

    public Map<String, Object> getUserCurrentQueues(Long id) {
        ArrayList<Queues> currentQueues = queueService.currentQueuesOfUser(id);
        Map<String, Object> map = new HashMap<>();
        map.put("currentQueues", currentQueues);
        return map;
    }
}
