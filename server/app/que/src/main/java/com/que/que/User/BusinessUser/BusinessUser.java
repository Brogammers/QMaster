package com.que.que.User.BusinessUser;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.que.que.User.SubscriptionPlans;
import com.que.que.User.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@JsonSerialize(using = BusinessUserSerializer.class)
public class BusinessUser extends User {
    @Column(nullable = false)
    private int queueId; // If queue id is -1 then there is no queue

    @Column(nullable = false)
    private SubscriptionPlans subscriptionPlan;
}
