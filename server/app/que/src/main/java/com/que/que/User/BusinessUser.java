package com.que.que.User;

import jakarta.persistence.Column;

public class BusinessUser extends User {
    @Column(nullable = false)
    private int queueId; // If queue id is -1 then there is no queue

    @Column(nullable = false)
    private SubscriptionPlans subscriptionPlan;
}
