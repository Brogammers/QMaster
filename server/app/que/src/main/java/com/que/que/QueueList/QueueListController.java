package com.que.que.QueueList;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/queues")
@AllArgsConstructor
public class QueueListController {
    private final QueueListService queueListService;

}
