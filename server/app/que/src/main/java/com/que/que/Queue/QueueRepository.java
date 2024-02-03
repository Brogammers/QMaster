package com.que.que.Queue;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface QueueRepository extends JpaRepository<Queues, Long> {
  Optional<Queues> findByName(String name);

  List<Queues> findAll(Pageable page);

  List<Queues> findByNameContaining(String name, Pageable page);

  @Query("SELECT q FROM Queues q ORDER BY q.rating ASC")
  List<Queues> findAllOrderedByRatingAsc(Pageable page);

  @Query("SELECT q FROM Queues q ORDER BY q.rating DESC")
  List<Queues> findAllOrderedByRatingDesc(Pageable page);

  @Query("SELECT q FROM Queues q ORDER BY q.peopleInQueue ASC")
  List<Queues> findAllOrderedByPeopleInQueueAsc(Pageable page);

  @Query("SELECT q FROM Queues q ORDER BY q.peopleInQueue DESC")
  List<Queues> findAllOrderedByPeopleInQueueDesc(Pageable page);

  @Query("SELECT q FROM Queues q WHERE LOWER(q.name) LIKE LOWER(concat('%', :targetName, '%')) ORDER BY q.rating ASC")
  List<Queues> findAllOrderedByRatingAscAndFilterName(
      @Param("targetName") String targetName, Pageable page);

  @Query("SELECT q FROM Queues q WHERE LOWER(q.name) LIKE LOWER(concat('%', :targetName, '%')) ORDER BY q.rating DESC")
  List<Queues> findAllOrderedByRatingDescAndFilterName(
      @Param("targetName") String targetName, Pageable page);

  @Query("SELECT q FROM Queues q WHERE LOWER(q.name) LIKE LOWER(concat('%', :targetName, '%')) ORDER BY q.peopleInQueue ASC")
  List<Queues> findAllOrderedByPeopleInQueueAscAndFilterName(
      @Param("targetName") String targetName, Pageable page);

  @Query("SELECT q FROM Queues q WHERE LOWER(q.name) LIKE LOWER(concat('%', :targetName, '%')) ORDER BY q.peopleInQueue DESC")
  List<Queues> findAllOrderedByPeopleInQueueDescAndFilterName(
      @Param("targetName") String targetName, Pageable page);
}
