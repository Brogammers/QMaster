"use client";

import { useState, useEffect } from "react";
import { FaCog, FaBell, FaLock, FaGlobe } from "react-icons/fa";
import { Switch } from "@headlessui/react";

interface UserProfile {
  name: string;
  email: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isComingSoonEnabled, setIsComingSoonEnabled] = useState(false);
  const [isMaintenanceEnabled, setIsMaintenanceEnabled] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    email: "",
  });
  const [deviceLanguage, setDeviceLanguage] = useState("");
  const [deviceTimezone, setDeviceTimezone] = useState("");

  // Fetch user profile and device settings on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/admin/profile");
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    // Get device language
    const language = navigator.language || "en";
    const displayLanguage =
      new Intl.DisplayNames([language], { type: "language" }).of(
        language.split("-")[0]
      ) || "English";
    setDeviceLanguage(displayLanguage);

    // Get device timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setDeviceTimezone(timezone);

    fetchUserProfile();
  }, []);

  const handleLandingPageToggle = (checked: boolean) => {
    setIsComingSoonEnabled(checked);
    // Here you would typically make an API call to update the setting
  };

  const handleMaintenanceToggle = (checked: boolean) => {
    setIsMaintenanceEnabled(checked);
    // API call
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="flex space-x-1 bg-white/[0.02] rounded-lg p-1 w-fit">
        {["general", "notifications", "security", "integrations"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab ? "bg-crystal-blue" : "hover:bg-white/[0.05]"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
        {activeTab === "general" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Profile Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={userProfile.name}
                    disabled
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/20 focus:outline-none cursor-not-allowed text-coal-black font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userProfile.email}
                    disabled
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/20 focus:outline-none cursor-not-allowed text-coal-black font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between opacity-75">
                  <div>
                    <h4 className="font-medium">Language</h4>
                    <p className="text-sm text-slate-700">
                      Using device language settings
                    </p>
                  </div>
                  <select
                    disabled
                    className="px-4 py-2 rounded-lg border border-white/10 bg-white/20 cursor-not-allowed text-coal-black font-medium"
                    value={deviceLanguage.toLowerCase()}
                  >
                    <option
                      value={deviceLanguage.toLowerCase()}
                      className="text-coal-black"
                    >
                      {deviceLanguage}
                    </option>
                  </select>
                </div>
                <div className="flex items-center justify-between opacity-75">
                  <div>
                    <h4 className="font-medium">Time Zone</h4>
                    <p className="text-sm text-slate-700">
                      Using device time zone
                    </p>
                  </div>
                  <select
                    disabled
                    className="px-4 py-2 rounded-lg border border-white/10 bg-white/20 cursor-not-allowed text-coal-black font-medium"
                    value={deviceTimezone}
                  >
                    <option value={deviceTimezone} className="text-coal-black">
                      {deviceTimezone.replace("_", " ")}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "integrations" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Site Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-lg">
                  <div>
                    <h4 className="font-medium">Coming Soon Mode</h4>
                    <p className="text-sm text-slate-700">
                      Enable to show a coming soon page instead of the full
                      landing page
                    </p>
                  </div>
                  <Switch
                    checked={isComingSoonEnabled}
                    onChange={handleLandingPageToggle}
                    className={`${
                      isComingSoonEnabled ? "bg-crystal-blue" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                  >
                    <span
                      className={`${
                        isComingSoonEnabled ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-lg">
                  <div>
                    <h4 className="font-medium">Maintenance Mode</h4>
                    <p className="text-sm text-slate-700">
                      Enable when performing system maintenance or updates
                    </p>
                  </div>
                  <Switch
                    checked={isMaintenanceEnabled}
                    onChange={handleMaintenanceToggle}
                    className={`${
                      isMaintenanceEnabled ? "bg-crystal-blue" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                  >
                    <span
                      className={`${
                        isMaintenanceEnabled ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
