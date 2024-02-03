package com.que.que.QueueList;

import com.que.que.Queue.QueueRepository;
import com.que.que.Queue.Queues;
import java.util.List;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class QueueListService {

  private final QueueRepository queueRepository;

  public List<Queues> findByNameContaining(String filter, Pageable page) {
    return queueRepository.findByNameContaining(filter);
  }

  public List<Queues> findAll(Pageable page) {
    return queueRepository.findAll();
  }

  public List<Queues> findAllOrderedByRatingAsc(Pageable page) {
    return queueRepository.findAllOrderedByRatingAsc();
  }

  public List<Queues> findAllOrderedByRatingDesc(Pageable page) {
    return queueRepository.findAllOrderedByRatingDesc();
  }

  public List<Queues> findAllOrderedByPeopleInQueueAsc(Pageable page) {
    return queueRepository.findAllOrderedByPeopleInQueueAsc();
  }

  public List<Queues> findAllOrderedByPeopleInQueueDesc(Pageable page) {
    return queueRepository.findAllOrderedByPeopleInQueueDesc();
  }

  public List<Queues> findAllOrderedByRatingAscAndFilterName(
      String targetName, Pageable page) {
    return queueRepository.findAllOrderedByRatingAscAndFilterName(targetName);
  }

  public List<Queues> findAllOrderedByRatingDescAndFilterName(
      String targetName, Pageable page) {
    return queueRepository.findAllOrderedByRatingDescAndFilterName(targetName);
  }

  public List<Queues> findAllOrderedByPeopleInQueueAscAndFilterName(
      String targetName, Pageable page) {
    return queueRepository.findAllOrderedByPeopleInQueueAscAndFilterName(
        targetName);
  }

  public List<Queues> findAllOrderedByPeopleInQueueDescAndFilterName(
      String targetName, Pageable page) {
    return queueRepository.findAllOrderedByPeopleInQueueDescAndFilterName(
        targetName);
  }
}
