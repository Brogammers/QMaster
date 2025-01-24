package com.que.que.Queue;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;
import com.que.que.Security.JwtUtil;
import com.que.que.User.AppUser.AppUser;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/queue")
@AllArgsConstructor
public class QueueController {

    private final QueueService queueService;
    private final JwtUtil jwtUtil;

    @PostMapping
    @Secured({ "BUSINESS_OWNER", "BUSINESS_MANAGER", "BUSINESS_ADMIN", "ADMIN" })
    public ResponseEntity<Object> createNewQueue(@RequestBody QueueRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
        try {
            queueService.createNewQueue(request.getId(), request.getLocationId(), request.getName(),
                    request.getMaxQueueSize(), request.getAverageServiceTime(), request.isActive());
            body.put("message", "Queue was successful");
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @PutMapping(path = "/user")
    @Secured({ "USER", "ADMIN" })
    public ResponseEntity<Object> enqueue(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @Param("queueName") String queueName) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);

        try {
            String email = jwtUtil.getEmail(token.substring(7));
            queueService.enqueueUser(email, queueName);
            body.put("message", "Added user!");
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @PutMapping(path = "/holder")
    @Secured({ "BUSINESS_OWNER", "BUSINESS_MANAGER", "BUSINESS_ADMIN", "BUSINESS_EMPLOYEE", "ADMIN" })
    public ResponseEntity<Object> dequeue(@RequestBody QueueRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        AppUser user = null;
        try {
            user = queueService.dequeueUser(request.getName(), request.getCounterId());
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
    @Secured({ "BUSINESS_OWNER", "BUSINESS_MANAGER", "BUSINESS_ADMIN", "ADMIN" })
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

    @GetMapping(path = "/business")
    @Secured({ "BUSINESS_OWNER", "BUSINESS_MANAGER", "BUSINESS_ADMIN", "ADMIN" })
    public ResponseEntity<Object> getBusinessQueues(@Param("id") long id) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            ArrayList<Queues> queues = queueService.currentQueuesOfUser(id);
            body.put("queues", queues);
            body.put("message", "Queues retrieved");
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @GetMapping(path = "/user")
    @Secured({ "USER", "ADMIN" })
    public ResponseEntity<Object> getIfInQueue(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestParam("queueName") String queueName) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);

        try {
            String email = jwtUtil.getEmail(token.substring(7));
            boolean isPresent = queueService.presentInQueue(email, queueName);
            if (isPresent) {
                body.put("message", "User is in queue");
                body.put("isPresent", isPresent);
            } else {
                body.put("message", "User is not in queue");
                body.put("isPresent", isPresent);
            }
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
        }
        return new ResponseEntity<Object>(body, statusCode);
    }
}
