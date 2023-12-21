package com.que.que.Queue;

import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping(path = "api/v1/queue")
@AllArgsConstructor
public class QueueController {

    private final QueueService queueService;

    @PostMapping("create")
    public void createNewQueue(@RequestParam("id") Long id) {
        queueService.createNewQueue(id);
    }
}
