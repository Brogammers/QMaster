package com.que.que.Partner;

import java.util.List;

import org.springframework.stereotype.Service;

import com.que.que.Location.LocationService;
import com.que.que.Registration.PartnerLocationCreationRequest;
import com.que.que.User.SubscriptionPlans;
import com.que.que.User.BusinessUser.BusinessCategory;
import com.que.que.User.BusinessUser.BusinessCategoryRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PartnerService {

    private final PartnerRepository partnerRepository;
    private final BusinessCategoryRepository businessCategoryRepository;
    private final LocationService locationService;

    public Partner createPartner(String name, String businessCategoryName) {
        BusinessCategory businessCategory = businessCategoryRepository.findByName(businessCategoryName)
                .orElseThrow(() -> new IllegalStateException(
                        "Business category with name " + businessCategoryName + " not found"));

        Partner partner = new Partner(name, businessCategory, SubscriptionPlans.BASIC);

        partnerRepository.save(partner);

        return partner;
    }

    public Partner createPartner(String name, String businessCategoryName,
            List<PartnerLocationCreationRequest> locations) {
        BusinessCategory businessCategory = businessCategoryRepository.findByName(businessCategoryName)
                .orElseThrow(() -> new IllegalStateException(
                        "Business category with name " + businessCategoryName + " not found"));

        Partner partner = new Partner(name, businessCategory, SubscriptionPlans.BASIC);

        partnerRepository.save(partner);

        for (PartnerLocationCreationRequest location : locations) {
            partner.addLocation(locationService.createLocation(partner, location.getName(), "",
                    location.getAddress(), location.getLatitude(), location.getLongitude()));
        }

        return partnerRepository.save(partner);
    }
}
