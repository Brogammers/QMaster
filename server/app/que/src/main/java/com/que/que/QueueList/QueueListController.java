package com.que.que.QueueList;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.que.que.Queue.QueueRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/queues")
@AllArgsConstructor
public class QueueListController {
    private final QueueListService queueListService;
    private final QueueRepository queueRepository;

    @GetMapping(path = "/list")
    public ResponseEntity<Object> filterSortQueue(@RequestParam("page") int page, @RequestParam("per-page") int perPage,
            @RequestParam("filter") String filterBy, @RequestParam("order") String order) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        if (filterBy != null) {
            body.put("queues", queueRepository.findByNameContaining(filterBy));
        } else {
            body.put("queues", queueRepository.findAll());
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

}
