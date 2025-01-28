package com.que.que.User.BusinessUser;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.que.que.Partner.Partner;

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
@Setter
@Getter
@NoArgsConstructor
@JsonSerialize(using = BusinessCategorySerializer.class)
public class BusinessCategory {

    @Id
    @SequenceGenerator(name = "business_category_generator_sequence", sequenceName = "business_category_generator_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "business_category_generator_sequence")
    private Long id;

    @Column(nullable = false)
    private String name;
    private String description;
    private String status = "active";

    @OneToMany(mappedBy = "businessCategory")
    private Set<Partner> partners = new HashSet<>();

    public BusinessCategory(String name) {
        this.name = name;
        this.description = "";
    }

    public BusinessCategory(String name, String description, String status) {
        this.name = name;
        this.description = description;
        if (status != null && (status.equals("active") || status.equals("inactive")))
            this.status = status;
        else
            throw new IllegalStateException("Invalid status");
    }

    public void addPartner(Partner partner) {
        partners.add(partner);
    }
}
