package com.que.que.History;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.que.que.Queue.QueueRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/history")
@AllArgsConstructor
public class HistoryController {

    private final QueueRepository queueRepository;

    @GetMapping
    public void getUserHistory(@RequestParam("id") Long id) {

    }
}
