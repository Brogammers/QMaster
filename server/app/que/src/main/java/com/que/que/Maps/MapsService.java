package com.que.que.Maps;

import com.google.maps.GeoApiContext;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.DistanceMatrixApi;

public class MapsService {
    private final GeoApiContext context = new GeoApiContext.Builder().apiKey("key").build(); // Insert key here

    public String getDistanceBetweenTwoLocations(String starting, String ending) {
        DistanceMatrix distanceMatrix;
        try {
            distanceMatrix = DistanceMatrixApi
                    .getDistanceMatrix(context, new String[] { starting }, new String[] { ending }).await();
        } catch (Exception e) {
            throw new IllegalStateException(e.toString());
        }
        if (distanceMatrix == null) {
            throw new IllegalStateException("Could not get data");
        }
        String timeMin = distanceMatrix.rows[0].elements[0].duration.humanReadable;
        String timeMax = distanceMatrix.rows[0].elements[0].durationInTraffic.humanReadable;

        return timeMin + "\n" + timeMax;
    }
}
