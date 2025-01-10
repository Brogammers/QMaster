package com.que.que.User.BusinessUser;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class BusinessCategory {

    @Id
    @SequenceGenerator(name = "business_category_generator_sequence", sequenceName = "business_category_generator_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "business_category_generator_sequence")
    private Long id;

    private String name;
    private String description;

    @ManyToMany(cascade = CascadeType.DETACH, mappedBy = "businessCategories")
    private List<BusinessUser> businessUsers;

    public BusinessCategory(String name) {
        this.name = name;
        this.description = "";
    }

    public BusinessCategory(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public void addBusinessUser(BusinessUser businessUser) {
        businessUsers.add(businessUser);
    }
}
