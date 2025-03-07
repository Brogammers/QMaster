"use client";

import React from "react";
import { Select } from "antd";
import { useLocation } from "@/ctx/LocationContext";
import { useRole } from "@/ctx/RoleContext";

export default function LocationDropdown() {
  const { selectedLocation, locations, setSelectedLocation } = useLocation();
  const { hasBranchAccess } = useRole();

  // Filter locations based on branch access
  const accessibleLocations = locations.filter((location) =>
    hasBranchAccess(location.id)
  );

  return (
    <div className="flex items-center gap-2">
      <Select
        value={selectedLocation?.id}
        onChange={(value) => {
          const location = accessibleLocations.find((loc) => loc.id === value);
          if (location) setSelectedLocation(location);
        }}
        style={{ width: 250 }}
        className="!rounded-full !bg-ocean-blue/10 !border-ocean-blue"
        options={accessibleLocations.map((location) => ({
          value: location.id,
          label: (
            <div className="flex flex-col">
              <span className="font-medium">{location.name}</span>
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
