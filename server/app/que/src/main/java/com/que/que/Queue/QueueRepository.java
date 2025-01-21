package com.que.que.Queue;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com.que.que.User.BusinessUser.BusinessUser;

@Repository
public interface QueueRepository extends JpaRepository<Queues, Long> {

        Optional<Queues> findByName(String name);

        ArrayList<Queues> findByCreator(BusinessUser creator);

        ArrayList<Queues> findByQueueSlotAndSpecificSlot(int queueSlot, int specificSlot);

        @NonNull
        Page<Queues> findAll(@NonNull Pageable page);

        ArrayList<Queues> findByQueueSlot(int queueSlot);

        Page<Queues> findByNameContaining(String name, Pageable page);

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

        @Query("SELECT q FROM Queues q WHERE LOWER(q.name) LIKE LOWER(concat('%', :targetName, '%')) ORDER BY q.peopleInQueue ASC")
        Page<Queues> findAllOrderedByPeopleInQueueAscAndFilterName(
                        @Param("targetName") String targetName, Pageable page);

        @Query("SELECT q FROM Queues q WHERE LOWER(q.name) LIKE LOWER(concat('%', :targetName, '%')) ORDER BY q.peopleInQueue DESC")
        Page<Queues> findAllOrderedByPeopleInQueueDescAndFilterName(
                        @Param("targetName") String targetName, Pageable page);

        ArrayList<Queues> findByNameContaining(String name);
}
