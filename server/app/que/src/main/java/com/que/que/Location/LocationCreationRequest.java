package com.que.que.Location;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LocationCreationRequest {
    private Long id;
    private String name;
    private String description;
    private String address;
    private double latitude;
    private double longitude;

    public LocationCreationRequest(Long id, String name, String address, double latitude, double longitude) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.description = "";
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
