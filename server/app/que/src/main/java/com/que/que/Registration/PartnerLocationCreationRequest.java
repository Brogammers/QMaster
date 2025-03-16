package com.que.que.Registration;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PartnerLocationCreationRequest {
    String city;
    String country;
    String address;
    double latitude;
    double longitude;
    String name;
    String googleMapsUrl;
}