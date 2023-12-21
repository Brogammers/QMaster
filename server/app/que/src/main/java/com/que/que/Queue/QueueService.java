package com.que.que.Queue;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

import org.springframework.stereotype.Service;

import com.que.que.User.AppUser;
import com.que.que.User.AppUserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class QueueService {
    private final AppUserRepository appUserRepository;
    private final ArrayList<ArrayList<Queue<Long>>> queue;
    private final Stack<Integer> queueSlots;
    private boolean initializeQueueSlots;

    public void initializeQueueSlots() {
        for (int i = 1000000; i >= 0; i++) {
            queueSlots.add(i);
        }
        print();
    }

    public void createNewQueue(Long queueHolderID) {
        if (!initializeQueueSlots) {
            initializeQueueSlots();
            initializeQueueSlots = true;
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
        } else {
            queueHolderQueue = queue.get(queueLocation);
        }
        queueHolderQueue.add(new LinkedList<>());
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
            specificQueue.add(appUser);
        } catch (Exception e) {
            throw new IllegalStateException("Could not add user to queue");
        }
        print();
    }

    public Long dequeueUser(Long queueHolderId, int specificQueueId) {
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
            return specificQueue.poll();
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
        print();
    }

    public void print() {
        for (int i = 0; i < queue.size(); i++) {
            ArrayList<Queue<Long>> current = queue.get(i);
            for (int j = 0; j < current.size(); j++) {
                System.out.println(current.get(0));
            }
        }
    }
}
