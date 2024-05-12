package com.que.que.User.BusinessUser;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.que.que.User.SubscriptionPlans;
import com.que.que.User.User;
import com.que.que.User.AppUser.AppUserRole;

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

    public BusinessUser(
            AppUserRole appUserRole,
            String firstName,
            String lastName,
            String username,
            LocalDateTime dateOfRegistration,
            LocalDate dateOfBirth,
            String countryOfOrigin,
            String password,
            String email,
            boolean locked,
            boolean enabled,
            String phoneCode,
            String phoneNumber,
            String location,
            SubscriptionPlans subscriptionPlan) {
        super(appUserRole, firstName, lastName, username, dateOfRegistration, dateOfBirth, countryOfOrigin, password,
                email,
                locked, enabled, phoneCode, phoneNumber, location);
        this.subscriptionPlan = subscriptionPlan;
        this.queueId = -1;
    }
}
