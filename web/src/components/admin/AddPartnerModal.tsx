"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

interface Location {
  id: number;
  city: string;
  stateOrProvince: string;
  country: string;
  googleMapsUrl: string;
}

interface Partner {
  id: number;
  name: string;
  category: string;
  status: "active" | "inactive" | "pending";
  joinedDate: string;
  locations: Location[];
}

interface AddPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  existingPartners: Partner[];
  onSubmit: (partner: Omit<Partner, "id" | "joinedDate">) => void;
  onAddLocation: (partnerId: number, location: Omit<Location, "id">) => void;
}

export default function AddPartnerModal({
  isOpen,
  onClose,
  isDarkMode,
  existingPartners,
  onSubmit,
  onAddLocation,
}: AddPartnerModalProps) {
  const [step, setStep] = useState<"verify" | "new_partner" | "add_location">(
    "verify"
  );
  const [matchedPartner, setMatchedPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Healthcare",
    status: "active" as const,
    locations: [
      {
        city: "",
        stateOrProvince: "",
        country: "",
        googleMapsUrl: "",
      },
    ],
  });

  useEffect(() => {
    if (!isOpen) {
      setStep("verify");
      setMatchedPartner(null);
      setFormData({
        name: "",
        category: "Healthcare",
        status: "active",
        locations: [
          {
            city: "",
            stateOrProvince: "",
            country: "",
            googleMapsUrl: "",
          },
        ],
      });
    }
  }, [isOpen]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setFormData((prev) => ({ ...prev, name: newName }));

    // Check for existing partner with similar name
    const match = existingPartners.find(
      (partner) => partner.name.toLowerCase() === newName.toLowerCase()
    );

    if (match) {
      setMatchedPartner(match);
      setStep("add_location");
    } else {
      setMatchedPartner(null);
      setStep("new_partner");
    }
  };

  const handleAddLocation = () => {
    setFormData((prev) => ({
      ...prev,
      locations: [
        ...prev.locations,
        {
          city: "",
          stateOrProvince: "",
          country: "",
          googleMapsUrl: "",
        },
      ],
    }));
  };

  const handleRemoveLocation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      locations: prev.locations.filter((_, i) => i !== index),
    }));
  };

  const handleLocationChange = (
    index: number,
    field: keyof Location,
    value: string
  ) => {
    // Capitalize every word in the input
    const capitalizedValue = value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    setFormData((prev) => ({
      ...prev,
      locations: prev.locations.map((location, i) =>
        i === index ? { ...location, [field]: capitalizedValue } : location
      ),
    }));

    // Update Google Maps URL when city, state, or country changes
    if (
      field === "city" ||
      field === "stateOrProvince" ||
      field === "country"
    ) {
      const location = formData.locations[index];
      const updatedLocation = {
        ...location,
        [field]: capitalizedValue,
      };

      // Generate Google Maps URL with all location components
      const searchQuery = encodeURIComponent(
        `${updatedLocation.city} ${updatedLocation.stateOrProvince} ${updatedLocation.country}`.trim()
      );

      setFormData((prev) => ({
        ...prev,
        locations: prev.locations.map((loc, i) =>
          i === index
            ? {
                ...updatedLocation,
                googleMapsUrl: `https://maps.google.com/?q=${searchQuery}`,
              }
            : loc
        ),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (matchedPartner) {
      // Add new location to existing partner
      formData.locations.forEach((location) => {
        onAddLocation(matchedPartner.id, location);
      });
    } else {
      // Create new partner with temporary location IDs
      const partnerWithIds = {
        ...formData,
        locations: formData.locations.map((loc, index) => ({
          ...loc,
          id: index + 1,
        })),
      };
      onSubmit(partnerWithIds);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 mx-4 bg-black/50 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`modal__positioning w-full max-w-2xl z-50
              ${
                isDarkMode ? "bg-[#1A1A1A] border border-white/10" : "bg-white"
              } 
              rounded-xl p-6 shadow-2xl backdrop-blur-sm transform-gpu`}
          >
            <h2
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {matchedPartner
                ? `Add Location to ${matchedPartner.name}`
                : "Add New Partner"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 
                  ${isDarkMode ? "text-white/70" : "text-slate-600"}`}
                >
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="Enter company name"
                  className={`w-full px-4 py-2 rounded-lg transition-colors duration-300
                    ${
                      isDarkMode
                        ? "bg-black/20 border border-white/10 text-white focus:border-crystal-blue placeholder:text-white/30"
                        : "border border-slate-200 bg-white text-slate-900 focus:border-crystal-blue placeholder:text-slate-400"
                    }`}
                  required
                />
              </div>

              {step === "new_partner" && (
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 
                    ${isDarkMode ? "text-white/70" : "text-slate-600"}`}
                  >
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className={`w-full px-4 py-2 rounded-lg transition-colors duration-300
                      ${
                        isDarkMode
                          ? "bg-black/20 border border-white/10 text-white focus:border-crystal-blue"
                          : "border border-slate-200 bg-white text-slate-900 focus:border-crystal-blue"
                      }`}
                  >
                    <option value="Healthcare">Healthcare</option>
                    <option value="Banking">Banking</option>
                    <option value="Education">Education</option>
                    <option value="Retail">Retail</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label
                    className={`block text-sm font-medium 
                    ${isDarkMode ? "text-white/70" : "text-slate-600"}`}
                  >
                    Locations
                  </label>
                  <button
                    type="button"
                    onClick={handleAddLocation}
                    className="text-crystal-blue hover:text-crystal-blue/80 transition-colors"
                  >
                    <FaPlus />
                  </button>
                </div>
                {formData.locations.map((location, index) => (
                  <div
                    key={index}
                    className="space-y-4 p-4 rounded-lg border border-dashed border-crystal-blue/30"
                  >
                    <div className="flex justify-between items-center">
                      <h3
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Location {index + 1}
                      </h3>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveLocation(index)}
                          className="text-rose-500 hover:text-rose-600 transition-colors"
                        >
                          <FaMinus />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 
                          ${isDarkMode ? "text-white/70" : "text-slate-600"}`}
                        >
                          Google Maps URL
                        </label>
                        <input
                          type="text"
                          value={location.googleMapsUrl}
                          onChange={(e) =>
                            handleLocationChange(
                              index,
                              "googleMapsUrl",
                              e.target.value
                            )
                          }
                          placeholder="Maps URL"
                          className={`w-full px-4 py-2 rounded-lg transition-colors duration-300
                            ${
                              isDarkMode
                                ? "bg-black/20 border border-white/10 text-white focus:border-crystal-blue placeholder:text-white/30"
                                : "border border-slate-200 bg-white text-slate-900 focus:border-crystal-blue placeholder:text-slate-400"
                            }`}
                          required
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 
                          ${isDarkMode ? "text-white/70" : "text-slate-600"}`}
                        >
                          City
                        </label>
                        <input
                          type="text"
                          value={location.city}
                          onChange={(e) =>
                            handleLocationChange(index, "city", e.target.value)
                          }
                          placeholder="City"
                          className={`w-full px-4 py-2 rounded-lg transition-colors duration-300
                            ${
                              isDarkMode
                                ? "bg-black/20 border border-white/10 text-white focus:border-crystal-blue placeholder:text-white/30"
                                : "border border-slate-200 bg-white text-slate-900 focus:border-crystal-blue placeholder:text-slate-400"
                            }`}
                          required
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 
                          ${isDarkMode ? "text-white/70" : "text-slate-600"}`}
                        >
                          State/Province
                        </label>
                        <input
                          type="text"
                          value={location.stateOrProvince}
                          onChange={(e) =>
                            handleLocationChange(
                              index,
                              "stateOrProvince",
                              e.target.value
                            )
                          }
                          placeholder="State/Province"
                          className={`w-full px-4 py-2 rounded-lg transition-colors duration-300
                            ${
                              isDarkMode
                                ? "bg-black/20 border border-white/10 text-white focus:border-crystal-blue placeholder:text-white/30"
                                : "border border-slate-200 bg-white text-slate-900 focus:border-crystal-blue placeholder:text-slate-400"
                            }`}
                          required
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 
                          ${isDarkMode ? "text-white/70" : "text-slate-600"}`}
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          value={location.country}
                          onChange={(e) =>
                            handleLocationChange(
                              index,
                              "country",
                              e.target.value
                            )
                          }
                          placeholder="Country"
                          className={`w-full px-4 py-2 rounded-lg transition-colors duration-300
                            ${
                              isDarkMode
                                ? "bg-black/20 border border-white/10 text-white focus:border-crystal-blue placeholder:text-white/30"
                                : "border border-slate-200 bg-white text-slate-900 focus:border-crystal-blue placeholder:text-slate-400"
                            }`}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-4 py-2 rounded-lg transition-colors duration-300
                    ${
                      isDarkMode
                        ? "bg-white/[0.02] hover:bg-white/[0.05] text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-slate-900"
                    }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90 transition-colors duration-300"
                >
                  {matchedPartner ? "Add Location" : "Add Partner"}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
