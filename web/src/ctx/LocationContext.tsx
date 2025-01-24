"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface PartnerLocation {
  id: string;
  name: string;
  branchName: string;
  city: string;
  country: string;
}

interface LocationContextType {
  selectedLocation: PartnerLocation | null;
  locations: PartnerLocation[];
  setSelectedLocation: (location: PartnerLocation) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

// Mock data - replace with API call later
const MOCK_LOCATIONS: PartnerLocation[] = [
  {
    id: "1",
    name: "Arabiata Restaurant",
    branchName: "Maadi Branch",
    city: "Cairo",
    country: "Egypt",
  },
  {
    id: "2",
    name: "Arabiata Restaurant",
    branchName: "Nasr City Branch",
    city: "Cairo",
    country: "Egypt",
  },
  {
    id: "3",
    name: "Arabiata Restaurant",
    branchName: "Zamalek Branch",
    city: "Cairo",
    country: "Egypt",
  },
].sort((a, b) => a.branchName.localeCompare(b.branchName));

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [selectedLocation, setSelectedLocation] =
    useState<PartnerLocation | null>(null);
  const [locations] = useState<PartnerLocation[]>(MOCK_LOCATIONS);

  useEffect(() => {
    // Set default location as first alphabetically sorted location
    if (!selectedLocation && locations.length > 0) {
      setSelectedLocation(locations[0]);
    }
  }, []);

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
