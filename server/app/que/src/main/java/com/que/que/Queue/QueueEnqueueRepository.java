package com.que.que.Queue;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.que.que.User.AppUser;

@Repository
public interface QueueEnqueueRepository extends JpaRepository<QueueEnqueue, Long> {
    List<QueueEnqueue> findByAppUser(AppUser appUser);
}
