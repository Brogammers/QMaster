package com.que.que.Partner;

import org.springframework.stereotype.Service;

import com.que.que.User.SubscriptionPlans;
import com.que.que.User.BusinessUser.BusinessCategory;
import com.que.que.User.BusinessUser.BusinessCategoryRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PartnerService {

    private final PartnerRepository partnerRepository;
    private final BusinessCategoryRepository businessCategoryRepository;

    public Partner createPartner(String name, String businessCategoryName) {
        BusinessCategory businessCategory = businessCategoryRepository.findByName(businessCategoryName)
                .orElseThrow(() -> new IllegalStateException(
                        "Business category with name " + businessCategoryName + " not found"));

        Partner partner = new Partner(name, businessCategory, SubscriptionPlans.BASIC);

        partnerRepository.save(partner);

        return partner;
    }
}
