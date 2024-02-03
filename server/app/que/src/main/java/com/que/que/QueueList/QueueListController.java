package com.que.que.QueueList;

import java.util.HashMap;
import java.util.Map;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/queues")
@AllArgsConstructor
public class QueueListController {

  private final QueueListService queueListService;

  @GetMapping(path = "/list")
  public ResponseEntity<Object> filterSortQueue(
      @RequestParam("page") int page,
      @RequestParam("per-page") int perPage,
      @RequestParam("filter") String filterBy,
      @RequestParam("order") String order) {
    Map<String, Object> body = new HashMap<>();
    HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
    if (filterBy != null) {
      if (order.charAt(0) == '-') {
        if (order.substring(1).equals("rating")) {
          body.put(
              "queues",
              queueListService.findAllOrderedByRatingDescAndFilterName(filterBy));
        } else if (order.substring(1).equals("peopleInQueue")) {
          body.put(
              "queues",
              queueListService.findAllOrderedByPeopleInQueueDescAndFilterName(
                  filterBy));
        }
      } else {
        if (order.equals("rating")) {
          body.put(
              "queues",
              queueListService.findAllOrderedByRatingAscAndFilterName(filterBy));
        } else if (order.equals("peopleInQueue")) {
          body.put(
              "queues",
              queueListService.findAllOrderedByPeopleInQueueAscAndFilterName(
                  filterBy));
        }
      }
    } else {
      if (order.charAt(0) == '-') {
        if (order.substring(1).equals("rating")) {
          body.put("queues", queueListService.findAllOrderedByRatingDesc());
        } else if (order.substring(1).equals("peopleInQueue")) {
          body.put(
              "queues",
              queueListService.findAllOrderedByPeopleInQueueDesc());
        }
      } else {
        if (order.equals("rating")) {
          body.put("queues", queueListService.findAllOrderedByRatingAsc());
        } else if (order.equals("peopleInQueue")) {
          body.put(
              "queues",
              queueListService.findAllOrderedByPeopleInQueueAsc());
        }
      }
    }
    return new ResponseEntity<Object>(body, statusCode);
  }
}
