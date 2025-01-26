"use client";

import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

interface PartnerLocation {
    id: string;
    name: string;
    city: string;
    country: string;
}

interface LocationContextType {
    selectedLocation: PartnerLocation | null;
    locations: PartnerLocation[];
    setSelectedLocation: (location: PartnerLocation) => void;
}

// Mock data - replace with API call later
const MOCK_LOCATIONS: PartnerLocation[] = [];

export const LocationContext = createContext<LocationContextType>({
    selectedLocation: null,
    locations: MOCK_LOCATIONS,
    setSelectedLocation: () => {},
});

export function LocationProvider({ children }: { children: React.ReactNode }) {
    const [selectedLocation, setSelectedLocation] =
        useState<PartnerLocation | null>(null);
    const [locations, setLocations] =
        useState<PartnerLocation[]>(MOCK_LOCATIONS);


    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_API_BASE_URL_GET_BUSINESS_LOCATIONS || "";

        axios.get(url)
        .then((response) => {
            if (response.status === 200) { 
                return response.data.locations;
            } else{ 
                throw new Error("Failed to fetch locations");
            }
        })
        .then((data) => {
            const locationData = data.map((location: any) => {
                return {
                    id: location.id,
                    name: location.name,
                    city: "Cairo",
                    country: "Egypt",
                };
            });

            setLocations(locationData);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        // Set default location as first alphabetically sorted location
        if (!selectedLocation && locations.length > 0) {
            setSelectedLocation(locations[0]);
        }
    }, [locations, selectedLocation]);

    return (
        <LocationContext.Provider
            value={{
                selectedLocation,
                locations,
                setSelectedLocation,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
}

export function useLocation() {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error("useLocation must be used within a LocationProvider");
    }
    return context;
}
