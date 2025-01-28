package com.que.que.User.BusinessUser;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.que.que.Partner.Partner;
import com.que.que.User.SubscriptionPlans;
import com.que.que.User.User;
import com.que.que.User.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SubscriptionPlans subscriptionPlan;

    @ManyToOne
    @JoinColumn(name = "partner_id")
    private Partner partner;

    public BusinessUser(
            UserRole appUserRole,
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
            SubscriptionPlans subscriptionPlan,
            Partner partner) {
        super(appUserRole, firstName, lastName, username, dateOfRegistration,
                dateOfBirth, countryOfOrigin, password, email, locked, enabled,
                phoneCode, phoneNumber, location);

        UserRole[] roles = { UserRole.BUSINESS_ADMIN, UserRole.BUSINESS_EMPLOYEE, UserRole.BUSINESS_MANAGER,
                UserRole.BUSINESS_OWNER };
        if (Arrays.stream(roles).noneMatch(role -> role.equals(appUserRole))) {
            throw new IllegalArgumentException("Invalid user role for business user");
        }

        this.subscriptionPlan = subscriptionPlan;
        this.partner = partner;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}
