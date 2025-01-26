package com.que.que.Location;

import java.util.List;

import org.springframework.stereotype.Service;

import com.que.que.User.BusinessUser.BusinessUser;
import com.que.que.User.BusinessUser.BusinessUserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;
    private final BusinessUserRepository businessUserRepository;

    public Location createLocation(long businessUserId, String name, String description, String address,
            double latitude,
            double longitude) {
        // TODO: Add validation
        BusinessUser businessUser = businessUserRepository.findById(businessUserId)
                .orElseThrow(() -> new IllegalStateException("Business user with id " + businessUserId + " not found"));

        Location location = new Location(
                name,
                address,
                description,
                longitude,
                latitude);

        location.addBusinessUser(businessUser);
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

        List<Location> locations = locationRepository.findByBusinessUser(businessUser);

        return locations;
    }
}
