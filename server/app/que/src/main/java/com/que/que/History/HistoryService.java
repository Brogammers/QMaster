package com.que.que.History;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.que.que.Queue.QueueDequeue;
import com.que.que.Queue.QueueDequeueRepository;
import com.que.que.Queue.QueueEnqueue;
import com.que.que.Queue.QueueEnqueueRepository;
import com.que.que.User.AppUser;
import com.que.que.User.AppUserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class HistoryService {
    private final QueueEnqueueRepository queueEnqueueRepository;
    private final QueueDequeueRepository queueDequeueRepository;
    private final AppUserRepository appUserRepository;

    public List<Object> getUserHistory(Long id) {
        AppUser appUser = appUserRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Could not find user with such id"));
        List<Object> result = new ArrayList<>();
        List<QueueEnqueue> historyQueue = queueEnqueueRepository.findByAppUser(appUser);
        List<QueueDequeue> historyDequeue = queueDequeueRepository.findByAppUser(appUser);
        result.addAll(historyDequeue);
        result.addAll(historyQueue);
        return result;
    }
}
