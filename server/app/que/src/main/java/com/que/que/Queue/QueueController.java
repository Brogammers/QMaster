package com.que.que.Queue;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.que.que.User.AppUser;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/queue")
@AllArgsConstructor
public class QueueController {

    private final QueueService queueService;

    @PostMapping
    public void createNewQueue(@RequestParam("id") @NonNull Long id) {
        queueService.createNewQueue(id);
    }

    @PutMapping(path = "/user")
    public void enqueue(@RequestParam("queueHolderId") @NonNull Long queueHolderId,
            @RequestParam("appuser") @NonNull Long appUser,
            @RequestParam("queue") int queue) {
        queueService.enqueueUser(queueHolderId, appUser, queue);
    }

    @PutMapping(path = "/holder")
    public AppUser dequeue(@RequestParam("id") @NonNull Long id, @RequestParam("queue") int queue) {
        return queueService.dequeueUser(id, queue);
    }

    @DeleteMapping
    public void deleteQueue(@RequestParam("id") @NonNull Long id, @RequestParam("queue") int queue) {
        queueService.deleteQueue(id, queue);
    }
}
