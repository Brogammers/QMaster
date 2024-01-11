package com.que.que.Queue;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import com.que.que.User.AppUser;
import com.que.que.User.AppUserRepository;

import lombok.AllArgsConstructor;

@Service
@Configuration
@AllArgsConstructor
public class QueueService {
    private final AppUserRepository appUserRepository;
    private final QueueCreationRepository queueCreationRepository;
    private final QueueDequeueRepository queueDequeueRepository;
    private final QueueEnqueueRepository queueEnqueueRepository;
    private final QueueDeletionRepository queueDeletionRepository;
    private final ArrayList<ArrayList<Queue<Long>>> queue = queue();
    private final Stack<Integer> queueSlots = stack();

    public void initializeQueueSlots(Stack<Integer> temp) {
        for (int i = 1000000; i >= 0; i--) {
            temp.push(i);
        }
        print();
    }

    public void createNewQueue(Long queueHolderID) {
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
            AppUser appUser = appUserRepository.findById(queueHolderID).orElse(null);
            appUser.setQueueId(currentSlot);
        } else {
            queueHolderQueue = queue.get(queueLocation);
        }
        queueHolderQueue.add(new LinkedList<>());
        queueCreationRepository.save(new QueueCreation(appUserRepository
                .findById(queueHolderID).orElseThrow(() -> new IllegalStateException("Could not find user"))));
        print();
    }

    public boolean isValidForNewQueue(Long queueHolderID) {
        AppUser appUserFromDB = appUserRepository.findById(queueHolderID)
                .orElseThrow(() -> new IllegalStateException("Could not find user"));
        int queueId = appUserFromDB.getQueueId();
        print();
        if (queueId == -1) {
            return true;
        } else {
            return false;
        }
    }

    public int getQueueSlot(Long queueHolderID) {
        AppUser appUserFromDB = appUserRepository.findById(queueHolderID)
                .orElseThrow(() -> new IllegalStateException("Could not find user"));
        int queueId = appUserFromDB.getQueueId();
        return queueId;
    }

    public void enqueueUser(Long queueHolderId, Long appUser, int specificQueueId) {
        int queueSlot = getQueueSlot(queueHolderId);
        if (queueSlot == -1) {
            throw new IllegalStateException("User does not have a queue setup");
        }
        ArrayList<Queue<Long>> queueHolderQueues = queue.get(queueSlot);
        try {
            Queue<Long> specificQueue = queueHolderQueues.get(specificQueueId);
            appUserRepository.findById(appUser).orElseThrow(() -> new IllegalStateException("No user with such id"));
            specificQueue.add(appUser);
        } catch (Exception e) {
            throw new IllegalStateException("Could not add user to queue");
        }
        queueEnqueueRepository.save(new QueueEnqueue(
                appUserRepository.findById(queueHolderId)
                        .orElseThrow(() -> new IllegalStateException("Could not find user"))));
        print();
    }

    public AppUser dequeueUser(Long queueHolderId, int specificQueueId) {
        int queueSlot = getQueueSlot(queueHolderId);
        if (queueSlot == -1) {
            throw new IllegalStateException("User does not have a queue setup");
        }
        ArrayList<Queue<Long>> queueHolderQueues = queue.get(queueSlot);
        try {
            Queue<Long> specificQueue = queueHolderQueues.get(specificQueueId);
            if (specificQueue.isEmpty()) {
                return null;
            }
            print();
            AppUser nextUser = appUserRepository.findById(specificQueue.poll())
                    .orElseThrow(() -> new IllegalStateException("Could not find user"));
            queueDequeueRepository.save(new QueueDequeue(nextUser));
            return nextUser;
        } catch (Exception e) {
            print();
            throw new IllegalStateException("Could not remove first user from queue");
        }
    }

    public void deleteQueue(Long queueHolderId, int specificQueueId) {
        int queueSlot = getQueueSlot(queueHolderId);
        if (queueSlot == -1) {
            throw new IllegalStateException("User does not have a queue setup");
        }
        ArrayList<Queue<Long>> queueHolderQueues = queue.get(queueSlot);
        try {
            queueHolderQueues.remove(specificQueueId);
        } catch (Exception e) {
            throw new IllegalStateException("User does not have specific queue");
        }
        if (queueHolderQueues.size() == 0) {
            AppUser appUser = appUserRepository.findById(queueHolderId).orElse(null);
            appUser.setQueueId(-1);
        }
        queueDeletionRepository.save(new QueueDeletion(
                appUserRepository.findById(queueHolderId)
                        .orElseThrow(() -> new IllegalStateException("Could not find user"))));
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
