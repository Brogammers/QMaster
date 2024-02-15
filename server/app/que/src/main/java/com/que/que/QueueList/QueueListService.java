package com.que.que.QueueList;

import com.que.que.Queue.QueueRepository;
import com.que.que.Queue.Queues;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class QueueListService {

  private final QueueRepository queueRepository;

  public Page<Queues> findByNameContaining(String filter, Pageable page) {
    return queueRepository.findByNameContaining(filter, page);
  }

  public Page<Queues> findAll(Pageable page) {
    return queueRepository.findAll(page);
  }

  public Page<Queues> findAllOrderedByRatingAsc(Pageable page) {
    return queueRepository.findAllOrderedByRatingAsc(page);
  }

  public Page<Queues> findAllOrderedByRatingDesc(Pageable page) {
    return queueRepository.findAllOrderedByRatingDesc(page);
  }

  public Page<Queues> findAllOrderedByPeopleInQueueAsc(Pageable page) {
    return queueRepository.findAllOrderedByPeopleInQueueAsc(page);
  }

  public Page<Queues> findAllOrderedByPeopleInQueueDesc(Pageable page) {
    return queueRepository.findAllOrderedByPeopleInQueueDesc(page);
  }

  public Page<Queues> findAllOrderedByRatingAscAndFilterName(
      String targetName, Pageable page) {
    return queueRepository.findAllOrderedByRatingAscAndFilterName(targetName, page);
  }

  public Page<Queues> findAllOrderedByRatingDescAndFilterName(
      String targetName, Pageable page) {
    return queueRepository.findAllOrderedByRatingDescAndFilterName(targetName, page);
  }

  public Page<Queues> findAllOrderedByPeopleInQueueAscAndFilterName(
      String targetName, Pageable page) {
    return queueRepository.findAllOrderedByPeopleInQueueAscAndFilterName(targetName, page);
  }

  public Page<Queues> findAllOrderedByPeopleInQueueDescAndFilterName(
      String targetName, Pageable page) {
    return queueRepository.findAllOrderedByPeopleInQueueDescAndFilterName(targetName, page);
  }
}
