package com.que.que.History;

import java.util.List;

import org.springframework.stereotype.Service;

import com.que.que.Queue.QueueEnqueue;
import com.que.que.Queue.QueueEnqueueRepository;
import com.que.que.User.AppUser;
import com.que.que.User.AppUserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class HistoryService {
    private final QueueEnqueueRepository queueEnqueueRepository;
    private final AppUserRepository appUserRepository;

    public List<QueueEnqueue> getUserHistory(Long id) {
        AppUser appUser = appUserRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Could not find user with such id"));
        List<QueueEnqueue> history = queueEnqueueRepository.findByAppUser(appUser);
        return history;
    }
}
