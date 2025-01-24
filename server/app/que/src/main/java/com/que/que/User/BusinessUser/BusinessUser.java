package com.que.que.User.BusinessUser;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.que.que.Location.Location;
import com.que.que.User.SubscriptionPlans;
import com.que.que.User.User;
import com.que.que.User.UserRole;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
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

    @Column(nullable = false, columnDefinition = "integer default -1")
    private int queueId;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "businessUser")
    private List<Location> locations = new ArrayList<>();

    @ManyToMany
    private Set<BusinessCategory> businessCategories = new HashSet<>();

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
            SubscriptionPlans subscriptionPlan) {
        super(appUserRole, firstName, lastName, username, dateOfRegistration,
                dateOfBirth, countryOfOrigin, password, email, locked, enabled,
                phoneCode, phoneNumber, location);

        UserRole[] roles = { UserRole.BUSINESS_ADMIN, UserRole.BUSINESS_EMPLOYEE, UserRole.BUSINESS_MANAGER,
                UserRole.BUSINESS_OWNER };
        if (Arrays.stream(roles).noneMatch(role -> role.equals(appUserRole))) {
            throw new IllegalArgumentException("Invalid user role for business user");
        }

        this.subscriptionPlan = subscriptionPlan;
        this.queueId = -1;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public void addLocation(Location location) {
        this.locations.add(location);
    }

    public void addBusinessCategory(BusinessCategory businessCategory) {
        this.businessCategories.add(businessCategory);
    }
}
