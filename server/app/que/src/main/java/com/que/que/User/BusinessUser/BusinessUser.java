package com.que.que.User.BusinessUser;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.que.que.Store.Store;
import com.que.que.User.SubscriptionPlans;
import com.que.que.User.User;
import com.que.que.User.UserRole;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToMany;
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
    private List<Store> stores = new ArrayList<>();

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

    public void addStore(Store store) {
        this.stores.add(store);
    }

    public void addBusinessCategory(BusinessCategory businessCategory) {
        this.businessCategories.add(businessCategory);
    }
}
