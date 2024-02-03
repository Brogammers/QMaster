package com.que.que.Queue;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface QueueRepository extends JpaRepository<Queues, Long> {
  Optional<Queues> findByName(String name);

  List<Queues> findByNameContaining(String name);

  @Query("SELECT q FROM Queues q ORDER BY q.rating ASC")
  List<Queues> findAllOrderedByRatingAsc();

  @Query("SELECT q FROM Queues q ORDER BY q.rating DESC")
  List<Queues> findAllOrderedByRatingDesc();

  @Query("SELECT q FROM Queues q ORDER BY q.peopleInQueue ASC")
  List<Queues> findAllOrderedByPeopleInQueueAsc();

  @Query("SELECT q FROM Queues q ORDER BY q.peopleInQueue DESC")
  List<Queues> findAllOrderedByPeopleInQueueDesc();

  @Query(
    "SELECT q FROM Queues q WHERE LOWER(q.name) LIKE LOWER(concat('%', :targetName, '%')) ORDER BY q.rating ASC"
  )
  List<Queues> findAllOrderedByRatingAscAndFilterName(
    @Param("targetName") String targetName
  );

  @Query(
    "SELECT q FROM Queues q WHERE LOWER(q.name) LIKE LOWER(concat('%', :targetName, '%')) ORDER BY q.rating DESC"
  )
  List<Queues> findAllOrderedByRatingDescAndFilterName(
    @Param("targetName") String targetName
  );

  @Query(
    "SELECT q FROM Queues q WHERE LOWER(q.name) LIKE LOWER(concat('%', :targetName, '%')) ORDER BY q.peopleInQueue ASC"
  )
  List<Queues> findAllOrderedByPeopleInQueueAscAndFilterName(
    @Param("targetName") String targetName
  );

  @Query(
    "SELECT q FROM Queues q WHERE LOWER(q.name) LIKE LOWER(concat('%', :targetName, '%')) ORDER BY q.peopleInQueue DESC"
  )
  List<Queues> findAllOrderedByPeopleInQueueDescAndFilterName(
    @Param("targetName") String targetName
  );
}
