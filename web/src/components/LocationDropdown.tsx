"use client";

import React from "react";
import { Select } from "antd";
import { useLocation } from "@/ctx/LocationContext";

export default function LocationDropdown() {
  const { selectedLocation, locations, setSelectedLocation } = useLocation();

  return (
    <div className="flex items-center gap-2">
      <Select
        value={selectedLocation?.id}
        onChange={(value) => {
          const location = locations.find((loc) => loc.id === value);
          if (location) setSelectedLocation(location);
        }}
        style={{ width: 250 }}
        className="!rounded-full !bg-ocean-blue/10 !border-ocean-blue"
        options={locations.map((location) => ({
          value: location.id,
          label: (
            <div className="flex flex-col">
              <span className="font-medium">{location.branchName}</span>
              <span className="text-xs text-gray-500">
                {location.name} • {location.city}, {location.country}
              </span>
            </div>
          ),
        }))}
      />
    </div>
  );
}
