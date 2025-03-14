"use client";

import { useContext, useEffect, useState } from "react";
import {
  FaBuilding,
  FaPlus,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AddPartnerModal from "@/components/admin/AddPartnerModal";
import axios from "axios";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../layout";
import toast from "react-hot-toast";
import { usePartner } from "../../context";

export interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  googleMapsUrl: string;
}

export interface Partner {
  id: number;
  name: string;
  category: string;
  status: "active" | "inactive" | "pending";
  joinedDate: string;
  locations: Location[];
}

export default function PartnersPage() {
  const { partners, setPartners } = usePartner();
  const [isDarkMode] = useState(false);
  const [expandedPartnerId, setExpandedPartnerId] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const togglePartnerExpansion = (partnerId: number) => {
    setExpandedPartnerId(expandedPartnerId === partnerId ? null : partnerId);
  };

  const handleAddPartner = (
    partnerData: Omit<Partner, "id" | "joinedDate">
  ) => {
    const url =
      process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_REGISTER_BUSINESS || "";

    const requestBody = {
      name: partnerData.name,
      category: partnerData.category,
      status: partnerData.status,
      locations: partnerData.locations.map((location) => ({
        city: location.city,
        name: location.name,
        address: location.address,
        country: location.country,
        googleMapsUrl: location.googleMapsUrl,
        logitude: 0, // TODO: Implement location coordinates
        latitude: 0,
      })),
    }
    axios
    .post(url, requestBody)
    .then((response) => {
      if (response.status === 201) {
        return response.data.partner;
      } else { 
        throw new Error("Failed to add partner");
      }
    })
    .then((data) => {
      console.log(data);
      const newPartner: Partner = {
          ...partnerData,
          id: data.id,
          joinedDate: new Date().toISOString().split("T")[0],
          locations: partnerData.locations.map((location, index) => ({
              ...location,
              id: index + 1, // TODO: Update location id with server
          })),
      };
      setPartners((prev: Partner[]) => [...prev, newPartner]);
    })
    .catch((error) => {
      console.error(error);
      toast.error("Failed to add partner");
    });
  };

  const handleAddLocation = (
    partnerId: number,
    locationData: Omit<Location, "id">
  ) => {

    const url = process.env.NEXT_PUBLIC_API_BASE_URL_GET_BUSINESS_LOCATIONS || "";
    
    const requestBody = {  
      id: partnerId,
      city: locationData.city,
      name: locationData.name,
      address: locationData.address,
      country: locationData.country,
      googleMapsUrl: locationData.googleMapsUrl,
      description: "", // TODO: Add description section
      logitude: 0, // TODO: Implement location coordinates
      latitude: 0,
    };
    axios
      .post(url, requestBody)
      .then((response) => {
        if (response.status === 201) {
          return response.data.location;
        } else {
          throw new Error("Failed to add location");
        }
      })
      .then((data) => {
        console.log(data);
        setPartners((prev) =>
            prev.map((partner) => {
                if (partner.id === partnerId) {
                    return {
                        ...partner,
                        locations: [
                            ...partner.locations,
                            {
                                ...locationData,
                                id: data.id,
                            },
                        ],
                    };
                }
                return partner;
            })
        );
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to add location");
      });
  };

  const filteredPartners = partners.filter((partner) => {
    const searchLower = searchQuery.toLowerCase();

    // Search in partner details
    if (
      partner.name.toLowerCase().includes(searchLower) ||
      partner.category.toLowerCase().includes(searchLower) ||
      partner.status.toLowerCase().includes(searchLower)
    ) {
      return true;
    }

    // Search in locations
    return partner.locations.some(
      (location) =>
        location.city.toLowerCase().includes(searchLower) ||
        location.name.toLowerCase().includes(searchLower) ||
        location.country.toLowerCase().includes(searchLower) ||
        location.googleMapsUrl.toLowerCase().includes(searchLower) ||
        location.address.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-slate-900"
          }`}
        >
          Partners
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90"
        >
          <FaPlus /> Add Partner
        </button>
      </div>

      <div
        className={`${
          isDarkMode
            ? "border-y border-white/[0.05]"
            : "border-y border-slate-300"
        } overflow-hidden backdrop-blur-sm`}
      >
        <div
          className={`p-4 border-b ${
            isDarkMode ? "border-white/[0.05]" : "border-slate-300"
          }`}
        >
          <div className="relative">
            <FaSearch
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? "text-gray-400" : "text-slate-400"
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search partners..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg transition-colors duration-300
                ${
                  isDarkMode
                    ? "border-white/10 bg-white/[0.09] text-white focus:border-crystal-blue"
                    : "border-slate-300 bg-white/[0.04] text-slate-900 focus:border-crystal-blue"
                } 
                border focus:outline-none focus:ring-2 focus:ring-crystal-blue`}
            />
          </div>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr
                    className={`border-b ${
                      isDarkMode ? "border-white/10" : "border-slate-300"
                    }`}
                  >
                    <th
                      className={`whitespace-nowrap px-6 py-3 text-left text-sm font-semibold ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Partner
                    </th>
                    <th
                      className={`whitespace-nowrap px-6 py-3 text-left text-sm font-semibold ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Category
                    </th>
                    <th
                      className={`whitespace-nowrap px-6 py-3 text-left text-sm font-semibold ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Locations
                    </th>
                    <th
                      className={`whitespace-nowrap px-6 py-3 text-left text-sm font-semibold ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Status
                    </th>
                    <th
                      className={`whitespace-nowrap px-6 py-3 text-left text-sm font-semibold ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Joined Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPartners.map((partner) => (
                    <>
                      <tr
                        key={partner.id}
                        className={`border-b ${
                          isDarkMode
                            ? "border-white/10 hover:bg-white/[0.02]"
                            : "border-slate-300 hover:bg-slate-50/50"
                        } cursor-pointer`}
                        onClick={() => togglePartnerExpansion(partner.id)}
                      >
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full ${
                                isDarkMode
                                  ? "bg-crystal-blue/20"
                                  : "bg-crystal-blue/10"
                              } flex items-center justify-center ${
                                isDarkMode ? "text-white" : "text-slate-900"
                              }`}
                            >
                              <FaBuilding className="w-4 h-4" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-medium ${
                                  isDarkMode ? "text-white" : "text-slate-900"
                                }`}
                              >
                                {partner.name}
                              </span>
                              {expandedPartnerId === partner.id ? (
                                <FaChevronUp className="w-3 h-3" />
                              ) : (
                                <FaChevronDown className="w-3 h-3" />
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={`whitespace-nowrap px-3 py-1 rounded-full text-sm 
                            ${
                              partner.category === "Healthcare"
                                ? isDarkMode
                                  ? "bg-emerald-500/10 text-emerald-300"
                                  : "bg-emerald-500/20 text-emerald-700"
                                : isDarkMode
                                ? "bg-amber-500/10 text-amber-300"
                                : "bg-amber-500/20 text-amber-700"
                            }`}
                          >
                            {partner.category}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {partner.locations.length}{" "}
                          {partner.locations.length === 1
                            ? "location"
                            : "locations"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={`whitespace-nowrap px-3 py-1 rounded-full text-sm ${
                              partner.status === "active"
                                ? isDarkMode
                                  ? "bg-emerald-500/10 text-emerald-300"
                                  : "bg-emerald-500/20 text-emerald-700"
                                : partner.status === "pending"
                                ? isDarkMode
                                  ? "bg-amber-500/10 text-amber-300"
                                  : "bg-amber-500/20 text-amber-700"
                                : isDarkMode
                                ? "bg-rose-500/10 text-rose-300"
                                : "bg-rose-500/20 text-rose-700"
                            }`}
                          >
                            {partner.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {partner.joinedDate}
                        </td>
                      </tr>
                      <AnimatePresence>
                        {expandedPartnerId === partner.id && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`${
                              isDarkMode ? "bg-white/[0.02]" : "bg-slate-50/50"
                            }`}
                          >
                            <td colSpan={5} className="px-6 py-4">
                              <div className="rounded-lg overflow-hidden">
                                <table className="w-full">
                                  <thead>
                                    <tr
                                      className={`${
                                        isDarkMode
                                          ? "bg-black/20"
                                          : "bg-slate-100"
                                      }`}
                                    >
                                       <th
                                        className={`px-4 py-2 text-left text-sm font-medium ${
                                          isDarkMode
                                            ? "text-white/70"
                                            : "text-slate-600"
                                        }`}
                                      >
                                        Name
                                      </th>
                                      <th
                                        className={`px-4 py-2 text-left text-sm font-medium ${
                                          isDarkMode
                                            ? "text-white/70"
                                            : "text-slate-600"
                                        }`}
                                      >
                                        Country
                                      </th>
                                      <th
                                        className={`px-4 py-2 text-left text-sm font-medium ${
                                          isDarkMode
                                            ? "text-white/70"
                                            : "text-slate-600"
                                        }`}
                                      >
                                        City
                                      </th>
                                      <th
                                        className={`px-4 py-2 text-left text-sm font-medium ${
                                          isDarkMode
                                            ? "text-white/70"
                                            : "text-slate-600"
                                        }`}
                                      >
                                        Address
                                      </th>
                                      
                                      <th
                                        className={`px-4 py-2 text-left text-sm font-medium ${
                                          isDarkMode
                                            ? "text-white/70"
                                            : "text-slate-600"
                                        }`}
                                      >
                                        Maps
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {partner.locations.map((location) => (
                                      <tr
                                        key={location.id}
                                        className={`border-t ${
                                          isDarkMode
                                            ? "border-white/5"
                                            : "border-slate-200"
                                        }`}
                                      >
                                        <td
                                          className={`px-4 py-2 text-sm ${
                                            isDarkMode
                                              ? "text-white"
                                              : "text-slate-900"
                                          }`}
                                        >
                                          {location.name}
                                        </td>
                                        <td
                                          className={`px-4 py-2 text-sm ${
                                            isDarkMode
                                              ? "text-white"
                                              : "text-slate-900"
                                          }`}
                                        >
                                          {location.country}
                                        </td>
                                        <td
                                          className={`px-4 py-2 text-sm ${
                                            isDarkMode
                                              ? "text-white"
                                              : "text-slate-900"
                                          }`}
                                        >
                                          {location.city}
                                        </td>
                                        <td
                                          className={`px-4 py-2 text-sm ${
                                            isDarkMode
                                              ? "text-white"
                                              : "text-slate-900"
                                          }`}
                                        >
                                          {location.address}
                                        </td>
                                        <td className={`px-4 py-2 text-sm`}>
                                          <a
                                            href={location.googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`inline-flex items-center gap-1 text-crystal-blue hover:underline`}
                                          >
                                            <FaMapMarkerAlt className="w-3 h-3" />
                                            View on Maps
                                          </a>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <AddPartnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isDarkMode={isDarkMode}
        existingPartners={partners}
        onSubmit={handleAddPartner}
        onAddLocation={handleAddLocation}
      />
    </div>
  );
}
