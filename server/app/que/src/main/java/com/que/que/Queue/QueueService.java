package com.que.que.Queue;

import com.que.que.QRcode.QRCodeService;
import com.que.que.User.AppUser;
import com.que.que.User.AppUserRepository;
import com.que.que.User.SubscriptionPlans;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;
import java.time.LocalDateTime;
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
  public final int MAX_BASIC_QUEUES = 1;
  public final int MAX_PREMIUM_QUEUES = 10;
  public final int MAX_ENTERPRISE_QUEUES = 20;
  public final int MAX_QUEUE_SIZE = 100;

  // Function called once upon server startup
  public void initializeQueueSlots(Stack<Integer> temp) {
    for (int i = 1000000; i >= 0; i--) {
      temp.push(i);
    }
    print();
  }

  public void createNewQueue(@NonNull Long queueHolderID, String name) {
    AppUser appUser = appUserRepository.findById(queueHolderID)
        .orElseThrow(() -> new IllegalStateException("Could not find User"));

    // Checking if current memory size for queues is full
    if (queueSlots.size() == 0) {
      throw new IllegalStateException("Can't add new queue");
    }
    if (!isValidForNewQueue(queueHolderID)) {
      throw new IllegalStateException("Can not create queue for user");
    }
    if (queueRepository.findByName(name).orElse(null) != null) {
      throw new IllegalStateException("Queue name already used");
    }

    // Checking if user already has a slot in memory if not assign one
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
      queueLocation = currentSlot;
    } else {
      queueHolderQueue = queue.get(queueLocation);
    }
    try {
      // This currently has an error because the createQRCode method is not static
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

    Queues createdQueue = queueRepository.save(new Queues(
        name,
        appUser,
        queueLocation,
        queueHolderQueue.size()));
    queueCreationRepository.save(new QueueCreation(createdQueue));
    queueHolderQueue.add(new LinkedList<>());
    print();
  }

  public boolean isValidForNewQueue(@NonNull Long queueHolderID) {
    AppUser appUserFromDB = appUserRepository
        .findById(queueHolderID)
        .orElseThrow(() -> new IllegalStateException("Could not find user"));
    int queueId = appUserFromDB.getQueueId();
    SubscriptionPlans subscriptionPlan = appUserFromDB.getSubscriptionPlan();
    int max = 1;

    // Current as placeholder
    switch (subscriptionPlan) {
      case SubscriptionPlans.BASIC:
        max = MAX_BASIC_QUEUES;
        break;
      case SubscriptionPlans.PREMIUM:
        max = MAX_PREMIUM_QUEUES;
        break;
      case SubscriptionPlans.ENTERPRISE:
        max = MAX_ENTERPRISE_QUEUES;
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
    AppUser user = appUserRepository.findById(appUser)
        .orElseThrow(() -> new IllegalStateException("Could not find user"));
    Queues currentQueue = queueRepository.findByName(name)
        .orElseThrow(() -> new IllegalStateException("Could not find queue with such name"));
    int queueSlot = currentQueue.getCreator().getQueueId();

    // Checking if user has slot in memory
    if (queueSlot == -1) {
      throw new IllegalStateException("User does not have such queue");
    }
    ArrayList<Queue<Long>> queueHolderQueues = queue.get(queueSlot);
    try {
      Queue<Long> specificQueue = queueHolderQueues.get(currentQueue.getSpecificSlot());
      if (presentInQueue(appUser, specificQueue)) {
        throw new IllegalStateException("User already in queue");
      }
      specificQueue.add(appUser);
      currentQueue.setPeopleInQueue(currentQueue.getPeopleInQueue() + 1);
    } catch (Exception e) {
      throw new IllegalStateException("Could not add user to queue: " + e.getMessage());
    }
    queueEnqueueRepository.save(
        new QueueEnqueue(
            user,
            currentQueue,
            QueueEnqueueStatus.ENQUEUED));
    print();
  }

  public AppUser dequeueUser(@NonNull String name) {
    Queues currentQueue = queueRepository.findByName(name)
        .orElseThrow(() -> new IllegalStateException("Could not find queue"));
    int queueSlot = currentQueue.getQueueSlot();

    // Checking if user has slot in memory
    if (queueSlot == -1) {
      throw new IllegalStateException("User does not have a queue setup");
    }
    ArrayList<Queue<Long>> queueHolderQueues = queue.get(queueSlot);
    try {

      // Attempting to find queue requested and fetching user from it
      Queue<Long> specificQueue = queueHolderQueues.get(currentQueue.getSpecificSlot());
      if (specificQueue.isEmpty()) {
        return null;
      }
      print();
      AppUser nextUser = appUserRepository.findById(
          specificQueue.poll()).orElseThrow(() -> new IllegalStateException("Could not find user"));
      currentQueue.setPeopleInQueue(currentQueue.getPeopleInQueue() - 1);

      // Adjusting QueueEnqueue status
      QueueEnqueue queueEnqueue = queueEnqueueRepository
          .findByAppUserAndQueueAndQueueEnqueueStatus(nextUser, currentQueue, QueueEnqueueStatus.ENQUEUED)
          .orElseThrow(() -> new IllegalStateException("Could not find user in queue"));

      queueEnqueue.setQueueEnqueueStatus(QueueEnqueueStatus.BEING_SERVED);
      queueEnqueueRepository.save(queueEnqueue);

      queueDequeueRepository
          .save(new QueueDequeue(nextUser, currentQueue, QueueDequeueStatus.SERVED));
      return nextUser;
    } catch (Exception e) {
      print();
      throw new IllegalStateException("Could not remove first user from queue");
    }
  }

  public void deleteQueue(@NonNull String name) {
    Queues currentQueue = queueRepository.findByName(name)
        .orElseThrow(() -> new IllegalStateException("Could not find queue"));
    int queueSlot = currentQueue.getQueueSlot();
    if (queueSlot == -1) {
      throw new IllegalStateException("User does not have a queue setup");
    }
    ArrayList<Queue<Long>> queueHolderQueues = queue.get(queueSlot);
    try {
      queueHolderQueues.set(currentQueue.getSpecificSlot(), null);
    } catch (Exception e) {
      throw new IllegalStateException("User does not have specific queue");
    }
    if (queueHolderQueues.size() == 0) {
      AppUser appUser = currentQueue.getCreator();
      appUser.setQueueId(-1);
      queueSlots.push(queueSlot);
    }

    queueDeletionRepository.save(
        new QueueDeletion(currentQueue));
    queueRepository.deleteById(currentQueue.getId());
    print();
  }

  public ArrayList<Queues> currentQueuesOfUser(long appUserId) {
    ArrayList<Queues> currentQueues = new ArrayList<>();
    for (int queueSlot = 0; queueSlot < queue.size(); queueSlot++) {
      ArrayList<Queue<Long>> list = queue.get(queueSlot);

      // If slot is empty in memory
      if (list.equals(null))
        continue;
      for (int specificSlot = 0; specificSlot < list.size(); specificSlot++) {
        Queue<Long> tempQueue = list.get(specificSlot);
        if (tempQueue.contains(appUserId)) {
          ArrayList<Queues> queueToBeAdded = queueRepository.findByQueueSlotAndSpecificSlot(queueSlot, specificSlot);
          currentQueues.add(queueToBeAdded.get(0));
        }
      }
    }
    return currentQueues;
  }

  public ArrayList<AppUser> getBeingServed(long appUserId) {
    ArrayList<AppUser> appUsers = new ArrayList<>();
    int slot = getQueueSlot(appUserId);
    if (slot == -1) {
      return appUsers;
    }
    ArrayList<Queues> queues = queueRepository.findByQueueSlot(slot);
    for (Queues queue : queues) {
      ArrayList<QueueEnqueue> queueEnqueues = queueEnqueueRepository.findByQueueAndQueueEnqueueStatus(queue,
          QueueEnqueueStatus.BEING_SERVED);
      for (QueueEnqueue queueEnqueue : queueEnqueues) {
        appUsers.add(queueEnqueue.getAppUser());
      }
    }
    return appUsers;
  }

  public ArrayList<QueueDequeue> getServedUsers(long appUserId, LocalDateTime to, LocalDateTime from) {
    ArrayList<QueueDequeue> queueDequeues = new ArrayList<>();
    int slot = getQueueSlot(appUserId);
    if (slot == -1) {
      return queueDequeues;
    }
    ArrayList<Queues> queues = queueRepository.findByQueueSlot(slot);
    for (Queues queue : queues) {
      ArrayList<QueueDequeue> queueDequeuesTemp = queueDequeueRepository
          .findByActionDateBetweenAndQueueAndQueueDequeueStatus(from, to, queue, QueueDequeueStatus.SERVED);
      for (QueueDequeue queueDequeue : queueDequeuesTemp) {
        queueDequeues.add(queueDequeue);
      }
    }
    return queueDequeues;
  }

  public ArrayList<QueueDequeue> getCancelledUsers(long appUserId, LocalDateTime to, LocalDateTime from) {
    ArrayList<QueueDequeue> queueDequeues = new ArrayList<>();
    int slot = getQueueSlot(appUserId);
    if (slot == -1) {
      return queueDequeues;
    }
    ArrayList<Queues> queues = queueRepository.findByQueueSlot(slot);
    for (Queues queue : queues) {
      ArrayList<QueueDequeue> queueDequeuesTemp = queueDequeueRepository
          .findByActionDateBetweenAndQueueAndQueueDequeueStatus(from, to, queue, QueueDequeueStatus.CANCELLED);
      for (QueueDequeue queueDequeue : queueDequeuesTemp) {
        queueDequeues.add(queueDequeue);
      }
    }
    return queueDequeues;
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

  public boolean presentInQueue(Long appUser, Queue<Long> queue) {
    return queue.contains(appUser);
  }

  public int getWalkIns(Long appUserId, LocalDateTime from, LocalDateTime to) {
    ArrayList<QueueEnqueue> walkIns = queueEnqueueRepository.findByActionDateBetweenAndAppUserId(from, to, appUserId);
    return walkIns.size();
  }
}
