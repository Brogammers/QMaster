package com.que.que.Maps;

import com.google.maps.GeoApiContext;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.DistanceMatrixElementStatus;

import org.springframework.stereotype.Service;

import com.google.maps.DistanceMatrixApi;

@Service
public class MapsService {
    private final GeoApiContext context = new GeoApiContext.Builder().apiKey("key").build(); // TODO: Insert key here

    public String getDistanceBetweenTwoLocations(String starting, String ending) {
        DistanceMatrix distanceMatrix;

        // Fetching Distance matrix with given locations
        try {
            distanceMatrix = DistanceMatrixApi
                    .getDistanceMatrix(context, new String[] { starting }, new String[] { ending }).await();
        } catch (Exception e) {
            throw new IllegalStateException(e.toString());
        }

        // Checking status
        if (distanceMatrix == null || distanceMatrix.rows.length < 1) {
            throw new IllegalStateException("Could not get data");
        }
        if ((distanceMatrix.rows[0].elements[0].status).equals(DistanceMatrixElementStatus.NOT_FOUND)) {
            throw new IllegalStateException("Locations were not found");
        } else if ((distanceMatrix.rows[0].elements[0].status).equals(DistanceMatrixElementStatus.ZERO_RESULTS)) {
            throw new IllegalStateException("No results were found");
        }

        // Returning the min time and max time (Time in traffic)
        String timeMin = distanceMatrix.rows[0].elements[0].duration.humanReadable;
        String timeMax = distanceMatrix.rows[0].elements[0].durationInTraffic.humanReadable;

        return timeMin + "\n" + timeMax;
    }
}
