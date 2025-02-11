package com.que.que.Location.OpeningHours;

import org.springframework.stereotype.Service;

import com.que.que.Location.Location;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OpeningHoursService {
    OpeningHoursRepository openingHoursRepository;

    public OpeningHours createOpeningHours(Location location, String day, String openTime, String closeTime,
            boolean isOpen) {
        OpeningHours openingHours = new OpeningHours(day, openTime, closeTime, location, isOpen);
        return openingHoursRepository.save(openingHours);
    }
}
