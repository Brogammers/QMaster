package com.que.que.Queue;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Stack;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.que.que.Location.Location;
import com.que.que.Location.LocationRepository;
import com.que.que.Partner.Partner;
import com.que.que.Partner.PartnerRepository;
import com.que.que.QRcode.QRCodeService;
import com.que.que.User.SubscriptionPlans;
import com.que.que.User.AppUser.AppUser;
import com.que.que.User.AppUser.AppUserRepository;
import com.que.que.User.BusinessUser.BusinessUser;
import com.que.que.User.BusinessUser.BusinessUserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class QueueService {

  private final AppUserRepository appUserRepository;
  private final LocationRepository locationRepository;
  private final BusinessUserRepository businessUserRepository;
  private final QueueRepository queueRepository;
  private final QueueCreationRepository queueCreationRepository;
  private final QueueDequeueRepository queueDequeueRepository;
  private final QueueEnqueueRepository queueEnqueueRepository;
  private final QueueDeletionRepository queueDeletionRepository;
  private final QueueCounterRepository queueCounterRepository;
  private final PartnerRepository partnerRepository;
  private final QRCodeService qrCodeService;
  private final ArrayList<ArrayList<Queue<Long>>> queueSet = initQueue();
  private final Stack<Integer> queueSlots = initStack();
  private final ArrayList<Boolean> firstOperation = new ArrayList<Boolean>();
  public final int MAX_BASIC_QUEUES = 1;
  public final int MAX_PREMIUM_QUEUES = 10;
  public final int MAX_ENTERPRISE_QUEUES = 20;
  public final int MAX_QUEUE_SIZE = 100;
  public final int MAX_QUEUE_SLOTS = 1000000;

  // Function called once upon server startup
  public void initializeQueueSlots(Stack<Integer> temp) {
    for (int i = this.MAX_QUEUE_SLOTS; i >= 0; i--) {
      if (i >= queueSet.size() || queueSet.get(i).size() == 0)
        temp.push(i);
    }

    print();
  }

  public void createNewQueue(@NonNull Long queueHolderID, @NonNull Long locationId, String name, int maxQueueSize,
      int averageServiceTime, boolean isActive) {
    checkIfFirstOperation();

    BusinessUser appUser = businessUserRepository.findById(queueHolderID)
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

    // Check if location exists
    Location location = locationRepository.findById(locationId)
        .orElseThrow(() -> new IllegalStateException("Could not find location"));

    // Checking if user already has a slot in memory if not assign one
    int queueLocation = getQueueSlot(queueHolderID);
    ArrayList<Queue<Long>> queueHolderQueue;
    if (queueLocation == -1) {
      int currentSlot = queueSlots.pop();
      try {
        queueHolderQueue = queueSet.get(currentSlot);
      } catch (Exception e) {
        for (int i = queueSet.size(); i < currentSlot + 1; i++)
          queueSet.add(new ArrayList<Queue<Long>>());
        queueHolderQueue = queueSet.get(currentSlot);
      }
      appUser.getPartner().setQueueId(currentSlot);
      queueLocation = currentSlot;
    } else {
      queueHolderQueue = queueSet.get(queueLocation);
    }

    // try {
    // // This currently has an error because the createQRCode method is not static
    // qrCodeService.createQRCode(
    // appUser.getPartner().getId(),
    // queueHolderQueue.size(),
    // String.format(
    // "api/v1/queue/user?partnerId=%d&queueName=%s",
    // appUser.getPartner().getId(),
    // name));
    // } catch (Exception e) {
    // throw new IllegalStateException("Error while creating queue.");
    // }
    Queues createdQueue = queueRepository.save(new Queues(
        name,
        appUser.getPartner(),
        queueLocation,
        queueHolderQueue.size(),
        maxQueueSize,
        location,
        averageServiceTime,
        isActive));
    queueCreationRepository.save(new QueueCreation(createdQueue));
    queueHolderQueue.add(new LinkedList<>());
    partnerRepository.save(appUser.getPartner());
    print();
  }

  public boolean isValidForNewQueue(@NonNull Long queueHolderID) {
    BusinessUser appUserFromDB = businessUserRepository
        .findById(queueHolderID)
        .orElseThrow(() -> new IllegalStateException("Could not find user"));
    int queueId = appUserFromDB.getPartner().getQueueId();
    SubscriptionPlans subscriptionPlan = appUserFromDB.getPartner().getSubscriptionPlan();
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
    int currsize = queueId == -1 ? 0 : queueSet.get(queueId).size();
    print();
    if (queueId == -1 || currsize < max) {
      return true;
    } else {
      return false;
    }
  }

  public int getQueueSlot(@NonNull Long queueHolderID) {
    BusinessUser appUserFromDB = businessUserRepository
        .findById(queueHolderID)
        .orElseThrow(() -> new IllegalStateException("Could not find user"));
    int queueId = appUserFromDB.getPartner().getQueueId();
    return queueId;
  }

  public void enqueueUser(@NonNull String email, @NonNull String queueName) {
    checkIfFirstOperation();

    AppUser user = appUserRepository.findByEmail(email)
        .orElseThrow(() -> new IllegalStateException("Could not find user"));
    Queues currentQueue = queueRepository.findByName(queueName)
        .orElseThrow(() -> new IllegalStateException("Could not find queue with such name"));
    int queueSlot = currentQueue.getPartner().getQueueId();

    // Checking if user has slot in memory
    if (queueSlot == -1) {
      throw new IllegalStateException("User does not have such queue");
    }
    ArrayList<Queue<Long>> queueHolderQueues = queueSet.get(queueSlot);
    try {
      Queue<Long> specificQueue = queueHolderQueues.get(currentQueue.getSpecificSlot());

      // Checking if person is present in queue or if queue is full
      if (presentInQueue(user.getId(), specificQueue)) {
        throw new IllegalStateException("User already in queue");
      }
      if (specificQueue.size() >= currentQueue.getMaxQueueSize()) {
        throw new IllegalStateException(
            "Queue is full at the moment and is not accepting more people. Try again later");
      }
      specificQueue.add(user.getId());
      currentQueue.setPeopleInQueue(currentQueue.getPeopleInQueue() + 1);
    } catch (Exception e) {
      throw new IllegalStateException(e.getMessage());
    }
    queueEnqueueRepository.save(
        new QueueEnqueue(
            user,
            currentQueue,
            QueueEnqueueStatus.ENQUEUED));
    print();
  }

  public AppUser dequeueUser(@NonNull String name, long counterId) {
    checkIfFirstOperation();

    Queues currentQueue = queueRepository.findByName(name)
        .orElseThrow(() -> new IllegalStateException("Could not find queue"));
    int queueSlot = currentQueue.getQueueSlot();

    // Checking if user has slot in memory
    if (queueSlot == -1) {
      throw new IllegalStateException("User does not have a queue setup");
    }
    ArrayList<Queue<Long>> queueHolderQueues = queueSet.get(queueSlot);
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

      QueueCounter queueCounter = queueCounterRepository.findById(counterId)
          .orElseThrow(() -> new IllegalStateException("Could not find counter"));

      queueDequeueRepository
          .save(new QueueDequeue(nextUser, currentQueue, QueueDequeueStatus.SERVED, queueCounter));
      return nextUser;
    } catch (Exception e) {
      print();
      throw new IllegalStateException("Could not remove first user from queue");
    }
  }

  public void dequeueUser(String email, @NonNull String name) {
    checkIfFirstOperation();

    Queues currentQueue = queueRepository.findByName(name)
        .orElseThrow(() -> new IllegalStateException("Could not find queue"));
    int queueSlot = currentQueue.getQueueSlot();

    // Checking if user has slot in memory
    if (queueSlot == -1) {
      throw new IllegalStateException("User does not have a queue setup");
    }
    ArrayList<Queue<Long>> queueHolderQueues = queueSet.get(queueSlot);
    try {

      // Attempting to find queue requested and fetching user from it
      Queue<Long> specificQueue = queueHolderQueues.get(currentQueue.getSpecificSlot());
      if (specificQueue.isEmpty()) {
        return;
      }

      AppUser user = appUserRepository.findByEmail(email)
          .orElseThrow(() -> new IllegalStateException("Could not find user"));
      specificQueue.removeIf(id -> user.getId() == id);
      print();
      currentQueue.setPeopleInQueue(currentQueue.getPeopleInQueue() - 1);
      queueRepository.save(currentQueue);
    } catch (Exception e) {
      print();
      throw new IllegalStateException("Could not remove first user from queue");
    }
  }

  public void deleteQueue(@NonNull String name) {
    checkIfFirstOperation();

    Queues currentQueue = queueRepository.findByName(name)
        .orElseThrow(() -> new IllegalStateException("Could not find queue"));
    int queueSlot = currentQueue.getQueueSlot();
    if (queueSlot == -1) {
      throw new IllegalStateException("User does not have a queue setup");
    }
    ArrayList<Queue<Long>> queueHolderQueues = queueSet.get(queueSlot);
    try {
      queueHolderQueues.set(currentQueue.getSpecificSlot(), null);
    } catch (Exception e) {
      throw new IllegalStateException("User does not have specific queue");
    }
    if (queueHolderQueues.size() == 0) {
      Partner partner = currentQueue.getPartner();
      partner.setQueueId(-1);
      queueSlots.push(queueSlot);
      partnerRepository.save(partner);
    }

    queueDeletionRepository.save(
        new QueueDeletion(currentQueue));
    queueRepository.deleteById(currentQueue.getId());
    print();
  }

  public ArrayList<Queues> currentQueuesOfUser(String email, long locationId, String businessName) {
    checkIfFirstOperation();

    if (businessName != null) {
      Partner partner = partnerRepository.findByName(businessName)
          .orElseThrow(() -> new IllegalStateException("Could not find partner"));

      Location location = locationRepository.findByIdAndPartner(
          locationId, partner)
          .orElseThrow(() -> new IllegalStateException("Could not find location"));

      ArrayList<Queues> currentQueues = queueRepository.findByLocation(location);

      return currentQueues;
    } else {
      BusinessUser appUser = businessUserRepository.findByEmail(email)
          .orElseThrow(() -> new IllegalStateException("Could not find user"));

      Location location = locationRepository.findByIdAndPartner(
          locationId, appUser.getPartner())
          .orElseThrow(() -> new IllegalStateException("Could not find location"));

      ArrayList<Queues> currentQueues = queueRepository.findByLocation(location);

      return currentQueues;
    }
  }

  public ArrayList<Queues> currentQueuesOfUser(long id) {
    checkIfFirstOperation();

    BusinessUser appUser = businessUserRepository.findById(id)
        .orElseThrow(() -> new IllegalStateException("Could not find user"));

    ArrayList<Queues> currentQueues = queueRepository.findByPartner(appUser.getPartner());

    return currentQueues;
  }

  public ArrayList<AppUser> getBeingServed(long appUserId) {
    checkIfFirstOperation();

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
    checkIfFirstOperation();

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
    checkIfFirstOperation();

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

  private void print() {
    for (int i = 0; i < queueSet.size(); i++) {
      ArrayList<Queue<Long>> current = queueSet.get(i);
      for (int j = 0; j < current.size(); j++) {
        System.out.println(current.get(j));
      }
    }
  }

  private ArrayList<ArrayList<Queue<Long>>> initQueue() {
    ArrayList<ArrayList<Queue<Long>>> temp = new ArrayList<>();
    for (int i = 0; i < this.MAX_QUEUE_SLOTS; i++) {
      temp.add(new ArrayList<>());
    }
    return temp;
  }

  private Stack<Integer> initStack() {
    Stack<Integer> temp = new Stack<>();
    initializeQueueSlots(temp);
    return temp;
  }

  public boolean presentInQueue(Long appUser, Queue<Long> queue) {
    checkIfFirstOperation();

    return queue.contains(appUser);
  }

  public boolean presentInQueue(String email, String queueName) {
    checkIfFirstOperation();

    AppUser appUser = appUserRepository.findByEmail(email)
        .orElseThrow(() -> new IllegalStateException("Could not find user with such username"));

    Queues queue = queueRepository.findByName(queueName)
        .orElseThrow(() -> new IllegalStateException("Could not find queue with such name"));

    return presentInQueue(appUser.getId(), queueSet.get(queue.getQueueSlot()).get(queue.getSpecificSlot()));
  }

  public int getWalkIns(Long appUserId, LocalDateTime from, LocalDateTime to) {
    checkIfFirstOperation();

    ArrayList<QueueEnqueue> walkIns = queueEnqueueRepository.findByActionDateBetweenAndAppUserId(from, to, appUserId);
    return walkIns.size();
  }

  public ArrayList<Map<String, ArrayList<AppUser>>> getWaitingInSpecificQueue(Long appUserId, int[] specificQueueIds,
      int maxToShow) {
    checkIfFirstOperation();

    ArrayList<Map<String, ArrayList<AppUser>>> waitingInSpecificQueues = new ArrayList<>();

    // Get app user and queue slot
    BusinessUser user = businessUserRepository.findById(appUserId)
        .orElseThrow(() -> new IllegalStateException("Could not find user with such id"));
    int queueSlot = user.getPartner().getQueueId();
    ArrayList<Queue<Long>> queuesToQuery = queueSet.get(queueSlot);
    ArrayList<Integer> queuesThatCouldNotBeFound = new ArrayList<>();
    // Get all specific queues
    for (int specificQueueId : specificQueueIds) {
      Queue<Long> queue = null;
      try {
        queue = queuesToQuery.get(specificQueueId);
      } catch (IndexOutOfBoundsException e) {
        queuesThatCouldNotBeFound.add(specificQueueId);
        continue;
      }

      // Forming array
      Map<String, ArrayList<AppUser>> queueMapping = new HashMap<>();
      ArrayList<AppUser> usersInQueue = new ArrayList<>();
      int toShow = Math.min(queue.size(), maxToShow);
      for (int i = 0; i < toShow; i++) {

        // TODO: Add users to array list and return
        AppUser userInQueue = appUserRepository.findById(1L).orElse(null);
        if (userInQueue != null)
          usersInQueue.add(userInQueue);
      }
    }
    return null;
  }

  private void checkIfFirstOperation() {
    if (firstOperation.size() != 0)
      return;
    firstOperation.add(true);
    List<Queues> activeQueues = queueRepository.findAll();

    for (Queues queue : activeQueues) {
      if (!queue.isActive())
        continue;

      int queueSlot = queue.getQueueSlot();
      ArrayList<Queue<Long>> queueHolderQueue;
      try {
        queueHolderQueue = queueSet.get(queueSlot);
      } catch (Exception e) {
        for (int i = queueSet.size(); i < queueSlot + 1; i++) {
          queueSet.add(new ArrayList<Queue<Long>>());
        }
        queueHolderQueue = queueSet.get(queueSlot);
      }

      for (int i = queueHolderQueue.size(); i < queue.getSpecificSlot() + 1; i++) {
        queueHolderQueue.add(new LinkedList<>());
      }
    }

    Stack<Integer> temp = new Stack<>();

    for (int i = this.MAX_QUEUE_SLOTS; i >= 0; i--) {
      if (i >= queueSet.size() || queueSet.get(i).size() == 0)
        temp.push(i);
    }

    queueSlots.empty();
    queueSlots.addAll(temp);
    print();
  }
}
