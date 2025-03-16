"use client";

import { Location, Partner } from "@/app/(admin)/admin/partners/page";
import { useCategory } from "@/app/(admin)/context";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";

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
  const { categories } = useCategory();
  const [matchedPartner, setMatchedPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: categories[0].name,
    status: "active" as const,
    locations: [
      {
        city: "",
        name: "",
        address: "",
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
          category: categories[0].name,
          status: "active",
          locations: [
              {
                  city: "",
                  name: "",
                  address: "",
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
                name: "",
                address: "",
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
      field === "address" ||
      field === "country"
    ) {
      const location = formData.locations[index];
      const updatedLocation = {
        ...location,
        [field]: capitalizedValue,
      };

      // Generate Google Maps URL with all location components
      const searchQuery = encodeURIComponent(
        `${updatedLocation.city} ${updatedLocation.address} ${updatedLocation.country}`.trim()
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 mx-4 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`${
          isDarkMode
            ? "bg-slate-900 border-white/[0.1]"
            : "bg-white border-slate-200"
        } relative w-full max-w-2xl p-6 rounded-xl border shadow-2xl max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-xl font-semibold ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {matchedPartner
              ? `Add Location to ${matchedPartner.name}`
              : "Add New Partner"}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 hover:bg-white/[0.05] rounded-lg ${
              isDarkMode ? "text-white/70" : "text-slate-600"
            }`}
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
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
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
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
                  <div className="col-span-2">
                    <div>
                    <label
                      className={`block text-sm font-medium mb-2 
                      ${isDarkMode ? "text-white/70" : "text-slate-600"}`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={location.name}
                      onChange={(e) =>
                        handleLocationChange(index, "name", e.target.value)
                      }
                      placeholder="Name"
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
                      Country
                    </label>
                    <input
                      type="text"
                      value={location.country}
                      onChange={(e) =>
                        handleLocationChange(index, "country", e.target.value)
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
                      Address
                    </label>
                    <input
                      type="text"
                      value={location.address}
                      onChange={(e) =>
                        handleLocationChange(
                          index,
                          "address",
                          e.target.value
                        )
                      }
                      placeholder="Address"
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
    </div>
  );
}
