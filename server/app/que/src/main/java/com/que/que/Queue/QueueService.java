package com.que.que.Queue;

import com.fasterxml.jackson.core.sym.Name;
import com.que.que.QRcode.QRCodeService;
import com.que.que.User.AppUser;
import com.que.que.User.AppUserRepository;
import com.que.que.Queue.Queues;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
@Configuration
@AllArgsConstructor
public class QueueService {

  private final AppUserRepository appUserRepository;
  private final QueueRepository queueRepository;
  private final QueueCreationRepository queueCreationRepository;
  private final QueueDequeueRepository queueDequeueRepository;
  private final QueueEnqueueRepository queueEnqueueRepository;
  private final QueueDeletionRepository queueDeletionRepository;
  private final QRCodeService qrCodeService;
  private final ArrayList<ArrayList<Queue<Long>>> queue = queue();
  private final Stack<Integer> queueSlots = stack();

  public void initializeQueueSlots(Stack<Integer> temp) {
    for (int i = 1000000; i >= 0; i--) {
      temp.push(i);
    }
    print();
  }

  public void createNewQueue(@NonNull Long queueHolderID, String name) {
    AppUser appUser = appUserRepository.findById(queueHolderID).orElse(null);
    if (appUser == null) {
      throw new IllegalStateException("Could not find user");
    }
    if (queueSlots.size() == 0) {
      throw new IllegalStateException("Can't add new queue");
    }
    if (!isValidForNewQueue(queueHolderID)) {
      throw new IllegalStateException("Can not create queue for user");
    }
    int queueLocation = getQueueSlot(queueHolderID);
    ArrayList<Queue<Long>> queueHolderQueue;
    if (queueLocation == -1) {
      int currentSlot = queueSlots.pop();
      try {
        queueHolderQueue = queue.get(currentSlot);
      } catch (Exception e) {
        queue.add(new ArrayList<Queue<Long>>());
        queueHolderQueue = queue.get(currentSlot);
      }
      appUser.setQueueId(currentSlot);
    } else {
      queueHolderQueue = queue.get(queueLocation);
    }
    try {
      // this currently has an error because the createQRCode method is not static
      qrCodeService.createQRCode(
          queueHolderID,
          queueHolderQueue.size(),
          String.format(
              "http://192.168.56.1:8080/api/v1/queue/user?queueHolderId=%d&queue=%d",
              queueHolderID,
              queueHolderQueue.size()));
    } catch (Exception e) {
      throw new IllegalStateException("Error while creating queue.");
    }
    queueHolderQueue.add(new LinkedList<>());
    Queues createdQueue = queueRepository.save(new Queues(
        appUser,
        name,
        queueLocation,
        queueHolderQueue.size() - 1));
    queueCreationRepository.save(new QueueCreation(createdQueue));
    print();
  }

  public boolean isValidForNewQueue(@NonNull Long queueHolderID) {
    AppUser appUserFromDB = appUserRepository
        .findById(queueHolderID)
        .orElseThrow(() -> new IllegalStateException("Could not find user"));
    int queueId = appUserFromDB.getQueueId();
    byte subscriptionPlan = appUserFromDB.getSubscriptionPlan();
    int max = Integer.MAX_VALUE;
    switch (subscriptionPlan) {
      case 0:
        max = 1;
        break;
      case 1:
        max = 20;
        break;
      case 2:
        max = 100;
        break;
    }
    int currsize = queueId == -1 ? 0 : queue.get(queueId).size();
    print();
    if (queueId == -1 || currsize < max) {
      return true;
    } else {
      return false;
    }
  }

  public int getQueueSlot(@NonNull Long queueHolderID) {
    AppUser appUserFromDB = appUserRepository
        .findById(queueHolderID)
        .orElseThrow(() -> new IllegalStateException("Could not find user"));
    int queueId = appUserFromDB.getQueueId();
    return queueId;
  }

  public void enqueueUser(@NonNull Long appUser, @NonNull String name) {
    Queues currentQueue = queueRepository.findById(name)
        .orElseThrow(() -> new IllegalStateException("Could not find queue with such name"));
    int queueSlot = currentQueue.getAppUser().getQueueId();
    if (queueSlot == -1) {
      throw new IllegalStateException("User does not have a queue setup");
    }
    ArrayList<Queue<Long>> queueHolderQueues = queue.get(queueSlot);
    try {
      Queue<Long> specificQueue = queueHolderQueues.get(currentQueue.getSpecificSlot());
      appUserRepository
          .findById(appUser)
          .orElseThrow(() -> new IllegalStateException("No user with such id"));
      specificQueue.add(appUser);
    } catch (Exception e) {
      throw new IllegalStateException("Could not add user to queue");
    }
    queueEnqueueRepository.save(
        new QueueEnqueue(
            currentQueue.getAppUser(),
            currentQueue));
    print();
  }

  public AppUser dequeueUser(@NonNull String name) {
    Queues currentQueue = queueRepository.findById(name)
        .orElseThrow(() -> new IllegalStateException("Could not find queue"));
    int queueSlot = currentQueue.getQueueSlot();
    if (queueSlot == -1) {
      throw new IllegalStateException("User does not have a queue setup");
    }
    ArrayList<Queue<Long>> queueHolderQueues = queue.get(queueSlot);
    try {
      Queue<Long> specificQueue = queueHolderQueues.get(currentQueue.getSpecificSlot());
      if (specificQueue.isEmpty()) {
        return null;
      }
      print();
      AppUser nextUser = currentQueue.getAppUser();
      queueDequeueRepository
          .save(new QueueDequeue(nextUser, currentQueue));
      return nextUser;
    } catch (Exception e) {
      print();
      throw new IllegalStateException("Could not remove first user from queue");
    }
  }

  public void deleteQueue(@NonNull String name) {
    Queues currentQueue = queueRepository.findById(name)
        .orElseThrow(() -> new IllegalStateException("Could not find queue"));
    int queueSlot = currentQueue.getQueueSlot();
    if (queueSlot == -1) {
      throw new IllegalStateException("User does not have a queue setup");
    }
    ArrayList<Queue<Long>> queueHolderQueues = queue.get(queueSlot);
    try {
      queueHolderQueues.remove(currentQueue.getSpecificSlot());
    } catch (Exception e) {
      throw new IllegalStateException("User does not have specific queue");
    }
    if (queueHolderQueues.size() == 0) {
      AppUser appUser = currentQueue.getAppUser();
      appUser.setQueueId(-1);
    }

    queueDeletionRepository.save(
        new QueueDeletion(currentQueue));
    print();
  }

  public void print() {
    for (int i = 0; i < queue.size(); i++) {
      ArrayList<Queue<Long>> current = queue.get(i);
      for (int j = 0; j < current.size(); j++) {
        System.out.println(current.get(j));
      }
    }
  }

  public ArrayList<ArrayList<Queue<Long>>> queue() {
    return new ArrayList<>();
  }

  public Stack<Integer> stack() {
    Stack<Integer> temp = new Stack<>();
    initializeQueueSlots(temp);
    return temp;
  }
}
