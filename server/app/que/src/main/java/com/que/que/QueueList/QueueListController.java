package com.que.que.QueueList;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping(path = "/list")
    public List<Queues> filterSortQueue(int page, int perPage, String filterName, String order) {
        if (filterName != null) {
            return queueRepository.findByNameContaining(filterName);
        } else {
            return queueRepository.findAll();
        }
    }

}
