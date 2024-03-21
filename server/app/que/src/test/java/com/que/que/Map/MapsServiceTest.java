package com.que.que.Map;

import org.junit.Test;

import com.que.que.Maps.MapsService;

import static org.junit.Assert.*;

public class MapsServiceTest {

    /**
     * Test case for the getDistanceBetweenTwoLocations method in the MapsService
     * class.
     * This method tests the functionality of calculating the distance between two
     * locations.
     */
    @Test
    public void testGetDistanceBetweenTwoLocations() {
        MapsService mapsService = new MapsService();

        // Test case 1: Valid locations
        String starting1 = "New York, USA";
        String ending1 = "Los Angeles, USA";
        String expectedTimeMin1 = "40 hours 30 mins";
        String expectedTimeMax1 = "45 hours 15 mins";
        String actualTime1 = mapsService.getDistanceBetweenTwoLocations(starting1, ending1);
        assertEquals(expectedTimeMin1 + "\n" + expectedTimeMax1, actualTime1);

        // Test case 2: Invalid locations
        String starting2 = "Invalid Location";
        String ending2 = "Another Invalid Location";
        try {
            mapsService.getDistanceBetweenTwoLocations(starting2, ending2);
            fail("Expected IllegalStateException to be thrown");
        } catch (IllegalStateException e) {
            assertEquals("Locations were not found", e.getMessage());
        }

        // Test case 3: No results
        String starting3 = "London, UK";
        String ending3 = "Paris, France";
        try {
            mapsService.getDistanceBetweenTwoLocations(starting3, ending3);
            fail("Expected IllegalStateException to be thrown");
        } catch (IllegalStateException e) {
            assertEquals("No results were found", e.getMessage());
        }
    }
}