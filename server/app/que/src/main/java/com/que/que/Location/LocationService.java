package com.que.que.Location;

import java.util.List;

import org.springframework.stereotype.Service;

import com.que.que.Partner.Partner;
import com.que.que.Partner.PartnerRepository;
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

        Partner partner;
        if (businessName != null)
            partner = partnerRepository.findByName(businessName)
                    .orElseThrow(() -> new IllegalStateException("Business with name " + businessName + " not found"));
        else
            partner = businessUserRepository.findByEmail(email)
                    .orElseThrow(() -> new IllegalStateException("Business with email " + email + " not found"))
                    .getPartner();

        List<Location> locations = locationRepository.findByPartner(partner);

        return locations;
    }
}
