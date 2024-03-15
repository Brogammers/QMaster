package com.que.que.History;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/history")
@AllArgsConstructor
public class HistoryController {
    private final HistoryService historyService;

    @GetMapping("/all")
    @Secured("USER")
    public ResponseEntity<Object> userHistory(@RequestParam("id") Long id) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        Map<String, Object> history = null;
        try {
            history = historyService.getUserHistory(id, 0, 5);
        } catch (IllegalStateException e) {
            statusCode = HttpStatusCode.valueOf(500);
            body.put("message", e.getMessage());
        }
        body.put("history", history);
        return new ResponseEntity<Object>(body, statusCode);
    }

    @GetMapping("/current")
    public ResponseEntity<Object> getMethodName(@RequestParam("id") Long id) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        Map<String, Object> history = null;
        try {
            history = historyService.getUserCurrentQueues(id);
        } catch (IllegalStateException e) {
            statusCode = HttpStatusCode.valueOf(500);
            body.put("message", e.getMessage());
        }
        body.put("history", history);
        return new ResponseEntity<Object>(body, statusCode);
    }
    
}
