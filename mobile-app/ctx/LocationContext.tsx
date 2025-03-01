import React, { createContext } from "react";

interface LocationContextType {
  locationData: Array<{
    label: string;
    value: number;
    id: number;
    address: string;
  }>;
  setLocationData: React.Dispatch<React.SetStateAction<any>>;
  currentLocation: number | null;
  setCurrentLocation: React.Dispatch<React.SetStateAction<number | null>>;
}

export const LocationContext = createContext<LocationContextType>({
  locationData: [],
  setLocationData: () => {},
  currentLocation: null,
  setCurrentLocation: () => {},
}); 