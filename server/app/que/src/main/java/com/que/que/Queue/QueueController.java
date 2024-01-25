package com.que.que.Queue;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Object> createNewQueue(@RequestParam("id") @NonNull Long id) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
        try {
            queueService.createNewQueue(id);
            body.put("message", "Queue was successful");
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @PutMapping(path = "/user")
    public ResponseEntity<Object> enqueue(@RequestParam("queueHolderId") @NonNull Long queueHolderId,
            @RequestParam("appuser") @NonNull Long appUser,
            @RequestParam("queue") int queue) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            queueService.enqueueUser(queueHolderId, appUser, queue);
            body.put("message", "Added user!");
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
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
