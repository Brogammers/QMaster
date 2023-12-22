package com.que.que.Queue;

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

    @PostMapping("create")
    public void createNewQueue(@RequestParam("id") Long id) {
        queueService.createNewQueue(id);
    }

    @PutMapping("enqueue")
    public void enqueue(@RequestParam("id") Long id, @RequestParam("appuser") Long appUser, @RequestParam("queue") int queue) {
        queueService.enqueueUser(id, appUser, queue);
    }

    @PutMapping("dequeue")
    public AppUser dequeue(@RequestParam("id") Long id, @RequestParam("queue") int queue) {
        return queueService.dequeueUser(id, queue);
    }

    @DeleteMapping("delete")
    public void putMethodName(@RequestParam("id") Long id, @RequestParam("queue") int queue) {
        queueService.deleteQueue(id, queue);
    }
}
