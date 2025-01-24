package com.que.que.Location;

import java.util.List;

import org.springframework.stereotype.Service;

import com.que.que.User.User;
import com.que.que.User.UserRepository;
import com.que.que.User.BusinessUser.BusinessUser;
import com.que.que.User.BusinessUser.BusinessUserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;
    private final BusinessUserRepository businessUserRepository;
    private final UserRepository userRepository;

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

    public List<Location> getLocationsByBusinessName(String businessName) {
        User businessUser = userRepository.findByUsername(businessName)
                .orElseThrow(() -> new IllegalStateException("Business with name " + businessName + " not found"));

        if (!(businessUser instanceof BusinessUser)) {
            throw new IllegalStateException("Business with name " + businessName + " not found");
        }
        List<Location> locations = locationRepository.findAllByBusinessUser((BusinessUser) businessUser);

        return locations;
    }
}
