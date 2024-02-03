package com.que.que.QueueList;

import com.que.que.Queue.QueueRepository;
import com.que.que.Queue.Queues;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class QueueListService {

  private final QueueRepository queueRepository;

  public List<Queues> findByNameContaining(String filter) {
    return queueRepository.findByNameContaining(filter);
  }

  public List<Queues> findAll() {
    return queueRepository.findAll();
  }

  public List<Queues> findAllOrderedByRatingAsc() {
    return queueRepository.findAllOrderedByRatingAsc();
  }

  public List<Queues> findAllOrderedByRatingDesc() {
    return queueRepository.findAllOrderedByRatingDesc();
  }

  public List<Queues> findAllOrderedByPeopleInQueueAsc() {
    return queueRepository.findAllOrderedByPeopleInQueueAsc();
  }

  public List<Queues> findAllOrderedByPeopleInQueueDesc() {
    return queueRepository.findAllOrderedByPeopleInQueueDesc();
  }

  public List<Queues> findAllOrderedByRatingAscAndFilterName(
    String targetName
  ) {
    return queueRepository.findAllOrderedByRatingAscAndFilterName(targetName);
  }

  public List<Queues> findAllOrderedByRatingDescAndFilterName(
    String targetName
  ) {
    return queueRepository.findAllOrderedByRatingDescAndFilterName(targetName);
  }

  public List<Queues> findAllOrderedByPeopleInQueueAscAndFilterName(
    String targetName
  ) {
    return queueRepository.findAllOrderedByPeopleInQueueAscandFilterName(
      targetName
    );
  }

  public List<Queues> findAllOrderedByPeopleInQueueDescAndFilterName(
    String targetName
  ) {
    return queueRepository.findAllOrderedByPeopleInQueueDescAndFilterName(
      targetName
    );
  }
}
