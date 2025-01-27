package com.que.que.Location;

import java.util.List;

import org.springframework.stereotype.Service;

import com.que.que.Partner.Partner;
import com.que.que.Partner.PartnerRepository;
import com.que.que.User.BusinessUser.BusinessUser;
import com.que.que.User.BusinessUser.BusinessUserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;
    private final BusinessUserRepository businessUserRepository;
    private final PartnerRepository partnerRepository;

    public Location createLocation(long partnerId, String name, String description, String address,
            double latitude,
            double longitude) {
        Partner partner = partnerRepository.findById(partnerId)
                .orElseThrow(() -> new IllegalStateException("Business with id " + partnerId + " not found"));

        Location location = new Location(
                name,
                address,
                description,
                longitude,
                latitude,
                partner);

        partner.addLocation(location);
        partnerRepository.save(partner);
        return locationRepository.save(location);
    }

    public List<Location> getLocationsByBusinessName(String businessName, String email) {
        if (businessName == null && email == null) {
            throw new IllegalStateException("Business name or email must be provided");
        }

        BusinessUser businessUser;
        if (businessName != null)
            businessUser = businessUserRepository.findByUsername(businessName)
                    .orElseThrow(() -> new IllegalStateException("Business with name " + businessName + " not found"));
        else
            businessUser = businessUserRepository.findByEmail(email)
                    .orElseThrow(() -> new IllegalStateException("Business with email " + email + " not found"));

        List<Location> locations = locationRepository.findByPartner(businessUser.getPartner());

        return locations;
    }
}
