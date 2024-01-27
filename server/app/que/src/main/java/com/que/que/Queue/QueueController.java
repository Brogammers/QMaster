package com.que.que.Queue;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public ResponseEntity<Object> createNewQueue(@RequestBody QueueRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
        try {
            queueService.createNewQueue(request.getId(), request.getName());
            body.put("message", "Queue was successful");
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @PutMapping(path = "/user")
    public ResponseEntity<Object> enqueue(@RequestBody QueueRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            queueService.enqueueUser(request.getId(), request.getName());
            body.put("message", "Added user!");
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @PutMapping(path = "/holder")
    public ResponseEntity<Object> dequeue(@RequestBody QueueRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        AppUser user = null;
        try {
            user = queueService.dequeueUser(request.getName());
            if (user != null) {
                body.put("message", "User was dequeued!");
                body.put("user", user);
            } else {
                body.put("message", "Queue is empty");
                statusCode = HttpStatusCode.valueOf(500);
            }
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @DeleteMapping
    public ResponseEntity<Object> deleteQueue(@RequestBody QueueRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            queueService.deleteQueue(request.getName());
            body.put("message", "Queue delete successful");
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
        }
        return new ResponseEntity<Object>(body, statusCode);
    }
}
