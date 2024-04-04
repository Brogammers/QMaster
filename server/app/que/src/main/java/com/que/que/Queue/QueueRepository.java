package com.que.que.Queue;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueueRepository extends JpaRepository<Queues, Long> {
  
  Optional<Queues> findByName(String name);

  ArrayList<Queues> findByQueueSlotAndSpecificSlot(int queueSlot, int specificSlot);

  Page<Queues> findAll(Pageable page);

  Page<Queues> findByNameContaining(String name, Pageable page);

  ArrayList<Queues> findByQueueSlot(int queueSlot);

  @Query("SELECT q FROM Queues q ORDER BY q.rating ASC")
  Page<Queues> findAllOrderedByRatingAsc(Pageable page);

  @Query("SELECT q FROM Queues q ORDER BY q.rating DESC")
  Page<Queues> findAllOrderedByRatingDesc(Pageable page);

  @Query("SELECT q FROM Queues q ORDER BY q.peopleInQueue ASC")
  Page<Queues> findAllOrderedByPeopleInQueueAsc(Pageable page);

  @Query("SELECT q FROM Queues q ORDER BY q.peopleInQueue DESC")
  Page<Queues> findAllOrderedByPeopleInQueueDesc(Pageable page);

  @Query("SELECT q FROM Queues q WHERE LOWER(q.name) LIKE LOWER(concat('%', :targetName, '%')) ORDER BY q.rating ASC")
  Page<Queues> findAllOrderedByRatingAscAndFilterName(
      @Param("targetName") String targetName, Pageable page);

  @Query("SELECT q FROM Queues q WHERE LOWER(q.name) LIKE LOWER(concat('%', :targetName, '%')) ORDER BY q.rating DESC")
  Page<Queues> findAllOrderedByRatingDescAndFilterName(
      @Param("targetName") String targetName, Pageable page);

  List<Queues> findByNameContaining(String name);

  ArrayList<QueueEnqueue> findByActionDateBetweenAndAppUserId(LocalDateTime from, LocalDateTime to, Long appUserId);
}
