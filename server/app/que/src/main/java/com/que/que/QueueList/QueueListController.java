package com.que.que.QueueList;

import java.util.HashMap;
import java.util.Map;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
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
      @RequestParam("page") int pageNumber,
      @RequestParam("per-page") int perPage,
      @RequestParam("filter") String filterBy,
      @RequestParam("order") String order) {
    Map<String, Object> body = new HashMap<>();
    HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
    Pageable page = PageRequest.of(pageNumber, perPage);
    if (filterBy.length() > 1) {
      if (order.charAt(0) == '-') {
        if (order.substring(1).equals("rating")) {
          body.put(
              "queues",
              queueListService.findAllOrderedByRatingDescAndFilterName(filterBy, page));
        } else if (order.substring(1).equals("peopleInQueue")) {
          body.put(
              "queues",
              queueListService.findAllOrderedByPeopleInQueueDescAndFilterName(filterBy, page));
        }
      } else {
        if (order.equals("rating")) {
          body.put(
              "queues",
              queueListService.findAllOrderedByRatingAscAndFilterName(filterBy, page));
        } else if (order.equals("peopleInQueue")) {
          body.put(
              "queues",
              queueListService.findAllOrderedByPeopleInQueueAscAndFilterName(filterBy, page));
        }
      }
    } else {
      if (order.charAt(0) == '-') {
        if (order.substring(1).equals("rating")) {
          body.put("queues", queueListService.findAllOrderedByRatingDesc(page));
        } else if (order.substring(1).equals("peopleInQueue")) {
          body.put(
              "queues",
              queueListService.findAllOrderedByPeopleInQueueDesc(page));
        }
      } else {
        if (order.equals("rating")) {
          body.put("queues", queueListService.findAllOrderedByRatingAsc(page));
        } else if (order.equals("peopleInQueue")) {
          body.put(
              "queues",
              queueListService.findAllOrderedByPeopleInQueueAsc(page));
        }
      }
    }
    return new ResponseEntity<Object>(body, statusCode);
  }
}
