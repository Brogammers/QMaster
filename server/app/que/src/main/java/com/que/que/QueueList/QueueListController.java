package com.que.que.QueueList;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.que.que.Queue.QueueRepository;
import com.que.que.Queue.Queues;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/queues")
@AllArgsConstructor
public class QueueListController {
    private final QueueListService queueListService;
    private final QueueRepository queueRepository;

    public ArrayList<Queues> filterSortQueue(int page, int per-page, String filterName, String order) {

        if (filterName != null) {
            return queueRepository.findByNameContaining(filterName);
        }
    }

}
