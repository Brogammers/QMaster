package com.que.que.Location;

import java.util.List;

import org.springframework.stereotype.Service;

import com.que.que.Location.OpeningHours.OpeningHours;
import com.que.que.Location.OpeningHours.OpeningHoursRepository;
import com.que.que.Location.OpeningHours.OpeningHoursService;
import com.que.que.Partner.Partner;
import com.que.que.Partner.PartnerRepository;
import com.que.que.QRcode.QRCodeService;
import com.que.que.User.BusinessUser.BusinessUserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;
    private final BusinessUserRepository businessUserRepository;
    private final PartnerRepository partnerRepository;
    private final QRCodeService qrCodeService;
    private final OpeningHoursService openingHoursService;
    private final OpeningHoursRepository openingHoursRepository;
    private final String[] daysOfTheWeek = { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
            "Sunday" };

    public Location createLocation(long partnerId, String name, String description, String address,
            double latitude,
            double longitude) {
        Partner partner = partnerRepository.findById(partnerId)
                .orElseThrow(() -> new IllegalStateException("Business with id " + partnerId + " not found"));

        List<Location> locations = locationRepository.findByPartner(partner);

        for (Location location : locations) {
            if (location.getName().equals(name)) {
                throw new IllegalStateException("Location with name " + name + " already exists");
            }
        }

        Location location = new Location(
                name,
                address,
                description,
                longitude,
                latitude,
                partner);

        partner.addLocation(location);
        partnerRepository.save(partner);

        OpeningHours[] openingHours = new OpeningHours[daysOfTheWeek.length];

        for (int i = 0; i < daysOfTheWeek.length; i++) {
            String day = daysOfTheWeek[i];
            openingHours[i] = openingHoursService.createOpeningHours(location, day, "09:00", "17:00", true);
            openingHoursRepository.save(openingHours[i]);
        }

        for (OpeningHours openingHour : openingHours)
            location.addOpeningHours(openingHour);

        try {
            qrCodeService.createQRCode(partner.getId(), String.format(
                    "api/v1/queue/user?partnerId=%d&locationId=%d",
                    partner.getId(),
                    location.getId()), location.getId());
        } catch (Exception e) {
            throw new IllegalStateException("Failed to create QR code for partner");
        }

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
