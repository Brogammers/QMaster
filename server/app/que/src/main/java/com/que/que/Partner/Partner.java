package com.que.que.Partner;

import java.util.List;
import java.util.ArrayList;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.que.que.Location.Location;
import com.que.que.User.BusinessUser.BusinessUser;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@JsonSerialize(using = PartnerSerializer.class)
public class Partner {

    @Id
    @SequenceGenerator(name = "partner_sequence", sequenceName = "partner_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "partner_sequence")
    private Long id;

    @OneToMany(mappedBy = "partner")
    private List<BusinessUser> businessUsers = new ArrayList<>();

    @Column(unique = true)
    private String name;

    @OneToMany(mappedBy = "partner")
    private List<Location> locations = new ArrayList<>();

    private int queueId = -1;

    public Partner(String name) {
        this.name = name;
    }

    public void addBusinessUser(BusinessUser businessUser) {
        businessUsers.add(businessUser);
    }

    public void addLocation(Location location) {
        locations.add(location);
    }
}
